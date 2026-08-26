/**
 * KisanConnect Application Logic & Price Comparison Engine
 * Smart India Hackathon 2026 - SIH26033
 */

const DEFAULT_LISTINGS = [
  {
    id: "PROD-001",
    farmerName: "Balwinder Singh",
    crop: "Organic Sharbati Wheat",
    category: "Grains",
    quantity: "50 Quintals",
    pricePerKg: 28,
    unit: "kg",
    location: "Ludhiana, Punjab",
    district: "Ludhiana",
    distanceKm: 14,
    harvestDate: "2026-08-15",
    organic: true,
    phone: "+91 98765 12340",
    description: "Premium quality golden Sharbati wheat, chemical-free sun-dried grain."
  },
  {
    id: "PROD-002",
    farmerName: "Santosh Patil",
    crop: "Fresh Red Tomatoes",
    category: "Vegetables",
    quantity: "2500 kg",
    pricePerKg: 22,
    unit: "kg",
    location: "Nashik, Maharashtra",
    district: "Nashik",
    distanceKm: 8,
    harvestDate: "2026-08-24",
    organic: false,
    phone: "+91 98234 56789",
    description: "Farm-fresh ripe hybrid tomatoes, firm texture, ideal for retail or culinary bulk use."
  },
  {
    id: "PROD-003",
    farmerName: "Gopal Gowda",
    crop: "Sona Masoori Raw Rice",
    category: "Grains",
    quantity: "40 Quintals",
    pricePerKg: 44,
    unit: "kg",
    location: "Mandya, Karnataka",
    district: "Mandya",
    distanceKm: 25,
    harvestDate: "2026-08-10",
    organic: true,
    phone: "+91 97401 23456",
    description: "Aged 12-month aromatic Sona Masoori rice harvested from Cauvery basin farms."
  },
  {
    id: "PROD-004",
    farmerName: "Kishore Reddy",
    crop: "Guntur Red Chillies (Dry)",
    category: "Spices",
    quantity: "800 kg",
    pricePerKg: 160,
    unit: "kg",
    location: "Guntur, Andhra Pradesh",
    district: "Guntur",
    distanceKm: 42,
    harvestDate: "2026-08-01",
    organic: false,
    phone: "+91 99490 87654",
    description: "Authentic high-pungency Teja red chillies directly from Guntur spice belt."
  },
  {
    id: "PROD-005",
    farmerName: "Vikas Jadhav",
    crop: "Lasalgaon Red Onions",
    category: "Vegetables",
    quantity: "5000 kg",
    pricePerKg: 24,
    unit: "kg",
    location: "Nashik, Maharashtra",
    district: "Nashik",
    distanceKm: 12,
    harvestDate: "2026-08-20",
    organic: false,
    phone: "+91 98501 23789",
    description: "Grade-A medium dry red onions, well-cured with extended shelf life."
  },
  {
    id: "PROD-006",
    farmerName: "Harcharan Singh",
    crop: "Basmati 1121 Rice",
    category: "Grains",
    quantity: "60 Quintals",
    pricePerKg: 75,
    unit: "kg",
    location: "Karnal, Haryana",
    district: "Karnal",
    distanceKm: 30,
    harvestDate: "2026-08-12",
    organic: true,
    phone: "+91 94160 34567",
    description: "Long-grain aromatic extra-fluffy 1121 Basmati paddy direct from field."
  },
  {
    id: "PROD-007",
    farmerName: "Mohan Lal Sharma",
    crop: "Fresh Table Potatoes",
    category: "Vegetables",
    quantity: "3500 kg",
    pricePerKg: 18,
    unit: "kg",
    location: "Agra, Uttar Pradesh",
    district: "Agra",
    distanceKm: 19,
    harvestDate: "2026-08-18",
    organic: false,
    phone: "+91 94560 98765",
    description: "Sugar-free Chipsona table potatoes, smooth skin and clean harvest."
  },
  {
    id: "PROD-008",
    farmerName: "Jagdish Chandra",
    crop: "Organic Toor Dal (Pigeon Pea)",
    category: "Pulses",
    quantity: "1200 kg",
    pricePerKg: 110,
    unit: "kg",
    location: "Gulbarga, Karnataka",
    district: "Gulbarga",
    distanceKm: 38,
    harvestDate: "2026-08-02",
    organic: true,
    phone: "+91 98450 67890",
    description: "Unpolished GI-tagged Gulbarga Toor Dal with high natural protein."
  }
];

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

// App State
let listings = [];
let currentSlide = 0;
let cropChartInstance = null;
let earningsChartInstance = null;

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  await loadListings();
  setupNavigation();
  setupFilters();
  setupSellForm();
  renderListings();
  setupSlideDeck();
});

// Load Data
async function loadListings() {
  const localSaved = localStorage.getItem("kisanconnect_listings");
  if (localSaved) {
    try {
      listings = JSON.parse(localSaved);
      return;
    } catch (e) {
      console.warn("LocalStorage corrupted, using defaults");
    }
  }

  try {
    const res = await fetch("data/listings.json");
    if (res.ok) {
      listings = await res.json();
    } else {
      listings = DEFAULT_LISTINGS;
    }
  } catch (err) {
    listings = DEFAULT_LISTINGS;
  }
  localStorage.setItem("kisanconnect_listings", JSON.stringify(listings));
}

// Navigation
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

// Filters & Search Setup
function setupFilters() {
  const searchInput = document.getElementById("filter-search");
  const catFilter = document.getElementById("filter-category");
  const sortFilter = document.getElementById("filter-sort");

  if (searchInput) searchInput.addEventListener("input", renderListings);
  if (catFilter) catFilter.addEventListener("change", renderListings);
  if (sortFilter) sortFilter.addEventListener("change", renderListings);
}

// Price Transparency Calculator & Listings Renderer
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

  // Sorting
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.pricePerKg - b.pricePerKg);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.pricePerKg - a.pricePerKg);
  } else {
    filtered.sort((a, b) => (a.distanceKm || 10) - (b.distanceKm || 10));
  }

  document.getElementById("listings-count-label").textContent = `Showing ${filtered.length} Direct Farm Listings`;

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
      <div class="produce-card">
        <div class="card-top-row">
          <div>
            <h3 class="crop-name">
              ${item.crop}
              ${item.organic ? '<span class="organic-tag">🌱 100% Organic</span>' : ''}
            </h3>
            <div class="farmer-info-row" style="margin-top:0.35rem;">
              <span>👨‍🌾 ${item.farmerName}</span>
              <span>📍 ${item.location} (~${item.distanceKm || 12} km away)</span>
              <span>📦 ${item.quantity} available</span>
            </div>
          </div>

          <div class="direct-price-badge">
            <div class="price-main">₹${item.pricePerKg}</div>
            <div class="price-unit">Direct Farmer Price / kg</div>
          </div>
        </div>

        <!-- The Core WOW Feature: Live Transparent Price Comparison -->
        <div class="price-comparison-box">
          <div class="comp-metric">
            <span class="comp-label">Middleman Mandi Buy Price</span>
            <span class="comp-val" style="color:#991b1b; text-decoration: line-through;">₹${mandiPrice}/kg</span>
          </div>

          <div class="comp-metric">
            <span class="comp-label">Typical Retail Market Price</span>
            <span class="comp-val" style="color:#64748b;">₹${retailPrice}/kg</span>
          </div>

          <div class="comp-badge">
            🎉 Buyer Saves ${consumerSavingsPct}% • Farmer Earns +${farmerGainPct}% More
          </div>
        </div>

        <p style="font-size:0.88rem; color:#475569;">${item.description}</p>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.8rem; color:#64748b;">📅 Harvested: ${item.harvestDate}</span>
          <div style="display:flex; gap:0.75rem;">
            <button class="btn btn-primary" style="padding:0.5rem 1.25rem; font-size:0.85rem;" onclick="openContactModal('${item.farmerName}', '${item.crop}', '${item.pricePerKg}', '${item.phone}', '${item.location}')">
              📞 Contact Farmer Direct
            </button>
            <button class="btn btn-secondary" style="padding:0.5rem 1.25rem; font-size:0.85rem;" onclick="showToast('Produce added to direct bulk order inquiry!')">
              🛒 Bulk Order
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Sell Produce Form
function setupSellForm() {
  const form = document.getElementById("farmer-listing-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newListing = {
      id: "PROD-" + Math.floor(100 + Math.random() * 900),
      farmerName: document.getElementById("sell-name").value,
      crop: document.getElementById("sell-crop").value,
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
      description: document.getElementById("sell-desc").value || "Fresh farm direct harvest with no middleman markup."
    };

    listings.unshift(newListing);
    localStorage.setItem("kisanconnect_listings", JSON.stringify(listings));
    form.reset();
    showToast(`🎉 Produce listing created for ${newListing.crop}!`);
    switchView("buy-view");
  });
}

// Admin & Impact Analytics
function renderDashboard() {
  document.getElementById("dash-total-farmers").textContent = listings.length + 12;
  document.getElementById("dash-total-buyers").textContent = "340+";
  document.getElementById("dash-markup-eliminated").textContent = "₹4.8 Lakhs";
  document.getElementById("dash-avg-gain").textContent = "+42.5%";

  // Chart 1: Volume by Crop
  const ctxCrop = document.getElementById("cropVolumeChart")?.getContext("2d");
  if (ctxCrop) {
    if (cropChartInstance) cropChartInstance.destroy();
    cropChartInstance = new Chart(ctxCrop, {
      type: "bar",
      data: {
        labels: ["Wheat", "Tomatoes", "Rice", "Onions", "Potatoes", "Pulses"],
        datasets: [{
          label: "Volume Traded (Quintals)",
          data: [120, 85, 140, 110, 95, 45],
          backgroundColor: "#15803d",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  // Chart 2: Direct Revenue vs Mandi Revenue
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
            backgroundColor: "#15803d"
          },
          {
            label: "Traditional Middleman Route Income",
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

// Contact Modal
function openContactModal(farmerName, crop, price, phone, location) {
  document.getElementById("modal-farmer-name").textContent = farmerName;
  document.getElementById("modal-crop-name").textContent = crop;
  document.getElementById("modal-price").textContent = `₹${price}/kg`;
  document.getElementById("modal-phone").textContent = phone;
  document.getElementById("modal-location").textContent = location;
  document.getElementById("contact-modal").classList.add("active");
}

function closeContactModal() {
  document.getElementById("contact-modal").classList.remove("active");
}

// Toast
function showToast(msg) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.querySelector("span").textContent = msg;
  toast.style.display = "flex";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

// SIH Slide Deck Navigation
function setupSlideDeck() {
  const nextBtn = document.getElementById("slide-next-btn");
  const prevBtn = document.getElementById("slide-prev-btn");

  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));

  window.addEventListener("keydown", (e) => {
    if (document.getElementById("presentation-view")?.classList.contains("active")) {
      if (e.key === "ArrowRight" || e.key === "Space") changeSlide(1);
      if (e.key === "ArrowLeft") changeSlide(-1);
    }
  });
}

function changeSlide(dir) {
  const slides = document.querySelectorAll(".slide-content");
  const dots = document.querySelectorAll(".slide-dot");
  if (!slides.length) return;

  slides[currentSlide].classList.remove("active");
  if (dots[currentSlide]) dots[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + dir + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  document.getElementById("slide-counter").textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
}

function jumpToSlide(idx) {
  const slides = document.querySelectorAll(".slide-content");
  const dots = document.querySelectorAll(".slide-dot");
  if (!slides.length) return;

  slides[currentSlide].classList.remove("active");
  if (dots[currentSlide]) dots[currentSlide].classList.remove("active");

  currentSlide = idx;
  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  document.getElementById("slide-counter").textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
}
