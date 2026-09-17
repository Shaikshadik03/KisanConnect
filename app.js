/**
 * KisanConnect Application Logic, Multilingual Engine & AI Voice Agent
 * Full 4-Pillar Support: IoT Irrigation, Perimeter Guard, AI Crop Doctor, D2C Marketplace
 */

// ==========================================================================
// 1. MULTILINGUAL TRANSLATION DICTIONARY
// ==========================================================================
const TRANSLATIONS = {
  en: {
    mandi_ticker_lbl: "⚡ LIVE MANDI BENCHMARK",
    nav_home: "Home",
    nav_market: "🛒 D2C Market",
    nav_farmer: "👨‍🌾 Farmer Portal",
    nav_analytics: "📊 Analytics",
    btn_voice_agent: "Kisan AI Voice",
    hero_tag: "🌱 4-Pillar Smart Agriculture Ecosystem • Zero Intermediary Commission",
    hero_title: "Fair Prices for <em>Growers</em>.<br>Smart Protection for <em>Farms</em>.",
    hero_desc: "An end-to-end platform bridging IoT automated irrigation, PIR perimeter security, AI plant disease diagnostics with drone dispersion, and a transparent direct-to-consumer (D2C) marketplace.",
    btn_explore: "🛒 Explore D2C Market",
    btn_speak: "Voice Help",
    filter_title: "🔍 Filter Harvests",
    filter_search_lbl: "Search Crop or District",
    filter_cat_lbl: "Crop Category",
    filter_sort_lbl: "Sort By",
    btn_apply_filter: "⚡ Apply Filters",
    sell_title: "👨‍🌾 List Your Harvest Direct to Buyers",
    sell_sub: "Fair farm-gate prices • Zero deductions • Instant buyer inquiries",
    form_name: "Farmer / Farm Name",
    form_crop: "Crop / Produce Name",
    form_cat: "Category",
    form_loc: "Village & District",
    form_qty: "Available Quantity",
    form_unit: "Unit",
    form_price: "Direct Price per kg/unit (₹)",
    form_date: "Harvest Date",
    form_phone: "WhatsApp / Phone Number",
    form_organic: "🌱 100% Certified Organic Produce",
    form_desc: "Produce Notes & Farm Location",
    btn_submit_listing: "✅ Publish Direct Farm Listing",
    dash_title: "📊 Agricultural Impact & Savings Analytics",
    fab_voice_text: "Kisan Mitra AI Voice"
  },
  hi: {
    mandi_ticker_lbl: "⚡ लाइव मंडी भाव अपडेट",
    nav_home: "होम",
    nav_market: "🛒 सीधा बाज़ार",
    nav_farmer: "👨‍🌾 किसान पोर्टल",
    nav_analytics: "📊 प्रभाव रिपोर्ट",
    btn_voice_agent: "किसान आवाज़ सहायक",
    hero_tag: "🌱 4-स्तंभ स्मार्ट कृषि इकोसिस्टम • शून्य बिचौलिया कमीशन",
    hero_title: "किसानों को मिले <em>उचित दाम</em>.<br>खेतों को मिले <em>स्मार्ट सुरक्षा</em>.",
    hero_desc: "IoT ऑटो-सिंचाई, बाउंड्री सुरक्षा, AI पत्ता रोग जांच व ड्रोन छिड़काव, और सीधा उपभोक्ता बाज़ार का सम्पूर्ण समाधान।",
    btn_explore: "🛒 फसलें देखें",
    btn_speak: "बोलकर मदद लें",
    filter_title: "🔍 फसल खोजें",
    filter_search_lbl: "फसल या जिला खोजें",
    filter_cat_lbl: "फसल श्रेणी",
    filter_sort_lbl: "क्रमबद्ध करें",
    btn_apply_filter: "⚡ फिल्टर लगाएं",
    sell_title: "👨‍🌾 अपनी फसल सीधे खरीदारों को बेचें",
    sell_sub: "उचित खेत भाव • शून्य कटौती • तुरंत खरीदार पूछताछ",
    form_name: "किसान / खेत का नाम",
    form_crop: "फसल का नाम",
    form_cat: "श्रेणी",
    form_loc: "गांव और जिला",
    form_qty: "उपलब्ध मात्रा",
    form_unit: "इकाई",
    form_price: "सीधा भाव प्रति किलो/इकाई (₹)",
    form_date: "कटाई की तारीख",
    form_phone: "व्हाट्सएप / फोन नंबर",
    form_organic: "🌱 100% प्रमाणित जैविक फसल",
    form_desc: "फसल का विवरण और खेत का पता",
    btn_submit_listing: "✅ फसल लिस्टिंग प्रकाशित करें",
    dash_title: "📊 कृषि आर्थिक प्रभाव और बचत रिपोर्ट",
    fab_voice_text: "किसान मित्र आवाज़ सहायक"
  }
};

let currentLang = "en";

function changeLanguage(lang) {
  currentLang = lang;
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    if (dict[key]) {
      elem.innerHTML = dict[key];
    }
  });

  const langSelect = document.getElementById("lang-select");
  if (langSelect) langSelect.value = lang;

  showToast(`🌐 Language changed to ${lang.toUpperCase()}`);
}

// ==========================================================================
// 2. MODULE A: IoT SOIL MOISTURE & DRY WATERING AUTOMATION
// ==========================================================================
function simulateSoilMoisture(val) {
  const moisture = parseInt(val);
  const mValEl = document.getElementById("iot-moisture-val");
  const mStatusEl = document.getElementById("iot-moisture-status");
  const pValEl = document.getElementById("iot-pump-val");
  const pBadgeEl = document.getElementById("iot-pump-badge");
  const jsonFeed = document.getElementById("iot-json-feed");
  const readout = document.getElementById("slider-moisture-readout");

  if (readout) readout.textContent = `${moisture}%`;
  if (mValEl) mValEl.textContent = `${moisture}%`;

  let pumpActive = false;
  let statusText = "Optimum Hydration";
  let statusBg = "#dcfce7";
  let statusColor = "#15803d";

  if (moisture < 30) {
    pumpActive = true;
    statusText = "⚠️ Critically Dry - Irrigation Triggered";
    statusBg = "#fee2e2";
    statusColor = "#991b1b";
  } else if (moisture > 65) {
    statusText = "💧 High Saturation";
    statusBg = "#dbeafe";
    statusColor = "#1e40af";
  }

  if (mStatusEl) {
    mStatusEl.textContent = statusText;
    mStatusEl.style.background = statusBg;
    mStatusEl.style.color = statusColor;
  }

  if (pValEl && pBadgeEl) {
    if (pumpActive) {
      pValEl.textContent = "ACTIVE (ON)";
      pValEl.style.color = "#dc2626";
      pBadgeEl.textContent = "Relay Active - Pumping Water";
      pBadgeEl.style.background = "#fee2e2";
      pBadgeEl.style.color = "#991b1b";
    } else {
      pValEl.textContent = "OFF";
      pValEl.style.color = "#64748b";
      pBadgeEl.textContent = "Standby Mode";
      pBadgeEl.style.background = "#f1f5f9";
      pBadgeEl.style.color = "#475569";
    }
  }

  if (jsonFeed) {
    jsonFeed.textContent = JSON.stringify({
      node_id: "ESP32-SOIL-PB01",
      farm_id: "FARM-PB-042",
      sector: "SECTOR-NORTH-WHEAT",
      moisture_pct: moisture,
      raw_adc: Math.round(3200 - (moisture * 18)),
      pump_relay: pumpActive,
      threshold_low: 30.0,
      threshold_high: 65.0,
      status: pumpActive ? "IRRIGATION_IN_PROGRESS" : "HEALTHY_ROOT_ZONE"
    }, null, 2);
  }
}

// ==========================================================================
// 3. MODULE B: CROP PROTECTION & PERIMETER SECURITY
// ==========================================================================
function triggerIntrusionAlert(threatType) {
  const overlay = document.getElementById("sec-alert-overlay");
  const camBadge = document.getElementById("sec-cam-badge");
  const eventList = document.getElementById("sec-event-list");
  const camImg = document.getElementById("sec-cam-img");

  if (overlay) {
    overlay.style.display = "flex";
    overlay.innerHTML = `🚨 INTRUSION ALERT: ${threatType.replace('_', ' ')}!<br><span style="font-size:0.9rem; font-weight:600;">Strobe LED Flashing & 110dB Siren Triggered</span>`;
  }

  if (camBadge) {
    camBadge.textContent = `🔴 ALERT: ${threatType}`;
    camBadge.style.background = "#fee2e2";
    camBadge.style.color = "#991b1b";
  }

  if (camImg) {
    camImg.style.filter = "brightness(1.2) contrast(1.2) hue-rotate(-20deg)";
  }

  const now = new Date().toLocaleTimeString();
  if (eventList) {
    const newEvent = document.createElement("div");
    newEvent.style.cssText = "background:#fee2e2; border-left:4px solid #dc2626; padding:0.85rem; border-radius:8px; font-size:0.85rem; animation:fadeIn 0.3s ease;";
    newEvent.innerHTML = `
      <strong style="color:#991b1b;">🚨 ${threatType.replace('_', ' ')} Detected:</strong>
      PIR Motion confirmed at Zone East fence. Strobe & siren fired. SMS dispatched to farmer.
      <div style="font-size:0.72rem; color:#7f1d1d; margin-top:0.2rem;">Just now at ${now} • ESP32-CAM Snapshot Logged</div>
    `;
    eventList.insertBefore(newEvent, eventList.firstChild);
  }

  showToast(`🚨 Security Alert: ${threatType.replace('_', ' ')} detected on perimeter fence!`);

  setTimeout(() => {
    if (overlay) overlay.style.display = "none";
    if (camBadge) {
      camBadge.textContent = "🟢 Perimeter Armed & Clear";
      camBadge.style.background = "#dcfce7";
      camBadge.style.color = "#15803d";
    }
    if (camImg) camImg.style.filter = "none";
  }, 4000);
}

// ==========================================================================
// 4. MODULE C: AI PLANT PATHOLOGY & DRONE FERTILIZATION
// ==========================================================================
const AI_DIAGNOSES = {
  Tomato_Early_Blight: {
    name: "Tomato Early Blight (Alternaria solani)",
    score: "94.8%",
    severity: "High Severity Pathology",
    severityBg: "#fee2e2",
    severityColor: "#991b1b",
    organic: "Neem oil spray (5ml/L) + Trichoderma viride bio-fungicide.",
    chemical: "Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L.",
    fertilizer: "Spray Potassium Phosphite (0.2%) to strengthen leaf cell wall resilience.",
    drone: "Dosage calculated: 45 ml/sq.m @ 2.5 m/s flight speed",
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=85"
  },
  Wheat_Yellow_Rust: {
    name: "Wheat Stripe / Yellow Rust (Puccinia striiformis)",
    score: "96.2%",
    severity: "Critical Fungal Pathology",
    severityBg: "#fef3c7",
    severityColor: "#b45309",
    organic: "Fermented buttermilk (50ml/L) + Cow urine bio-spray.",
    chemical: "Propiconazole 25% EC (Tilt) @ 1ml/L of water.",
    fertilizer: "Zinc Sulphate 33% (0.5%) + Urea foliar spray (1%).",
    drone: "Dosage calculated: 35 ml/sq.m @ 3.0 m/s flight speed",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=85"
  },
  Rice_Bacterial_Blight: {
    name: "Rice Bacterial Leaf Blight (Xanthomonas oryzae)",
    score: "91.5%",
    severity: "Severe Bacterial Infection",
    severityBg: "#fee2e2",
    severityColor: "#991b1b",
    organic: "Pseudomonas fluorescens (10g/L) canopy spray.",
    chemical: "Streptocycline (1g/10L) + Copper Oxychloride (25g/10L).",
    fertilizer: "Muriate of Potash (MOP) @ 15kg/acre to arrest lesion spread.",
    drone: "Dosage calculated: 50 ml/sq.m @ 2.2 m/s flight speed",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=85"
  },
  Crop_Healthy: {
    name: "Healthy Plant Canopy (Optimum Chlorophyll)",
    score: "98.9%",
    severity: "Normal / Healthy",
    severityBg: "#dcfce7",
    severityColor: "#15803d",
    organic: "Maintenance Jeevamrutha or Panchagavya foliar application.",
    chemical: "None required.",
    fertilizer: "Balanced NPK 19:19:19 booster @ 3g/L.",
    drone: "Zero chemical required. Drone in standby mode.",
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&auto=format&fit=crop&q=85"
  }
};

function runAiDiagnosis(key) {
  const data = AI_DIAGNOSES[key];
  if (!data) return;

  const preview = document.getElementById("ai-scan-preview");
  const nameEl = document.getElementById("ai-disease-name");
  const scoreEl = document.getElementById("ai-confidence-score");
  const sevEl = document.getElementById("ai-severity-badge");
  const orgEl = document.getElementById("ai-organic-remedy");
  const chemEl = document.getElementById("ai-chemical-remedy");
  const fertEl = document.getElementById("ai-fertilizer-dosage");
  const droneEl = document.getElementById("ai-drone-status");

  if (preview) preview.src = data.img;
  if (nameEl) nameEl.textContent = data.name;
  if (scoreEl) scoreEl.textContent = data.score;
  if (sevEl) {
    sevEl.textContent = data.severity;
    sevEl.style.background = data.severityBg;
    sevEl.style.color = data.severityColor;
  }
  if (orgEl) orgEl.textContent = data.organic;
  if (chemEl) chemEl.textContent = data.chemical;
  if (fertEl) fertEl.textContent = data.fertilizer;
  if (droneEl) droneEl.textContent = data.drone;

  showToast(`🔬 AI Pathology Scan Complete: ${data.name.split('(')[0]}`);
}

function dispatchDroneSpray() {
  showToast("🛸 Precision Agriculture UAV Dispatched! Initiating GPS-guided micro-misting...");
}

// ==========================================================================
// 5. MODULE D: 12+ DIVERSE PRODUCE LISTINGS
// ==========================================================================
const DEFAULT_LISTINGS = [
  {
    "id": "PROD-001",
    "farmerName": "Balwinder Singh",
    "farmerAvatar": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=85",
    "crop": "Organic Sharbati Wheat",
    "cropImage": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=85",
    "crop": "Fresh Red Tomatoes",
    "cropImage": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=85",
    "crop": "Sona Masoori Raw Rice",
    "cropImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=85",
    "crop": "Guntur Red Chillies (Dry)",
    "cropImage": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=85",
    "crop": "Lasalgaon Red Onions",
    "cropImage": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=85",
    "crop": "Basmati 1121 Rice",
    "cropImage": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=85",
    "crop": "Fresh Table Potatoes",
    "cropImage": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=85",
    "crop": "Organic Toor Dal (Pigeon Pea)",
    "cropImage": "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=85",
    "crop": "Kashmiri Red Delicious Apples",
    "cropImage": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=85",
    "crop": "Wood-Pressed Yellow Mustard Oil",
    "cropImage": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=85",
    "crop": "Raw Wild Forest Honey",
    "cropImage": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=85",
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
    "farmerAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=85",
    "crop": "Organic Pure Ashwagandha Root",
    "cropImage": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=85",
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
  renderListings();
});

function loadListings() {
  const localSaved = localStorage.getItem("kisanconnect_listings_v8");
  if (localSaved) {
    try {
      listings = JSON.parse(localSaved);
      return;
    } catch (e) {
      console.warn("Using defaults");
    }
  }
  listings = [...DEFAULT_LISTINGS];
  localStorage.setItem("kisanconnect_listings_v8", JSON.stringify(listings));
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
    window.scrollTo(0, 0);
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

// ==========================================================================
// 6. AI VOICE AGENT ("KISAN MITRA / किसान मित्र")
// ==========================================================================
let isListening = false;
let recognition = null;

function toggleVoiceModal() {
  const modal = document.getElementById("voice-modal");
  if (!modal) return;
  modal.classList.toggle("active");
}

function startVoiceListening() {
  const micBtn = document.getElementById("voice-mic-btn");
  const wave = document.getElementById("voice-waveform");
  const statusText = document.getElementById("voice-status-text");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    if (!recognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLang === "hi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => {
        isListening = true;
        if (micBtn) micBtn.classList.add("listening");
        if (wave) wave.classList.add("active");
        if (statusText) statusText.textContent = "Listening to your voice... Speak now!";
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processVoiceQuery(transcript);
      };

      recognition.onerror = () => {
        stopVoiceAnimation();
        if (statusText) statusText.textContent = "Could not hear clearly. Try clicking the quick chips below!";
      };

      recognition.onend = () => {
        stopVoiceAnimation();
      };
    }

    try {
      recognition.start();
    } catch (e) {
      recognition.stop();
      stopVoiceAnimation();
    }
  } else {
    if (micBtn) micBtn.classList.add("listening");
    if (wave) wave.classList.add("active");
    if (statusText) statusText.textContent = "Listening... (Simulating Voice AI)";

    setTimeout(() => {
      stopVoiceAnimation();
      processVoiceQuery("What is today wheat mandi price?");
    }, 2000);
  }
}

function stopVoiceAnimation() {
  isListening = false;
  const micBtn = document.getElementById("voice-mic-btn");
  const wave = document.getElementById("voice-waveform");
  const statusText = document.getElementById("voice-status-text");

  if (micBtn) micBtn.classList.remove("listening");
  if (wave) wave.classList.remove("active");
  if (statusText) statusText.textContent = "Kisan Mitra AI Ready";
}

function processVoiceQuery(query) {
  stopVoiceAnimation();
  const outputBubble = document.getElementById("voice-output-bubble");
  const qLower = query.toLowerCase();

  let responseText = "";

  if (qLower.includes("wheat") || qLower.includes("गेहूँ")) {
    responseText = "🌾 Sharbati Wheat is currently trading at ₹28/kg directly from Balwinder Singh (Ludhiana), saving buyers 33% compared to retail!";
  } else if (qLower.includes("moisture") || qLower.includes("soil") || qLower.includes("पानी")) {
    responseText = "💧 Sector-North Wheat soil moisture is at 42% (Optimum root-zone condition). Automatic pump relay is currently in standby.";
    switchView("iot-view");
  } else if (qLower.includes("disease") || qLower.includes("blight") || qLower.includes("रोग") || qLower.includes("पत्ता")) {
    responseText = "🔬 Opening AI Leaf Doctor. Tomato Early Blight detected with 94.8% confidence. Recommended remedy: Neem oil spray + Potassium Phosphite.";
    switchView("ai-doc-view");
  } else if (qLower.includes("helpline") || qLower.includes("नंबर") || qLower.includes("help") || qLower.includes("call")) {
    responseText = "📞 Toll-Free National Kisan Call Center: 1800-180-1551. Available 6 AM to 10 PM in 22 regional Indian languages!";
  } else {
    responseText = `🌾 You asked: "${query}". KisanConnect Smart Agriculture platform has all 4 IoT, AI, Security, and D2C modules active.`;
  }

  if (outputBubble) {
    outputBubble.innerHTML = `<strong>🗣️ You:</strong> "${query}"<br><br><strong>🤖 Kisan Mitra:</strong> ${responseText}`;
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(responseText);
    utterance.rate = 0.95;
    utterance.lang = currentLang === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(utterance);
  }
}

// ==========================================================================
// 7. D2C MARKETPLACE RENDERING & LOGIC
// ==========================================================================
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
          <img src="${item.cropImage || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=85'}" alt="${item.crop}" class="produce-photo">
          ${item.organic ? '<span class="organic-badge-overlay">🌱 100% Certified Organic</span>' : '<span class="organic-badge-overlay" style="background:rgba(15,32,23,0.88); color:#A9D4BC;">🚜 Direct Farm Harvest</span>'}
        </div>

        <div class="produce-body">
          <div>
            <div class="crop-header">
              <div>
                <h3 class="crop-title">${item.crop}</h3>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.35rem;">
                  <img src="${item.farmerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=85'}" class="farmer-avatar-img">
                  <span style="font-weight:700; font-size:0.86rem; color:var(--ink-primary);">${item.farmerName}</span>
                  <span style="color:var(--ink-muted); font-size:0.82rem;">— ${item.location} (${item.distanceKm || 12} km)</span>
                </div>
              </div>

              <div style="text-align:right;">
                <div class="price-tag-big">₹${item.pricePerKg}</div>
                <div style="font-size:0.75rem; color:var(--ink-muted); font-weight:600;">Direct Gate / ${item.unit || 'kg'}</div>
              </div>
            </div>

            <div class="price-contrast-box">
              <div>
                <span style="font-family:var(--font-mono); font-size:0.68rem; font-weight:700; text-transform:uppercase; color:var(--market-amber); display:block;">APMC Mandi Rate</span>
                <div style="font-family:var(--font-mono); font-size:1.05rem; font-weight:700; color:var(--alert-crimson); text-decoration:line-through; font-variant-numeric:tabular-nums;">₹${mandiPrice}/${item.unit || 'kg'}</div>
              </div>

              <div>
                <span style="font-family:var(--font-mono); font-size:0.68rem; font-weight:700; text-transform:uppercase; color:var(--ink-muted); display:block;">Supermarket Retail</span>
                <div style="font-family:var(--font-mono); font-size:1.05rem; font-weight:700; color:var(--ink-secondary); font-variant-numeric:tabular-nums;">₹${retailPrice}/${item.unit || 'kg'}</div>
              </div>

              <div class="contrast-badge">
                Direct Savings: ${consumerSavingsPct}% · Farmer Reclaims +${farmerGainPct}%
              </div>
            </div>

            <p style="font-size:0.88rem; color:var(--ink-secondary); margin: 0.5rem 0; line-height:1.5;">${item.description}</p>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; flex-wrap:wrap; gap:0.5rem; padding-top:0.75rem; border-top:1px solid var(--border-subtle);">
            <span style="font-size:0.8rem; color:var(--ink-muted); font-weight:600;">📦 ${item.quantity} available · Harvested ${item.harvestDate}</span>
            <div style="display:flex; gap:0.65rem;">
              <button class="btn btn-outline" style="padding:0.45rem 1rem; font-size:0.82rem;" onclick="openContactModal('${item.farmerName}', '${item.crop}', '${item.pricePerKg}', '${item.phone}', '${item.location}', '${item.farmerAvatar}')">
                📞 Connect to Farmer
              </button>
              <button class="btn btn-primary" style="padding:0.45rem 1rem; font-size:0.82rem;" onclick="showToast('Produce batch reserved for direct delivery!')">
                🛒 Buy Direct Batch
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
      farmerAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=85",
      crop: document.getElementById("sell-crop").value,
      cropImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=85",
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
    localStorage.setItem("kisanconnect_listings_v8", JSON.stringify(listings));
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

// Explicit global exposure for HTML event handlers and testing
window.changeLanguage = changeLanguage;
window.simulateSoilMoisture = simulateSoilMoisture;
window.triggerIntrusionAlert = triggerIntrusionAlert;
window.runAiDiagnosis = runAiDiagnosis;
window.dispatchDroneSpray = dispatchDroneSpray;
window.switchView = switchView;
window.filterByCategory = filterByCategory;
window.toggleVoiceModal = toggleVoiceModal;
window.startVoiceListening = startVoiceListening;
window.processVoiceQuery = processVoiceQuery;
window.renderListings = renderListings;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.showToast = showToast;

