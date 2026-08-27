/**
 * KisanConnect Application Logic & Bento Price Comparison Engine
 * Self-contained: No external JSON fetch required! Works directly on double-click.
 */

// All Farm Produce Listings Embedded Directly
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
    "harvestDate": "2026-08-15",
    "organic": true,
    "phone": "+91 98765 12340",
    "description": "Premium quality golden Sharbati wheat, chemical-free sun-dried grain."
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
    "harvestDate": "2026-08-24",
    "organic": false,
    "phone": "+91 98234 56789",
    "description": "Farm-fresh ripe hybrid tomatoes, firm texture, ideal for retail or culinary bulk use."
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
    "harvestDate": "2026-08-10",
    "organic": true,
    "phone": "+91 97401 23456",
    "description": "Aged 12-month aromatic Sona Masoori rice harvested from Cauvery basin farms."
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
    "harvestDate": "2026-08-01",
    "organic": false,
    "phone": "+91 99490 87654",
    "description": "Authentic high-pungency Teja red chillies directly from Guntur spice belt."
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
    "harvestDate": "2026-08-20",
    "organic": false,
    "phone": "+91 98501 23789",
    "description": "Grade-A medium dry red onions, well-cured with extended shelf life."
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
    "harvestDate": "2026-08-12",
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
    "harvestDate": "2026-08-18",
    "organic": false,
    "phone": "+91 94560 98765",
    "description": "Sugar-free Chipsona table potatoes, smooth skin and clean harvest."
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
    "harvestDate": "2026-08-02",
    "organic": true,
    "phone": "+91 98450 67890",
    "description": "Unpolished GI-tagged Gulbarga Toor Dal with high natural protein."
  }
];

// Mandi Wholesale and Retail Benchmarks Embedded Directly
const MARKET_BENCHMARKS = {
  "Organic Sharbati Wheat": { mandiWholesale: 21, retailMarket: 42 },
  "Fresh Red Tomatoes": { mandiWholesale: 14, retailMarket: 38 },
  "Sona Masoori Raw Rice": { mandiWholesale: 33, retailMarket: 62 },
  "Guntur Red Chillies (Dry)": { mandiWholesale: 120, retailMarket: 240 },
  "Lasalgaon Red Onions": { mandiWholesale: 15, retailMarket: 40 },
  "Basmati 1121 Rice": { mandiWholesale: 58, retailMarket: 115 },
  "Fresh Table Potatoes": { mandiWholesale: 11, retailMarket: 30 },
  "Organic Toor Dal (Pigeon Pea)": { mandiWholesale: 85, retailMarket: 165 }
};

let listings = [];
let cropChartInstance = null;
let earningsChartInstance = null;

// Initialize on Load - Fully Offline Compatible!
document.addEventListener("DOMContentLoaded", () => {
  loadListings();
  setupNavigation();
  setupFilters();
  setupSellForm();
  renderListings();
});

function loadListings() {
  const localSaved = localStorage.getItem("kisanconnect_listings_simple");
  if (localSaved) {
    try {
      listings = JSON.parse(localSaved);
      return;
    } catch (e) {
      console.warn("Using defaults");
    }
  }
  // Load default embedded dataset
  listings = [...DEFAULT_LISTINGS];
  localStorage.setItem("kisanconnect_listings_simple", JSON.stringify(listings));
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
        </div>

        <div class="produce-body">
          <div>
            <div class="crop-header">
              <div>
                <h3 class="crop-title">${item.crop}</h3>
                <div style="display:flex; align-items:center; gap:0.6rem; margin-top:0.4rem;">
                  <img src="${item.farmerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}" class="farmer-avatar-img">
                  <span style="font-weight:700; font-size:0.85rem;">👨‍🌾 ${item.farmerName}</span>
                  <span style="color:#5c6855; font-size:0.85rem;">• 📍 ${item.location} (~${item.distanceKm || 12} km away)</span>
                </div>
              </div>

              <div style="text-align:right;">
                <div class="price-tag-big">₹${item.pricePerKg}</div>
                <div style="font-size:0.72rem; color:#5c6855; font-weight:700;">Direct / kg</div>
              </div>
            </div>

            <!-- Price Comparison Contrast -->
            <div class="price-contrast-box">
              <div>
                <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:#92400e;">Mandi Trader Rate</span>
                <div style="font-size:1.05rem; font-weight:800; color:#991b1b; text-decoration:line-through;">₹${mandiPrice}/kg</div>
              </div>

              <div>
                <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:#5c6855;">Supermarket Retail</span>
                <div style="font-size:1.05rem; font-weight:800; color:#5c6855;">₹${retailPrice}/kg</div>
              </div>

              <div class="contrast-badge">
                You Save ${consumerSavingsPct}% • Farmer +${farmerGainPct}%
              </div>
            </div>

            <p style="font-size:0.88rem; color:#475569; margin: 0.5rem 0;">${item.description}</p>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem;">
            <span style="font-size:0.8rem; color:#5c6855; font-weight:700;">📦 ${item.quantity} • Harvested ${item.harvestDate}</span>
            <div style="display:flex; gap:0.75rem;">
              <button class="btn btn-forest" style="padding:0.5rem 1.3rem; font-size:0.85rem;" onclick="openContactModal('${item.farmerName}', '${item.crop}', '${item.pricePerKg}', '${item.phone}', '${item.location}', '${item.farmerAvatar}')">
                📞 Connect to Farmer
              </button>
              <button class="btn btn-terracotta" style="padding:0.5rem 1.3rem; font-size:0.85rem;" onclick="showToast('Produce added to bulk farm pickup!')">
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
      unit: "kg",
      location: document.getElementById("sell-location").value,
      district: document.getElementById("sell-location").value.split(",")[0],
      distanceKm: Math.floor(5 + Math.random() * 25),
      harvestDate: document.getElementById("sell-date").value,
      organic: document.getElementById("sell-organic").checked,
      phone: document.getElementById("sell-phone").value,
      description: document.getElementById("sell-desc").value || "Fresh farm harvest direct from the grower."
    };

    listings.unshift(newListing);
    localStorage.setItem("kisanconnect_listings_simple", JSON.stringify(listings));
    form.reset();
    showToast(`🎉 Produce listing published for ${newListing.crop}!`);
    switchView("buy-view");
  });
}

function renderDashboard() {
  const fCount = document.getElementById("dash-total-farmers");
  if (fCount) fCount.textContent = listings.length + 15;

  const ctxCrop = document.getElementById("cropVolumeChart")?.getContext("2d");
  if (ctxCrop) {
    if (cropChartInstance) cropChartInstance.destroy();
    cropChartInstance = new Chart(ctxCrop, {
      type: "bar",
      data: {
        labels: ["Wheat", "Tomatoes", "Rice", "Onions", "Potatoes", "Pulses"],
        datasets: [{
          label: "Volume Traded (Quintals)",
          data: [140, 95, 160, 125, 105, 55],
          backgroundColor: "#14532d",
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
        labels: ["Wheat (10 Q)", "Tomatoes (1000 kg)", "Rice (10 Q)", "Onions (2000 kg)"],
        datasets: [
          {
            label: "Direct Farmer Income (KisanConnect)",
            data: [28000, 22000, 44000, 48000],
            backgroundColor: "#14532d"
          },
          {
            label: "Traditional Mandi Intermediary Route",
            data: [21000, 14000, 33000, 30000],
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
