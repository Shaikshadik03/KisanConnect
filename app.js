/**
 * KisanConnect Application Logic & Bento Price Comparison Engine
 * Self-contained: No external JSON fetch required! Works directly on double-click or server.
 */

// 12+ Diverse Farm Produce Listings Spanning All 8 Categories
const DEFAULT_LISTINGS = [
  {
    "id": "PROD-001",
    "farmerName": "Balwinder Singh",
    "farmerAvatar": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    "crop": "Organic Sharbati Wheat",
    "cropImage": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    "category": "Grains",
    "quantity": "50 Quintals",
    "pricePerKg": 28,
    "unit": "kg",
    "location": "Ludhiana, Punjab",
    "district": "Ludhiana",
    "distanceKm": 14,
    "harvestDate": "2026-09-05",
    "organic": true,
    "phone": "+91 98765 12340",
    "description": "Premium quality golden Sharbati wheat, 100% chemical-free, naturally sun-dried grain with high protein."
  },
  {
    "id": "PROD-002",
    "farmerName": "Santosh Patil",
    "farmerAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "crop": "Fresh Red Tomatoes",
    "cropImage": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    "category": "Vegetables",
    "quantity": "2500 kg",
    "pricePerKg": 22,
    "unit": "kg",
    "location": "Nashik, Maharashtra",
    "district": "Nashik",
    "distanceKm": 8,
    "harvestDate": "2026-09-08",
    "organic": false,
    "phone": "+91 98234 56789",
    "description": "Farm-fresh ripe hybrid tomatoes, firm texture, ideal for retail grocery or restaurant bulk culinary use."
  },
  {
    "id": "PROD-003",
    "farmerName": "Gopal Gowda",
    "farmerAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "crop": "Sona Masoori Raw Rice",
    "cropImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    "category": "Grains",
    "quantity": "40 Quintals",
    "pricePerKg": 44,
    "unit": "kg",
    "location": "Mandya, Karnataka",
    "district": "Mandya",
    "distanceKm": 25,
    "harvestDate": "2026-09-01",
    "organic": true,
    "phone": "+91 97401 23456",
    "description": "Aged 12-month aromatic Sona Masoori rice harvested directly from fertile Cauvery basin paddy fields."
  },
  {
    "id": "PROD-004",
    "farmerName": "Kishore Reddy",
    "farmerAvatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    "crop": "Guntur Red Chillies (Dry)",
    "cropImage": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80",
    "category": "Spices",
    "quantity": "800 kg",
    "pricePerKg": 160,
    "unit": "kg",
    "location": "Guntur, Andhra Pradesh",
    "district": "Guntur",
    "distanceKm": 42,
    "harvestDate": "2026-08-28",
    "organic": false,
    "phone": "+91 99490 87654",
    "description": "Authentic high-pungency Teja red chillies directly from the famous Guntur spice belt."
  },
  {
    "id": "PROD-005",
    "farmerName": "Vikas Jadhav",
    "farmerAvatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    "crop": "Lasalgaon Red Onions",
    "cropImage": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    "category": "Vegetables",
    "quantity": "5000 kg",
    "pricePerKg": 24,
    "unit": "kg",
    "location": "Nashik, Maharashtra",
    "district": "Nashik",
    "distanceKm": 12,
    "harvestDate": "2026-09-06",
    "organic": false,
    "phone": "+91 98501 23789",
    "description": "Grade-A medium dry red onions, well-cured with extended shelf life and natural aroma."
  },
  {
    "id": "PROD-006",
    "farmerName": "Harcharan Singh",
    "farmerAvatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "crop": "Basmati 1121 Rice",
    "cropImage": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&auto=format&fit=crop&q=80",
    "category": "Grains",
    "quantity": "60 Quintals",
    "pricePerKg": 75,
    "unit": "kg",
    "location": "Karnal, Haryana",
    "district": "Karnal",
    "distanceKm": 30,
    "harvestDate": "2026-09-02",
    "organic": true,
    "phone": "+91 94160 34567",
    "description": "Long-grain aromatic extra-fluffy 1121 Basmati paddy direct from field."
  },
  {
    "id": "PROD-007",
    "farmerName": "Mohan Lal Sharma",
    "farmerAvatar": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    "crop": "Fresh Table Potatoes",
    "cropImage": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    "category": "Vegetables",
    "quantity": "3500 kg",
    "pricePerKg": 18,
    "unit": "kg",
    "location": "Agra, Uttar Pradesh",
    "district": "Agra",
    "distanceKm": 19,
    "harvestDate": "2026-09-04",
    "organic": false,
    "phone": "+91 94560 98765",
    "description": "Sugar-free Chipsona table potatoes, smooth skin, clean harvest, zero cold-storage spoilage."
  },
  {
    "id": "PROD-008",
    "farmerName": "Jagdish Chandra",
    "farmerAvatar": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    "crop": "Organic Toor Dal (Pigeon Pea)",
    "cropImage": "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=600&auto=format&fit=crop&q=80",
    "category": "Pulses",
    "quantity": "1200 kg",
    "pricePerKg": 110,
    "unit": "kg",
    "location": "Gulbarga, Karnataka",
    "district": "Gulbarga",
    "distanceKm": 38,
    "harvestDate": "2026-08-26",
    "organic": true,
    "phone": "+91 98450 67890",
    "description": "Unpolished GI-tagged Gulbarga Toor Dal with high natural protein and uncompromised aroma."
  },
  {
    "id": "PROD-009",
    "farmerName": "Ghulam Nabi Wani",
    "farmerAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "crop": "Kashmiri Red Delicious Apples",
    "cropImage": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
    "category": "Fruits",
    "quantity": "1500 kg",
    "pricePerKg": 85,
    "unit": "kg",
    "location": "Sopore, Kashmir",
    "district": "Baramulla",
    "distanceKm": 48,
    "harvestDate": "2026-09-07",
    "organic": true,
    "phone": "+91 94190 55443",
    "description": "Tree-ripened, naturally sweet Red Delicious apples hand-plucked from high-altitude Sopore orchards."
  },
  {
    "id": "PROD-010",
    "farmerName": "Rameshwar Choudhary",
    "farmerAvatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "crop": "Wood-Pressed Yellow Mustard Oil",
    "cropImage": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&auto=format&fit=crop&q=80",
    "category": "Oils",
    "quantity": "600 Litres",
    "pricePerKg": 165,
    "unit": "Litre",
    "location": "Bharatpur, Rajasthan",
    "district": "Bharatpur",
    "distanceKm": 32,
    "harvestDate": "2026-09-03",
    "organic": true,
    "phone": "+91 94140 88776",
    "description": "Kachi Ghani single cold-pressed virgin yellow mustard oil, rich pungent aroma and zero chemical filtering."
  },
  {
    "id": "PROD-011",
    "farmerName": "Nandkishore Verma",
    "farmerAvatar": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    "crop": "Raw Wild Forest Honey",
    "cropImage": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
    "category": "Dairy",
    "quantity": "350 kg",
    "pricePerKg": 420,
    "unit": "kg",
    "location": "Nilgiris, Tamil Nadu",
    "district": "Nilgiris",
    "distanceKm": 45,
    "harvestDate": "2026-08-30",
    "organic": true,
    "phone": "+91 94430 11223",
    "description": "Unpasteurized multi-flora wild honey ethically harvested by tribal beekeeping cooperatives in the Western Ghats."
  },
  {
    "id": "PROD-012",
    "farmerName": "Devendra Joshi",
    "farmerAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "crop": "Organic Pure Ashwagandha Root",
    "cropImage": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    "category": "Herbs",
    "quantity": "400 kg",
    "pricePerKg": 290,
    "unit": "kg",
    "location": "Neemuch, Madhya Pradesh",
    "district": "Neemuch",
    "distanceKm": 50,
    "harvestDate": "2026-09-02",
    "organic": true,
    "phone": "+91 98270 33445",
    "description": "Sun-dried grade-A Nagori Ashwagandha roots with certified high withanolide alkaloid content."
  }
];

// Mandi Wholesale and Retail Benchmarks
const MARKET_BENCHMARKS = {
  "Organic Sharbati Wheat": { mandiWholesale: 21, retailMarket: 42 },
  "Fresh Red Tomatoes": { mandiWholesale: 14, retailMarket: 38 },
  "Sona Masoori Raw Rice": { mandiWholesale: 33, retailMarket: 62 },
  "Guntur Red Chillies (Dry)": { mandiWholesale: 120, retailMarket: 240 },
  "Lasalgaon Red Onions": { mandiWholesale: 15, retailMarket: 40 },
  "Basmati 1121 Rice": { mandiWholesale: 58, retailMarket: 115 },
  "Fresh Table Potatoes": { mandiWholesale: 11, retailMarket: 30 },
  "Organic Toor Dal (Pigeon Pea)": { mandiWholesale: 85, retailMarket: 165 },
  "Kashmiri Red Delicious Apples": { mandiWholesale: 55, retailMarket: 140 },
  "Wood-Pressed Yellow Mustard Oil": { mandiWholesale: 130, retailMarket: 225 },
  "Raw Wild Forest Honey": { mandiWholesale: 280, retailMarket: 650 },
  "Organic Pure Ashwagandha Root": { mandiWholesale: 210, retailMarket: 480 }
};

let listings = [];
let cropChartInstance = null;
let earningsChartInstance = null;

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  loadListings();
  setupNavigation();
  setupFilters();
  setupSellForm();
  updatePriceCalculator();
  calculateRoute();
  renderListings();
});

function loadListings() {
  const localSaved = localStorage.getItem("kisanconnect_listings_v6");
  if (localSaved) {
    try {
      listings = JSON.parse(localSaved);
      return;
    } catch (e) {
      console.warn("Using defaults");
    }
  }
  listings = [...DEFAULT_LISTINGS];
  localStorage.setItem("kisanconnect_listings_v6", JSON.stringify(listings));
}

function setupNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn, [data-view-target]");
  navBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-view-target") || btn.getAttribute("data-view");
      if (target) switchView(target);
    });
  });
}

function switchView(viewId) {
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(btn => {
    if (btn.getAttribute("data-view") === viewId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const activeSection = document.getElementById(viewId);
  if (activeSection) {
    activeSection.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (viewId === "buy-view") {
    renderListings();
  } else if (viewId === "dashboard-view") {
    renderDashboard();
  }
}

function filterByCategory(cat) {
  switchView("buy-view");
  const catSelect = document.getElementById("filter-category");
  if (catSelect) {
    catSelect.value = cat;
  }
  renderListings();
}

function scrollToElement(elemId) {
  const el = document.getElementById(elemId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// 1. Interactive Price Comparison Calculator
function updatePriceCalculator() {
  const cropSelect = document.getElementById("calc-crop-select");
  if (!cropSelect) return;

  const cropName = cropSelect.value;
  const benchmark = MARKET_BENCHMARKS[cropName] || { mandiWholesale: 20, retailMarket: 40 };

  const matchedListing = listings.find(l => l.crop === cropName) || { pricePerKg: Math.round((benchmark.mandiWholesale + benchmark.retailMarket) / 2) };
  const directPrice = matchedListing.pricePerKg;

  const mandiEl = document.getElementById("calc-mandi-price");
  const kisanEl = document.getElementById("calc-kisan-price");
  const retailEl = document.getElementById("calc-retail-price");
  const gainEl = document.getElementById("calc-farmer-gain");
  const savingsEl = document.getElementById("calc-buyer-savings");

  if (mandiEl) mandiEl.textContent = `₹${benchmark.mandiWholesale}/kg`;
  if (kisanEl) kisanEl.textContent = `₹${directPrice}/kg`;
  if (retailEl) retailEl.textContent = `₹${benchmark.retailMarket}/kg`;

  const farmerGainPct = Math.round(((directPrice - benchmark.mandiWholesale) / benchmark.mandiWholesale) * 100);
  const buyerSavingsPct = Math.round(((benchmark.retailMarket - directPrice) / benchmark.retailMarket) * 100);

  if (gainEl) gainEl.textContent = `+${farmerGainPct}% Extra Farmer Profit`;
  if (savingsEl) savingsEl.textContent = `Buyer Saves ${buyerSavingsPct}%`;
}

// 2. Interactive Route & Freshness Transit Calculator
function calculateRoute() {
  const origin = document.getElementById("route-origin-select")?.value || "Mandya";
  const dest = document.getElementById("route-dest-select")?.value || "Bengaluru";

  const routeMap = {
    "Mandya-Bengaluru": { dist: "98 km", time: "~2.5 Hrs", savedDays: "12 Days" },
    "Mandya-Mumbai": { dist: "980 km", time: "~18 Hrs", savedDays: "15 Days" },
    "Mandya-Delhi": { dist: "2,150 km", time: "~38 Hrs", savedDays: "20 Days" },
    "Mandya-Hyderabad": { dist: "670 km", time: "~11 Hrs", savedDays: "14 Days" },
    "Mandya-Chennai": { dist: "410 km", time: "~7.5 Hrs", savedDays: "14 Days" },

    "Nashik-Mumbai": { dist: "165 km", time: "~3.5 Hrs", savedDays: "10 Days" },
    "Nashik-Bengaluru": { dist: "1,010 km", time: "~19 Hrs", savedDays: "16 Days" },
    "Nashik-Delhi": { dist: "1,220 km", time: "~22 Hrs", savedDays: "18 Days" },
    "Nashik-Hyderabad": { dist: "710 km", time: "~13 Hrs", savedDays: "14 Days" },
    "Nashik-Chennai": { dist: "1,240 km", time: "~24 Hrs", savedDays: "16 Days" },

    "Ludhiana-Delhi": { dist: "310 km", time: "~5.5 Hrs", savedDays: "12 Days" },
    "Ludhiana-Mumbai": { dist: "1,690 km", time: "~29 Hrs", savedDays: "18 Days" },
    "Ludhiana-Bengaluru": { dist: "2,460 km", time: "~42 Hrs", savedDays: "22 Days" },
    "Ludhiana-Hyderabad": { dist: "1,880 km", time: "~33 Hrs", savedDays: "20 Days" },
    "Ludhiana-Chennai": { dist: "2,520 km", time: "~44 Hrs", savedDays: "22 Days" },

    "Guntur-Hyderabad": { dist: "270 km", time: "~5.0 Hrs", savedDays: "12 Days" },
    "Guntur-Chennai": { dist: "385 km", time: "~7.0 Hrs", savedDays: "14 Days" },
    "Guntur-Bengaluru": { dist: "590 km", time: "~10.5 Hrs", savedDays: "14 Days" },
    "Guntur-Mumbai": { dist: "970 km", time: "~17 Hrs", savedDays: "16 Days" },
    "Guntur-Delhi": { dist: "1,780 km", time: "~31 Hrs", savedDays: "20 Days" },

    "Agra-Delhi": { dist: "210 km", time: "~3.5 Hrs", savedDays: "10 Days" },
    "Agra-Mumbai": { dist: "1,200 km", time: "~21 Hrs", savedDays: "16 Days" },
    "Agra-Bengaluru": { dist: "1,940 km", time: "~34 Hrs", savedDays: "20 Days" },
    "Agra-Hyderabad": { dist: "1,350 km", time: "~23 Hrs", savedDays: "18 Days" },
    "Agra-Chennai": { dist: "1,990 km", time: "~35 Hrs", savedDays: "20 Days" }
  };

  const key = `${origin}-${dest}`;
  const data = routeMap[key] || { dist: "450 km", time: "~8 Hrs", savedDays: "14 Days" };

  const distEl = document.getElementById("route-distance-val");
  const timeEl = document.getElementById("route-time-val");
  const spoilEl = document.getElementById("route-spoilage-val");

  if (distEl) distEl.textContent = data.dist;
  if (timeEl) timeEl.textContent = data.time;
  if (spoilEl) spoilEl.textContent = data.savedDays;
}

// 3. Community Group Buying Pledge
const poolState = {
  pool1: { current: 750, target: 1000, pledgeStep: 25, unit: "kg" },
  pool2: { current: 420, target: 500, pledgeStep: 10, unit: "kg" },
  pool3: { current: 890, target: 1200, pledgeStep: 50, unit: "kg" }
};

function joinGroupPool(poolId, cropName) {
  const pool = poolState[poolId];
  if (!pool) return;

  pool.current = Math.min(pool.target, pool.current + pool.pledgeStep);
  const pct = Math.round((pool.current / pool.target) * 100);

  const statusEl = document.getElementById(`${poolId}-status`);
  const barEl = document.getElementById(`${poolId}-bar`);

  if (statusEl) statusEl.textContent = `${pool.current} / ${pool.target} ${pool.unit} (${pct}%)`;
  if (barEl) barEl.style.width = `${pct}%`;

  showToast(`🎉 You pledged ${pool.pledgeStep} ${pool.unit} to the ${cropName} neighborhood pool!`);
}

function setupFilters() {
  const searchInput = document.getElementById("filter-search");
  const catFilter = document.getElementById("filter-category");
  const sortFilter = document.getElementById("filter-sort");

  if (searchInput) searchInput.addEventListener("input", renderListings);
  if (catFilter) catFilter.addEventListener("change", renderListings);
  if (sortFilter) sortFilter.addEventListener("change", renderListings);
}

function renderListings() {
  const container = document.getElementById("produce-listings-container");
  if (!container) return;

  const query = (document.getElementById("filter-search")?.value || "").toLowerCase();
  const selectedCat = document.getElementById("filter-category")?.value || "all";
  const sortBy = document.getElementById("filter-sort")?.value || "nearest";

  let filtered = listings.filter(item => {
    const matchesQuery = item.crop.toLowerCase().includes(query) ||
                         item.location.toLowerCase().includes(query) ||
                         item.farmerName.toLowerCase().includes(query);
    const matchesCat = selectedCat === "all" || item.category === selectedCat;
    return matchesQuery && matchesCat;
  });

  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.pricePerKg - b.pricePerKg);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.pricePerKg - a.pricePerKg);
  } else {
    filtered.sort((a, b) => (a.distanceKm || 10) - (b.distanceKm || 10));
  }

  const countLabel = document.getElementById("listings-count-label");
  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} Direct Farm Harvests`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background:#ffffff; border:1.5px solid var(--border-organic); border-radius:var(--radius-bento); padding:3.5rem 2rem; text-align:center;">
        <div style="font-size:3rem; margin-bottom:1rem;">🌾</div>
        <h3 style="font-family:var(--font-serif); font-size:1.4rem; color:var(--forest-900);">No Harvests Found</h3>
        <p style="color:var(--text-muted); margin-top:0.5rem;">Try clearing your search filters or select "All Categories".</p>
        <button class="btn btn-forest" style="margin-top:1.25rem;" onclick="filterByCategory('all')">View All Harvests</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const benchmark = MARKET_BENCHMARKS[item.crop] || {
      mandiWholesale: Math.round(item.pricePerKg * 0.7),
      retailMarket: Math.round(item.pricePerKg * 1.5)
    };

    const retailPrice = benchmark.retailMarket;
    const mandiPrice = benchmark.mandiWholesale;

    const consumerSavingsPct = Math.round(((retailPrice - item.pricePerKg) / retailPrice) * 100);
    const farmerGainPct = Math.round(((item.pricePerKg - mandiPrice) / mandiPrice) * 100);

    return `
      <div class="bento-produce-card">
        <div class="produce-img-wrap">
          <img src="${item.cropImage || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'}" alt="${item.crop}" class="produce-photo">
          ${item.organic ? '<span class="organic-badge-overlay">🌱 100% Certified Organic</span>' : '<span class="organic-badge-overlay" style="background:rgba(20,83,45,0.85);">🚜 Farm-Fresh Batch</span>'}
        </div>

        <div class="produce-body">
          <div>
            <div class="crop-header">
              <div>
                <h3 class="crop-title">${item.crop}</h3>
                <div style="display:flex; align-items:center; gap:0.6rem; margin-top:0.4rem;">
                  <img src="${item.farmerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}" class="farmer-avatar-img">
                  <span style="font-weight:700; font-size:0.88rem; color:var(--forest-900);">👨‍🌾 ${item.farmerName}</span>
                  <span style="color:#5c6855; font-size:0.85rem;">• 📍 ${item.location} (~${item.distanceKm || 12} km away)</span>
                </div>
              </div>

              <div style="text-align:right;">
                <div class="price-tag-big">₹${item.pricePerKg}</div>
                <div style="font-size:0.75rem; color:#5c6855; font-weight:700;">Direct / ${item.unit || 'kg'}</div>
              </div>
            </div>

            <!-- Price Comparison Contrast -->
            <div class="price-contrast-box">
              <div>
                <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:#92400e;">Mandi Trader Rate</span>
                <div style="font-size:1.05rem; font-weight:800; color:#991b1b; text-decoration:line-through;">₹${mandiPrice}/${item.unit || 'kg'}</div>
              </div>

              <div>
                <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:#5c6855;">Supermarket Retail</span>
                <div style="font-size:1.05rem; font-weight:800; color:#5c6855;">₹${retailPrice}/${item.unit || 'kg'}</div>
              </div>

              <div class="contrast-badge">
                You Save ${consumerSavingsPct}% • Farmer +${farmerGainPct}% More
              </div>
            </div>

            <p style="font-size:0.9rem; color:#475569; margin: 0.5rem 0;">${item.description}</p>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; flex-wrap:wrap; gap:0.5rem;">
            <span style="font-size:0.82rem; color:#5c6855; font-weight:700;">📦 ${item.quantity} available • Harvested ${item.harvestDate}</span>
            <div style="display:flex; gap:0.75rem;">
              <button class="btn btn-forest" style="padding:0.5rem 1.3rem; font-size:0.85rem;" onclick="openContactModal('${item.farmerName}', '${item.crop}', '${item.pricePerKg}', '${item.phone}', '${item.location}', '${item.farmerAvatar}')">
                📞 Connect to Farmer
              </button>
              <button class="btn btn-terracotta" style="padding:0.5rem 1.3rem; font-size:0.85rem;" onclick="showToast('Produce added to direct farm order!')">
                🛒 Buy Direct
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function setupSellForm() {
  const form = document.getElementById("farmer-listing-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newListing = {
      id: "PROD-" + Math.floor(100 + Math.random() * 900),
      farmerName: document.getElementById("sell-name").value,
      farmerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
      crop: document.getElementById("sell-crop").value,
      cropImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
      category: document.getElementById("sell-category").value,
      quantity: `${document.getElementById("sell-quantity").value} ${document.getElementById("sell-unit").value}`,
      pricePerKg: parseFloat(document.getElementById("sell-price").value),
      unit: document.getElementById("sell-unit").value || "kg",
      location: document.getElementById("sell-location").value,
      district: document.getElementById("sell-location").value.split(",")[0],
      distanceKm: Math.floor(5 + Math.random() * 25),
      harvestDate: document.getElementById("sell-date").value,
      organic: document.getElementById("sell-organic").checked,
      phone: document.getElementById("sell-phone").value,
      description: document.getElementById("sell-desc").value || "Fresh farm harvest direct from the grower with zero middleman markup."
    };

    listings.unshift(newListing);
    localStorage.setItem("kisanconnect_listings_v6", JSON.stringify(listings));
    form.reset();
    showToast(`🎉 Produce listing published for ${newListing.crop}!`);
    switchView("buy-view");
  });
}

function renderDashboard() {
  const fCount = document.getElementById("dash-total-farmers");
  if (fCount) fCount.textContent = listings.length + 16;

  const ctxCrop = document.getElementById("cropVolumeChart")?.getContext("2d");
  if (ctxCrop) {
    if (cropChartInstance) cropChartInstance.destroy();
    cropChartInstance = new Chart(ctxCrop, {
      type: "bar",
      data: {
        labels: ["Wheat", "Tomatoes", "Rice", "Onions", "Potatoes", "Pulses", "Apples", "Mustard Oil"],
        datasets: [{
          label: "Volume Traded (Quintals)",
          data: [140, 95, 160, 125, 105, 55, 45, 30],
          backgroundColor: "#064e3b",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  const ctxEarn = document.getElementById("earningsComparisonChart")?.getContext("2d");
  if (ctxEarn) {
    if (earningsChartInstance) earningsChartInstance.destroy();
    earningsChartInstance = new Chart(ctxEarn, {
      type: "bar",
      data: {
        labels: ["Wheat (10 Q)", "Tomatoes (1000 kg)", "Rice (10 Q)", "Apples (1000 kg)"],
        datasets: [
          {
            label: "Direct Farmer Income (KisanConnect)",
            data: [28000, 22000, 44000, 85000],
            backgroundColor: "#064e3b"
          },
          {
            label: "Traditional Mandi Intermediary Route",
            data: [21000, 14000, 33000, 55000],
            backgroundColor: "#dc2626"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } }
      }
    });
  }
}

function openContactModal(farmerName, crop, price, phone, location, avatar) {
  document.getElementById("modal-farmer-name").textContent = farmerName;
  document.getElementById("modal-crop-name").textContent = crop;
  document.getElementById("modal-price").textContent = `₹${price}/kg`;
  document.getElementById("modal-phone").textContent = phone;
  document.getElementById("modal-location").textContent = location;
  if (avatar && document.getElementById("modal-farmer-img")) {
    document.getElementById("modal-farmer-img").src = avatar;
  }
  document.getElementById("contact-modal").classList.add("active");
}

function closeContactModal() {
  document.getElementById("contact-modal").classList.remove("active");
}

function showToast(msg) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.querySelector("span").textContent = msg;
  toast.style.display = "flex";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}
