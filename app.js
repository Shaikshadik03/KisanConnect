/**
 * KisanConnect Application Logic, Multilingual Engine & AI Voice Agent
 * Self-contained: No external JSON fetch required! Works directly on double-click or server.
 */

// ==========================================================================
// 1. MULTILINGUAL TRANSLATION DICTIONARY
// ==========================================================================
const TRANSLATIONS = {
  en: {
    mandi_ticker_lbl: "⚡ LIVE MANDI BENCHMARK",
    brand_sub: "Direct Farm-Gate Agricultural Network",
    nav_home: "Home",
    nav_market: "Marketplace",
    nav_farmer: "Farmer Portal",
    nav_analytics: "📊 Analytics",
    btn_voice_agent: "Kisan AI Voice",
    hero_tag: "🌱 100% Direct Farm-Gate Trade • Zero Intermediary Commission",
    hero_title: "Fair Prices for <em>Growers</em>.<br>Fresh Produce for <em>Families</em>.",
    hero_desc: "Bypassing 3–4 layers of middlemen markups to ensure Indian farmers receive up to 50% higher profits while consumers, bulk buyers, and restaurants enjoy premium, farm-fresh harvests at transparent wholesale rates.",
    btn_explore: "🛒 Explore Farm Harvests",
    btn_sell: "👨‍🌾 List My Produce",
    btn_calc: "⚡ Price Calculator",
    btn_speak: "Voice Help",
    verified_farm: "✓ Verified Farm",
    stat_commission: "Intermediary Commission",
    stat_gain: "Average Extra Farmer Earnings",
    stat_savings: "Direct Consumer Savings",
    stat_transparency: "Live Mandi Price Transparency",
    cat_heading: "Explore 8 Farm Produce Categories",
    cat_sub: "Source directly from verified village farm clusters and organic growers across India",
    cat_grains: "🌾 Grains & Millets",
    cat_vegetables: "🍅 Fresh Farm Vegetables",
    cat_pulses: "🫘 Organic Pulses & Dals",
    cat_spices: "🌶️ Direct Spices & Herbs",
    cat_fruits: "🍎 Orchard Fruits",
    cat_oils: "🛢️ Cold-Pressed Oils",
    cat_honey: "🍯 Raw Forest Honey & Dairy",
    cat_herbs: "🌿 Ayurvedic Herbs",
    group_tag: "🤝 Neighborhood Group Buying",
    group_title: "Pool Orders with Neighbors for Extra 15% Bulk Discount",
    group_desc: "When your apartment society or colony hits the target batch weight, farmer unlocks free direct doorstep freight!",
    route_tag: "🚚 Farm-Gate to Doorstep Transit Estimator",
    route_title: "Calculate Direct Transit Distance & Freshness Speed",
    route_desc: "Select your delivery destination to see how quickly harvest dispatch reaches your city directly without warehouse holding delays:",
    cal_title: "Seasonal Crop Harvest Calendar",
    cal_sub: "Plan your household and commercial procurement by peak harvest cycles",
    how_title: "How KisanConnect Works",
    how_sub: "A zero-commission direct agricultural commerce pipeline in 3 simple steps",
    step1_title: "Farmer Lists Batch Directly",
    step1_desc: "Growers post crop photos, available quantity (kg/quintal), village location, and expected fair price per kg in under 60 seconds.",
    step2_title: "Middleman-Bypass Pricing",
    step2_desc: "Our engine compares live Mandi wholesale rates against retail supermarket prices to highlight direct savings for both sides.",
    step3_title: "Direct Connection & Delivery",
    step3_desc: "Buyers connect directly via 1-click Phone or WhatsApp to arrange bulk farm-gate pickup or shared community delivery.",
    calc_title: "See the Real Economic Impact",
    testi_title: "Trusted by Growers & Consumers",
    testi_sub: "Real stories from the direct farm-to-table cooperative",
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
    brand_sub: "सीधा किसान से उपभोक्ता कृषि नेटवर्क",
    nav_home: "होम",
    nav_market: "मंडी बाजार",
    nav_farmer: "किसान पोर्टल",
    nav_analytics: "📊 प्रभाव रिपोर्ट",
    btn_voice_agent: "किसान आवाज़ सहायक",
    hero_tag: "🌱 100% सीधा खेत से व्यापार • शून्य बिचौलिया कमीशन",
    hero_title: "किसानों को मिले <em>उचित दाम</em>.<br>उपभोक्ताओं को मिले <em>ताज़ा अनाज</em>.",
    hero_desc: "3-4 बिचौलियों की परत को हटाकर भारतीय किसानों को 50% अधिक मुनाफा और उपभोक्ताओं को ताज़ा फसल थोक भाव पर उपलब्ध कराना।",
    btn_explore: "🛒 ताज़ा फसलें देखें",
    btn_sell: "👨‍🌾 अपनी फसल लिस्ट करें",
    btn_calc: "⚡ भाव कैलकुलेटर",
    btn_speak: "बोलकर मदद लें",
    verified_farm: "✓ सत्यापित किसान",
    stat_commission: "बिचौलिया कमीशन",
    stat_gain: "किसान का अतिरिक्त मुनाफा",
    stat_savings: "उपभोक्ता की सीधी बचत",
    stat_transparency: "लाइव मंडी पारदर्शिता",
    cat_heading: "8 मुख्य कृषि श्रेणियों में फसलें देखें",
    cat_sub: "भारत भर के सत्यापित गांवों और जैविक किसानों से सीधे खरीदें",
    cat_grains: "🌾 अनाज एवं बाजरा",
    cat_vegetables: "🍅 ताज़ा हरी सब्ज़ियाँ",
    cat_pulses: "🫘 जैविक दालें",
    cat_spices: "🌶️ शुद्ध मसाले",
    cat_fruits: "🍎 बाग़ीचे के फल",
    cat_oils: "🛢️ कच्ची घानी तेल",
    cat_honey: "🍯 प्राकृतिक शहद व घी",
    cat_herbs: "🌿 आयुर्वेदिक जड़ी-बूटियाँ",
    group_tag: "🤝 सामूहिक मोहल्ला खरीद",
    group_title: "पड़ोसियों के साथ मिलकर खरीदें और 15% अतिरिक्त छूट पाएं",
    group_desc: "जब आपकी कॉलोनी या सोसायटी का ऑर्डर लक्ष्य पूरा होता है, किसान सीधे मुफ़्त डिलीवरी भेजता है!",
    route_tag: "🚚 खेत से घर तक दूरी एवं ताज़गी कैलकुलेटर",
    route_title: "सीधी दूरी और डिलीवरी समय जांचें",
    route_desc: "अपने शहर का चयन करें और देखें कि बिना किसी कोल्ड स्टोरेज देरी के ताज़ा फसल कितने समय में पहुंचेगी:",
    cal_title: "मौसमी फसल कटाई कैलेंडर",
    cal_sub: "फसल के मुख्य मौसम के अनुसार अपनी खरीद की योजना बनाएं",
    how_title: "किसान कनेक्ट कैसे काम करता है?",
    how_sub: "3 आसान चरणों में शून्य कमीशन सीधा व्यापार",
    step1_title: "किसान फसल लिस्ट करें",
    step1_desc: "किसान फोटो, मात्रा, गांव का नाम और उचित मूल्य 60 सेकंड में जोड़ें।",
    step2_title: "बिचौलिया रहित तुलनात्मक मूल्य",
    step2_desc: "हमारा सिस्टम मंडी भाव और सुपरमार्केट भाव की तुलना करके दोनों पक्षों का लाभ दिखाता है।",
    step3_title: "सीधा संपर्क व खेत से डिलीवरी",
    step3_desc: "खरीदार 1-क्लिक फ़ोन या व्हाट्सएप से संपर्क करके सीधे खेत से माल मंगाते हैं।",
    calc_title: "वास्तविक आर्थिक बचत देखें",
    testi_title: "किसानों और खरीदारों का भरोसा",
    testi_sub: "सीधे खेत से थाली तक के वास्तविक अनुभव",
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
  },
  pa: {
    mandi_ticker_lbl: "⚡ ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਅੱਪਡੇਟ",
    brand_sub: "ਸਿੱਧਾ ਖੇਤ ਤੋਂ ਖਰੀਦਦਾਰ ਨੈੱਟਵਰਕ",
    nav_home: "ਮੁੱਖ ਪੰਨਾ",
    nav_market: "ਮੰਡੀ ਬਜ਼ਾਰ",
    nav_farmer: "ਕਿਸਾਨ ਪੋਰਟਲ",
    nav_analytics: "📊 ਰਿਪੋਰਟ",
    btn_voice_agent: "ਕਿਸਾਨ ਆਵਾਜ਼ ਮਿੱਤਰ",
    hero_tag: "🌱 100% ਸਿੱਧਾ ਖੇਤ ਵਪਾਰ • ਜ਼ੀਰੋ ਕਮਿਸ਼ਨ",
    hero_title: "ਕਿਸਾਨਾਂ ਲਈ <em>ਸਹੀ ਮੁੱਲ</em>.<br>ਪਰਿਵਾਰਾਂ ਲਈ <em>ਤਾਜ਼ੀ ਫਸਲ</em>.",
    hero_desc: "ਵਿਚੋਲਿਆਂ ਨੂੰ ਹਟਾ ਕੇ ਕਿਸਾਨਾਂ ਨੂੰ 50% ਵੱਧ ਮੁਨਾਫਾ ਅਤੇ ਗਾਹਕਾਂ ਨੂੰ ਤਾਜ਼ਾ ਅਨਾਜ ਥੋਕ ਭਾਅ 'ਤੇ ਦੇਣਾ।",
    btn_explore: "🛒 ਫਸਲਾਂ ਦੇਖੋ",
    btn_sell: "👨‍🌾 ਫਸਲ ਲਿਸਟ ਕਰੋ",
    btn_calc: "⚡ ਮੁੱਲ ਕੈਲਕੁਲੇਟਰ",
    btn_speak: "ਆਵਾਜ਼ ਮਦਦ",
    verified_farm: "✓ ਤਸਦੀਕਸ਼ੁਦਾ ਖੇਤ",
    stat_commission: "ਵਿਚੋਲਾ ਕਮਿਸ਼ਨ",
    stat_gain: "ਕਿਸਾਨ ਦਾ ਵਾਧੂ ਮੁਨਾਫ਼ਾ",
    stat_savings: "ਗ੍ਰਾਹਕ ਦੀ ਬੱਚਤ",
    stat_transparency: "ਲਾਈਵ ਮੰਡੀ ਪਾਰਦਰਸ਼ਤਾ"
  },
  te: {
    mandi_ticker_lbl: "⚡ ప్రత్యక్ష మార్కెట్ ధరలు",
    brand_sub: "రైతు నుండి నేరుగా వినియోగదారులకు",
    nav_home: "హోమ్",
    nav_market: "మార్కెట్",
    nav_farmer: "రైతు పోర్టల్",
    nav_analytics: "📊 విశ్లేషణ",
    btn_voice_agent: "కిసాన్ వాయిస్ ఏజెంట్",
    hero_tag: "🌱 100% నేరుగా పొలం నుండి అమ్మకం • జీరో కమిషన్",
    hero_title: "రైతులకు <em>న్యాయమైన ధర</em>.<br>కుటుంబాలకు <em>తాజా పంట</em>.",
    hero_desc: "దళారుల ప్రమేయం లేకుండా రైతులకు 50% అధిక ఆదాయం, వినియోగదారులకు సరసమైన ధరలు.",
    btn_explore: "🛒 పంటలను చూడండి",
    btn_sell: "👨‍🌾 పంటను నమోదు చేయండి",
    btn_calc: "⚡ ధర కాలిక్యులేటర్",
    btn_speak: "వాయిస్ సహాయం"
  },
  kn: {
    mandi_ticker_lbl: "⚡ ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು",
    brand_sub: "ರೈತರಿಂದ ನೇರ ಗ್ರಾಹಕ ಜಾಲ",
    nav_home: "ಮುಖಪುಟ",
    nav_market: "ಮಾರುಕಟ್ಟೆ",
    nav_farmer: "ರೈತ ಪೋರ್ಟಲ್",
    nav_analytics: "📊 ವರದಿ",
    btn_voice_agent: "ಕಿಸಾನ್ ಧ್ವನಿ ಸಹಾಯಕ",
    hero_tag: "🌱 100% ನೇರ ಕೃಷಿ ವ್ಯಾಪಾರ • ಶೂನ್ಯ ಕಮಿಷನ್",
    hero_title: "ರೈತರಿಗೆ <em>ಉತ್ತಮ ಬೆಲೆ</em>.<br>ಕುಟುಂಬಗಳಿಗೆ <em>ತಾಜಾ ಬೆಳೆ</em>.",
    hero_desc: "ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ರೈತರಿಗೆ 50% ಹೆಚ್ಚು ಲಾಭ ಮತ್ತು ಗ್ರಾಹಕರಿಗೆ ನ್ಯಾಯಯುತ ಬೆಲೆ.",
    btn_explore: "🛒 ಬೆಳೆಗಳನ್ನು ನೋಡಿ",
    btn_sell: "👨‍🌾 ಬೆಳೆ ನೋಂದಾಯಿಸಿ",
    btn_calc: "⚡ ಬೆಲೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    btn_speak: "ಧ್ವನಿ ಸಹಾಯ"
  },
  mr: {
    mandi_ticker_lbl: "⚡ थेट बाजार भाव अपडेट",
    brand_sub: "शेतकरी ते थेट ग्राहक कृषी नेटवर्क",
    nav_home: "मुख्य पृष्ठ",
    nav_market: "बाजारपेठ",
    nav_farmer: "शेतकरी पोर्टल",
    nav_analytics: "📊 अहवाल",
    btn_voice_agent: "किसान व्हॉईस मित्र",
    hero_tag: "🌱 100% थेट शेतातून खरेदी • शून्य दलाली",
    hero_title: "शेतकऱ्यांना <em>योग्य भाव</em>.<br>ग्राहकांना <em>ताजा शेતमाल</em>.",
    hero_desc: "दलालांशिवाय शेतकऱ्यांना 50% जास्त नफा आणि ग्राहकांना परवडणाऱ्या भावात ताजा माल.",
    btn_explore: "🛒 शेतमाल पहा",
    btn_sell: "👨‍🌾 शेतमाल नोंदवा",
    btn_calc: "⚡ भाव कॅल्क्युलेटर",
    btn_speak: "व्हॉईस मदत"
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
// 2. 12+ DIVERSE FARM PRODUCE LISTINGS WITH HIGH-RES PHOTOS
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
  const localSaved = localStorage.getItem("kisanconnect_listings_v7");
  if (localSaved) {
    try {
      listings = JSON.parse(localSaved);
      return;
    } catch (e) {
      console.warn("Using defaults");
    }
  }
  listings = [...DEFAULT_LISTINGS];
  localStorage.setItem("kisanconnect_listings_v7", JSON.stringify(listings));
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

// ==========================================================================
// 3. AI FARMER VOICE AGENT ("KISAN MITRA / किसान मित्र")
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

  // Check browser SpeechRecognition support
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
    // Simulated Voice Mode if SpeechRecognition not permitted
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

  if (qLower.includes("wheat") || qLower.includes("गेहूँ") || qLower.includes("kanak")) {
    responseText = "🌾 Sharbati Wheat is currently trading at ₹28/kg directly from Balwinder Singh (Ludhiana), saving buyers 33% compared to retail!";
  } else if (qLower.includes("tomato") || qLower.includes("टमाटर") || qLower.includes("tamatar")) {
    responseText = "🍅 Fresh Hybrid Tomatoes are ₹22/kg direct from Santosh Patil (Nashik). Over 2,500 kg available for direct farm pickup!";
  } else if (qLower.includes("rice") || qLower.includes("चावल") || qLower.includes("chawal") || qLower.includes("basmati")) {
    responseText = "🍚 Sona Masoori Raw Rice is ₹44/kg from Mandya, and 1121 Basmati Paddy is ₹75/kg from Karnal with zero middleman deductions.";
  } else if (qLower.includes("sell") || qLower.includes("बेचें") || qLower.includes("list")) {
    responseText = "👨‍🌾 To sell your produce, go to the 'Farmer Portal' tab, enter crop quantity and price, and publish your direct listing in 60 seconds!";
    switchView("sell-view");
  } else if (qLower.includes("helpline") || qLower.includes("नंबर") || qLower.includes("help") || qLower.includes("call")) {
    responseText = "📞 Toll-Free National Kisan Call Center: 1800-180-1551. Available 6 AM to 10 PM in 22 regional Indian languages!";
  } else {
    responseText = `🌾 You asked: "${query}". KisanConnect has 12+ direct farm batches available with live price transparency and zero commission.`;
  }

  if (outputBubble) {
    outputBubble.innerHTML = `<strong>🗣️ You:</strong> "${query}"<br><br><strong>🤖 Kisan Mitra:</strong> ${responseText}`;
  }

  // Voice Speech Synthesis Output (TTS)
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(responseText);
    utterance.rate = 0.95;
    utterance.lang = currentLang === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(utterance);
  }
}

// ==========================================================================
// 4. INTERACTIVE PRICE COMPARISON CALCULATOR
// ==========================================================================
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

// ==========================================================================
// 5. ROUTE & FRESHNESS TRANSIT CALCULATOR
// ==========================================================================
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

// ==========================================================================
// 6. COMMUNITY GROUP BUYING PLEDGE
// ==========================================================================
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

  showToast(`🎉 You pledged ${pool.pledgeStep} ${pool.unit} to the ${cropName} pool!`);
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
          <img src="${item.cropImage || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=85'}" alt="${item.crop}" class="produce-photo">
          ${item.organic ? '<span class="organic-badge-overlay">🌱 100% Certified Organic</span>' : '<span class="organic-badge-overlay" style="background:rgba(20,83,45,0.85);">🚜 Farm-Fresh Batch</span>'}
        </div>

        <div class="produce-body">
          <div>
            <div class="crop-header">
              <div>
                <h3 class="crop-title">${item.crop}</h3>
                <div style="display:flex; align-items:center; gap:0.6rem; margin-top:0.4rem;">
                  <img src="${item.farmerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=85'}" class="farmer-avatar-img">
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
    localStorage.setItem("kisanconnect_listings_v7", JSON.stringify(listings));
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
