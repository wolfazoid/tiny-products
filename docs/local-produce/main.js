// --- Config ---
const CHICAGO_CENTER = [41.8781, -87.6298];
const DEFAULT_ZOOM = 11;
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

const EMAIL_SUBJECT = "Request: More Local Produce";
const EMAIL_BODY = `Hi,

I'm a customer in your area and I'd love to see more locally sourced produce in your store. Supporting local farms means fresher food, a healthier food supply chain, and a stronger local economy.

Would you be open to stocking more products from local and regional farms? I'd be happy to discuss this further.

Thank you for your time!`;

// --- State ---
let map;
let allStores = [];
let displayStores = []; // current subset (after search)
let markers = L.layerGroup();
let searchMarker = null;
let activeFilters = new Set(["local", "inferred", "unknown"]);

// --- Map setup ---
function initMap() {
  map = L.map("map").setView(CHICAGO_CENTER, DEFAULT_ZOOM);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
  }).addTo(map);
  markers.addTo(map);
}

// --- Data loading ---
async function loadDatabase() {
  const res = await fetch("db.json");
  const db = await res.json();
  return db.locations.map((loc) => ({
    ...loc,
    classification:
      loc.local_status === "confirmed"
        ? "local"
        : loc.local_status === "inferred"
          ? "inferred"
          : "unknown",
  }));
}

// --- Rendering ---
function getMarkerColor(classification) {
  if (classification === "local") return "#2d6a4f";
  if (classification === "inferred") return "#d4a017";
  return "#999";
}

function createCircleMarker(store) {
  const color = getMarkerColor(store.classification);
  const marker = L.circleMarker([store.lat, store.lng], {
    radius: 9,
    fillColor: color,
    color: "#fff",
    weight: 1.5,
    fillOpacity: 0.85,
  });

  let popupHTML = `<div class="popup-name">${store.name}</div>`;
  if (store.address) {
    popupHTML += `<div class="popup-address">${store.address}</div>`;
  }

  if (store.classification === "local") {
    popupHTML += `<span class="store-tag local">Stocks Local Produce</span>`;
  } else if (store.classification === "inferred") {
    popupHTML += `<span class="store-tag inferred">Likely Stocks Local</span>`;
  } else {
    popupHTML += `<span class="store-tag unknown">Unknown</span>`;
  }

  // Action links — always blue, always on their own line
  let actions = [];
  if (store.website) {
    actions.push(`<a href="${store.website}" target="_blank" rel="noopener">Visit Website ↗</a>`);
  }
  if (store.classification === "unknown") {
    const mailto = buildMailto(store.name);
    actions.push(`<a href="${mailto}">Email to Ask About Local&nbsp;<span style="font-size:16px">✉</span></a>`);
  }
  if (actions.length) {
    popupHTML += `<div class="popup-actions">${actions.join("")}</div>`;
  }

  marker.bindPopup(popupHTML);
  return marker;
}

function buildMailto(storeName) {
  const subject = encodeURIComponent(EMAIL_SUBJECT);
  const body = encodeURIComponent(
    EMAIL_BODY.replace("your store", storeName)
  );
  return `mailto:?subject=${subject}&body=${body}`;
}

function renderMarkers(stores) {
  markers.clearLayers();
  // Render unknown first so local pins render on top
  const sorted = [...stores].sort((a, b) => {
    const order = { unknown: 0, inferred: 1, local: 2 };
    return (order[a.classification] || 0) - (order[b.classification] || 0);
  });
  for (const store of sorted) {
    const marker = createCircleMarker(store);
    markers.addLayer(marker);
    store._marker = marker;
  }
}

function renderStoreList(stores) {
  const list = document.getElementById("store-list");
  list.innerHTML = "";

  for (const store of stores) {
    const li = document.createElement("li");
    li.className = `store-item ${store.classification}`;

    let distHTML = "";
    if (store.distance != null) {
      distHTML = `<span class="store-distance">${store.distance.toFixed(1)} mi</span>`;
    }

    let tagHTML = "";
    if (store.classification === "local") {
      tagHTML = `<span class="store-tag local">Stocks Local</span>`;
    } else if (store.classification === "inferred") {
      tagHTML = `<span class="store-tag inferred">Likely Local</span>`;
    } else {
      tagHTML = `<span class="store-tag unknown">Unknown</span>`;
    }

    // Action links — separate line, always blue
    let actionsHTML = [];
    if (store.website) {
      actionsHTML.push(`<a class="action-link" href="${store.website}" target="_blank" rel="noopener">Visit Website ↗</a>`);
    }
    if (store.classification === "unknown") {
      const mailto = buildMailto(store.name);
      actionsHTML.push(`<a class="action-link" href="${mailto}">Email to Ask About Local&nbsp;<span style="font-size:16px">✉</span></a>`);
    }
    const actionsRow = actionsHTML.length
      ? `<div class="store-actions">${actionsHTML.join("")}</div>`
      : "";

    li.innerHTML = `
      ${distHTML}
      <div class="store-name">${store.name}</div>
      <div class="store-address">${store.address}</div>
      ${tagHTML}
      ${actionsRow}
    `;

    li.addEventListener("click", () => {
      if (searchMarker) {
        // Fit bounds to show both the search pin and the store
        const searchLatLng = searchMarker.getLatLng();
        const bounds = L.latLngBounds(
          [searchLatLng.lat, searchLatLng.lng],
          [store.lat, store.lng]
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      } else {
        map.setView([store.lat, store.lng], 15);
      }
      if (store._marker) store._marker.openPopup();
    });

    list.appendChild(li);
  }
}

function updateFilterCounts(stores) {
  const local = stores.filter((s) => s.classification === "local").length;
  const inferred = stores.filter((s) => s.classification === "inferred").length;
  const unknown = stores.filter((s) => s.classification === "unknown").length;

  document.getElementById("filter-local-count").textContent = local;
  document.getElementById("filter-inferred-count").textContent = inferred;
  document.getElementById("filter-unknown-count").textContent = unknown;
  document.getElementById("store-count").textContent =
    `${stores.length} grocery stores in Chicago`;
}

function getFilteredStores(stores) {
  return stores.filter((s) => activeFilters.has(s.classification));
}

function applyFilters() {
  const filtered = getFilteredStores(displayStores);
  renderMarkers(filtered);
  renderStoreList(filtered);
}

let filtersTouched = false;

function toggleFilter(classification) {
  if (!filtersTouched) {
    // First click: select ONLY this filter
    filtersTouched = true;
    activeFilters.clear();
    activeFilters.add(classification);
  } else if (activeFilters.has(classification)) {
    // Don't allow deselecting the last active filter
    if (activeFilters.size > 1) {
      activeFilters.delete(classification);
    } else {
      // Clicking the only active filter resets to all
      activeFilters.add("local");
      activeFilters.add("inferred");
      activeFilters.add("unknown");
      filtersTouched = false;
    }
  } else {
    activeFilters.add(classification);
  }

  // Update button states
  document.querySelectorAll(".filter").forEach((btn) => {
    const f = btn.dataset.filter;
    btn.classList.toggle("active", activeFilters.has(f));
  });

  applyFilters();
}

// --- Search / Geocoding ---
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3959; // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocode(query) {
  const params = new URLSearchParams({
    q: query + ", Chicago, IL",
    format: "json",
    limit: "1",
  });
  const res = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: { "User-Agent": "LocalProduceFinder/1.0" },
  });
  const data = await res.json();
  if (data.length === 0) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

function sortByDistance(stores, lat, lng) {
  for (const store of stores) {
    store.distance = haversineDistance(lat, lng, store.lat, store.lng);
  }
  stores.sort((a, b) => a.distance - b.distance);
}

async function handleSearch() {
  const input = document.getElementById("address-input").value.trim();
  if (!input) return;

  const loc = await geocode(input);
  if (!loc) {
    alert("Could not find that location. Try a different address or zip code.");
    return;
  }

  // Add/move search marker
  if (searchMarker) map.removeLayer(searchMarker);
  searchMarker = L.marker([loc.lat, loc.lng], {
    icon: L.divIcon({
      className: "search-pin",
      html: `<div style="width:14px;height:14px;background:#e63946;border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    }),
  }).addTo(map);

  // Sort and filter to nearby stores
  sortByDistance(allStores, loc.lat, loc.lng);
  const nearby = allStores.filter((s) => s.distance <= 10);
  displayStores = nearby.length > 0 ? nearby : allStores.slice(0, 50);

  updateFilterCounts(displayStores);
  applyFilters();

  map.setView([loc.lat, loc.lng], 13);
}

// --- Init ---
async function init() {
  initMap();

  document.getElementById("search-btn").addEventListener("click", handleSearch);
  document.getElementById("address-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Wire up filter buttons
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFilter(btn.dataset.filter);
    });
  });

  try {
    allStores = await loadDatabase();
    displayStores = allStores;

    console.log(`Loaded ${allStores.length} stores from db.json`);

    updateFilterCounts(displayStores);
    applyFilters();
  } catch (err) {
    console.error("Failed to load data:", err);
    document.getElementById("store-list").innerHTML =
      '<li class="store-item">Failed to load store data. Check console for details.</li>';
  }
}

init();
