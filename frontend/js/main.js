/* ─── Translations ─── */
const translations = {
  en: {
    nav_home: "Home", nav_features: "Features", nav_about: "About", nav_get_started: "Get Started", nav_logout: "Logout",
    sb_main: "Main", sb_overview: "Overview", sb_detect: "Detect Disease", sb_weather: "Weather Risk",
    sb_tools: "Tools", sb_history: "History", sb_chatbot: "AI Chat", sb_alerts: "Alerts",
    sb_account: "Account", sb_profile: "Profile", sb_logout: "Logout",
    hero_badge: "🤖 AI-Powered · Made for Indian Farmers",
    hero_title: "Protect Your Crops with Intelligent Detection",
    hero_subtitle: "Upload photos of your crops and get instant AI-powered disease diagnosis, stage-wise treatment plans, weather risk predictions, and government scheme recommendations — in your language.",
    btn_hero_primary: "🚀 Start Free Analysis",
    btn_hero_secondary: "Learn More ↓",
    quick_scan: "🔬 Quick Disease Scan",
    upload_photos: "Upload Crop Photos",
    analyze_btn: "🧠 Analyze with AI",
    weather_risk_today: "🌦️ Weather Risk Today",
    recent_scans: "📜 Recent Scans",
    dash_greeting_ai: "AI Analysis",
    dash_title_detect: "Detect Crop Disease",
    upload_images_5: "📸 Upload Images (up to 5)",
    tap_to_choose: "Tap to choose crop photos",
    multiple_angles: "Multiple angles = higher accuracy",
    problem_desc: "Problem Description (Optional)",
    desc_placeholder: "Describe the symptoms, e.g., 'Yellow spots on leaves for 3 days...'",
    response_language: "Response Language",
    analysis_results: "📋 Analysis Results",
    upload_to_see: "Upload images and click Analyze to see results here.",
    dash_greeting: "Good morning 👋",
    dash_welcome: "Welcome back, Farmer",
    stat_crops_monitored: "Crops Monitored",
    stat_total_scans: "Total Scans",
    stat_issues_resolved: "Issues Resolved",
    stat_active_alerts: "Active Alerts",
    change_crops: "↑ 1 this week",
    change_scans: "↑ 3 new",
    change_resolved: "↑ 2 this month",
    change_alerts: "↑ needs attention",
    quick_scan_title: "Start a New Disease Scan",
    quick_scan_desc: "Upload multiple photos and describe the symptoms for an accurate AI diagnosis.",
    go_detect_btn: "Go to Detect Disease",
    details_arrow: "Details →",
    humidity_label: "Humidity: 74%",
    rainfall_label: "Rainfall: 12mm",
    disease_risk_high: "🦠 Disease Risk: HIGH",
    fungal_risk_desc: "High humidity increases fungal infection risk. Monitor crops closely today.",
    loading_scans: "Loading scans...",
    table_date: "Date",
    table_crop: "Crop",
    table_disease: "Disease",
    table_severity: "Severity",
    table_status: "Status",
    table_treatment: "Treatment",
    table_confidence: "Confidence",
    live_data: "Live Data",
    weather_risk_monitor: "Weather Risk Monitor",
    current_conditions: "🌡️ Current Conditions",
    location_maharashtra: "Maharashtra, India",
    multi_day_forecast: "📅 Multi-day Forecast",
    loading_forecast: "Loading forecast...",
    weather_condition: "Partly Cloudy · Humidity 74% · Rainfall 12mm",
    disease_risk_alerts: "⚠️ Disease Risk Alerts",
    fungal_check_title: "🍄 Fungal Infection Risk Check",
    fungal_check_desc: "Watch humidity levels above 70%. Fungal spores spread rapidly in these conditions.",
    track_progress: "Track Progress",
    scan_history: "Scan History",
    all_detections: "📜 All Disease Detections",
    crop_health_score: "🏆 Crop Health Score",
    health_score_label: "out of 100 · Good Health",
    health_recovery_msg: "Your crops are showing good recovery. Continue monitoring the field and maintain scheduled applications.",
    ai_assistant: "24/7 AI Assistant",
    chatbot_title: "CropDr. Chat",
    chatbot_subtitle: "🤖 Ask Anything About Your Crops",
    ai_greeting: "🌱 Namaste! I'm your CropDr. AI assistant. Ask me anything about crop diseases, treatments, fertilizers, or weather effects. I can respond in Hindi too!",
    ai_tips: "💡 Try asking: \"Why is my wheat turning yellow?\" or \"What should I spray for fungal infection?\"",
    quick_q1: "Why is my crop turning yellow?",
    quick_q2: "Fungal infection spray?",
    chat_placeholder: "Ask about your crops... (English or Hindi)",
    send_btn: "Send",
    conversations_title: "🕰️ Your Conversations",
    new_chat_btn: "+ New Chat",
    loading_history: "Loading history...",
    stay_ahead: "Stay Ahead",
    early_warning_alerts: "Early Warning Alerts",
    active_alerts: "🔔 Active Alerts",
    loading_live_alerts: "Loading live alerts...",
    recent_notifications: "📢 Recent Notifications",
    no_notifications: "No recent notifications",
    account: "Account",
    your_profile: "Your Profile",
    farmer_tag: "🌾 Smallhold Farmer",
    plan_label: "🌱 Plan: Free Forever",
    plan_desc: "Unlimited scans · All features included",
    farmer_details: "📋 Farmer Details",
    full_name: "Full Name",
    email_address: "Email Address",
    location: "Location",
    preferred_language: "Preferred Language",
    empty_dash: "—",
    language_value: "English / हिंदी",
    view_all_arrow: "View All →",
    new_scan_btn: "+ New Scan"
  },
  hi: {
    nav_home: "होम", nav_features: "विशेषताएं", nav_about: "हमारे बारे में", nav_get_started: "शुरू करें", nav_logout: "लॉग आउट",
    sb_main: "मुख्य", sb_overview: "अवलोकन", sb_detect: "रोग का पता लगाएं", sb_weather: "मौसम जोखिम",
    sb_tools: "उपकरण", sb_history: "इतिहास", sb_chatbot: "एआई चैट", sb_alerts: "अलर्ट",
    sb_account: "खाता", sb_profile: "प्रोफ़ाइल", sb_logout: "लॉग आउट",
    hero_badge: "🤖 AI-संचालित · भारतीय किसानों के लिए निर्मित",
    hero_title: "बुद्धिमान पहचान से अपनी फसलों की रक्षा करें",
    hero_subtitle: "अपनी फसलों की तस्वीरें अपलोड करें और तुरंत AI-संचालित रोग निदान, चरण-वार उपचार योजनाएं, मौसम जोखिम भविष्यवाणियां और सरकारी योजना सिफारिशें प्राप्त करें - अपनी भाषा में।",
    btn_hero_primary: "🚀 मुफ्त जांच शुरू करें",
    btn_hero_secondary: "और जानें ↓",
    quick_scan: "🔬 त्वरित रोग जांच",
    upload_photos: "फसल की तस्वीरें अपलोड करें",
    analyze_btn: "🧠 AI से जांच करें",
    weather_risk_today: "🌦️ आज का मौसम जोखिम",
    recent_scans: "📜 हाल के स्कैन",
    dash_greeting_ai: "AI विश्लेषण",
    dash_title_detect: "फसल रोग का पता लगाएं",
    upload_images_5: "📸 तस्वीरें अपलोड करें (5 तक)",
    tap_to_choose: "तस्वीरें चुनने के लिए टैप करें",
    multiple_angles: "कई कोण = उच्च सटीकता",
    problem_desc: "समस्या का विवरण (वैकल्पिक)",
    desc_placeholder: "लक्षणों का वर्णन करें, जैसे, 'पत्तियों पर पीले धब्बे...'",
    response_language: "प्रतिक्रिया की भाषा",
    analysis_results: "📋 विश्लेषण परिणाम",
    upload_to_see: "तस्वीरें अपलोड करें और परिणाम देखने के लिए जांच करें पर क्लिक करें।",
    dash_greeting: "सुप्रभात 👋",
    dash_welcome: "वापसी के लिए स्वागत है, किसान",
    stat_crops_monitored: "निगरानी की जाने वाली फसलें",
    stat_total_scans: "कुल स्कैन",
    stat_issues_resolved: "समस्याएं समाधान",
    stat_active_alerts: "सक्रिय अलर्ट",
    change_crops: "↑ इस हफ्ते 1",
    change_scans: "↑ 3 नए",
    change_resolved: "↑ इस महीने 2",
    change_alerts: "↑ ध्यान देने की जरूरत है",
    quick_scan_title: "एक नई रोग जांच शुरू करें",
    quick_scan_desc: "सटीक AI निदान के लिए कई तस्वीरें अपलोड करें और लक्षणों का वर्णन करें।",
    go_detect_btn: "रोग का पता लगाने के लिए जाएं",
    details_arrow: "विवरण →",
    humidity_label: "आर्द्रता: 74%",
    rainfall_label: "वर्षा: 12 मिमी",
    disease_risk_high: "🦠 रोग जोखिम: उच्च",
    fungal_risk_desc: "उच्च आर्द्रता फंगल संक्रमण के जोखिम को बढ़ाती है। आज फसलों की बारीकी से निगरानी करें।",
    loading_scans: "स्कैन लोड हो रहे हैं...",
    table_date: "तारीख",
    table_crop: "फसल",
    table_disease: "रोग",
    table_severity: "गंभीरता",
    table_status: "स्थिति",
    table_treatment: "इलाज",
    table_confidence: "आत्मविश्वास",
    live_data: "लाइव डेटा",
    weather_risk_monitor: "मौसम जोखिम मॉनिटर",
    current_conditions: "🌡️ वर्तमान स्थितियां",
    location_maharashtra: "महाराष्ट्र, भारत",
    multi_day_forecast: "📅 बहु-दिवसीय पूर्वानुमान",
    loading_forecast: "पूर्वानुमान लोड हो रहा है...",
    weather_condition: "आंशिक बादल · आर्द्रता 74% · वर्षा 12 मिमी",
    disease_risk_alerts: "⚠️ रोग जोखिम अलर्ट",
    fungal_check_title: "🍄 फंगल संक्रमण जोखिम जांच",
    fungal_check_desc: "70% से ऊपर आर्द्रता स्तर की निगरानी करें। इन परिस्थितियों में फंगल बीजाणु तेजी से फैलते हैं।",
    track_progress: "प्रगति ट्रैक करें",
    scan_history: "स्कैन इतिहास",
    all_detections: "📜 सभी रोग पहचान",
    crop_health_score: "🏆 फसल स्वास्थ्य स्कोर",
    health_score_label: "100 में से · अच्छा स्वास्थ्य",
    health_recovery_msg: "आपकी फसलें अच्छी वसूली दिखा रही हैं। क्षेत्र की निगरानी जारी रखें और निर्धारित आवेदनों को बनाए रखें।",
    ai_assistant: "24/7 AI सहायक",
    chatbot_title: "CropDr. चैट",
    chatbot_subtitle: "🤖 अपनी फसलों के बारे में कुछ भी पूछें",
    ai_greeting: "🌱 नमस्ते! मैं आपका CropDr. AI सहायक हूं। फसल रोगों, उपचारों, खादों या मौसम प्रभावों के बारे में मुझसे कुछ भी पूछें। मैं हिंदी में भी जवाब दे सकता हूं!",
    ai_tips: "💡 पूछने का प्रयास करें: \"मेरी फसल पीली क्यों हो रही है?\" या \"फंगल संक्रमण के लिए मुझे क्या छिड़कना चाहिए?\"",
    quick_q1: "मेरी फसल पीली क्यों हो रही है?",
    quick_q2: "फंगल संक्रमण स्प्रे?",
    chat_placeholder: "अपनी फसलों के बारे में पूछें... (अंग्रेजी या हिंदी)",
    send_btn: "भेजें",
    conversations_title: "🕰️ आपकी बातचीत",
    new_chat_btn: "+ नई चैट",
    loading_history: "इतिहास लोड हो रहा है...",
    stay_ahead: "आगे रहें",
    early_warning_alerts: "प्रारंभिक चेतावनी अलर्ट",
    active_alerts: "🔔 सक्रिय अलर्ट",
    loading_live_alerts: "लाइव अलर्ट लोड हो रहे हैं...",
    recent_notifications: "📢 हाल के सूचनाएं",
    no_notifications: "कोई हाल की सूचनाएं नहीं",
    account: "खाता",
    your_profile: "आपकी प्रोफाइल",
    farmer_tag: "🌾 छोटे खेत किसान",
    plan_label: "🌱 योजना: हमेशा के लिए मुफ्त",
    plan_desc: "असीमित स्कैन · सभी सुविधाएं शामिल",
    farmer_details: "📋 किसान विवरण",
    full_name: "पूरा नाम",
    email_address: "ईमेल पता",
    location: "स्थान",
    preferred_language: "पसंदीदा भाषा",
    empty_dash: "—",
    language_value: "अंग्रेजी / हिंदी",
    view_all_arrow: "सभी देखें →",
    new_scan_btn: "+ नई स्कैन"
  },
  mr: {
    nav_home: "मुख्यपृष्ठ", nav_features: "वैशिष्ट्ये", nav_about: "आमच्याबद्दल", nav_get_started: "सुरू करा", nav_logout: "लॉग आउट",
    sb_main: "मुख्य", sb_overview: "आढावा", sb_detect: "रोग शोधा", sb_weather: "हवामान धोका",
    sb_tools: "साधने", sb_history: "इतिहास", sb_chatbot: "एआय चॅट", sb_alerts: "अलर्ट",
    sb_account: "खाते", sb_profile: "प्रोफाइल", sb_logout: "लॉग आउट",
    hero_badge: "🤖 AI-सक्षम · भारतीय शेतकऱ्यांसाठी बनवलेले",
    hero_title: "स्मार्ट ओळखीसह आपल्या पिकांचे संरक्षण करा",
    hero_subtitle: "आपल्या पिकांचे फोटो अपलोड करा आणि त्वरित AI-आधारित रोग निदान, टप्प्याटप्प्याने उपचार योजना, हवामान धोका अंदाज आणि सरकारी योजना शिफारसी मिळवा — आपल्या भाषेत.",
    btn_hero_primary: "🚀 मोफत विश्लेषण सुरू करा",
    btn_hero_secondary: "अधिक जाणून घ्या ↓",
    quick_scan: "🔬 जलद रोग स्कॅन",
    upload_photos: "पिकाचे फोटो अपलोड करा",
    analyze_btn: "🧠 AI द्वारे विश्लेषण करा",
    weather_risk_today: "🌦️ आजचा हवामान धोका",
    recent_scans: "📜 अलीकडील स्कॅन",
    dash_greeting_ai: "AI विश्लेषण",
    dash_title_detect: "पिकाचा रोग ओळखा",
    upload_images_5: "📸 फोटो अपलोड करा (५ पर्यंत)",
    tap_to_choose: "फोटो निवडण्यासाठी टॅप करा",
    multiple_angles: "अनेक कोन = उच्च अचूकता",
    problem_desc: "समस्येचे वर्णन (पर्यायी)",
    desc_placeholder: "लक्षणे वर्णन करा, जसे, 'पानांवर पिवळे डाग...'",
    response_language: "प्रतिसाद भाषा",
    analysis_results: "📋 विश्लेषणाचे परिणाम",
    upload_to_see: "फोटो अपलोड करा आणि परिणाम पाहण्यासाठी विश्लेषण करा वर क्लिक करा.",
    dash_greeting: "सुप्रभात 👋",
    dash_welcome: "परत येण्यास स्वागत आहे, शेतकरी",
    stat_crops_monitored: "निरीक्षण केलेली पिके",
    stat_total_scans: "एकूण स्कॅन",
    stat_issues_resolved: "समस्या सोडवल्या",
    stat_active_alerts: "सक्रिय अलर्ट",
    change_crops: "↑ या आठवड्यातील 1",
    change_scans: "↑ 3 नवीन",
    change_resolved: "↑ या महिन्यातील 2",
    change_alerts: "↑ लक्ष देण्याची गरज आहे",
    quick_scan_title: "नवीन रोग स्कॅन सुरू करा",
    quick_scan_desc: "अचूक AI निदानासाठी एकाधिक फोटो अपलोड करा आणि लक्षणे वर्णन करा।",
    go_detect_btn: "रोग शोधण्यास जा",
    details_arrow: "तपशील →",
    humidity_label: "आर्द्रता: 74%",
    rainfall_label: "पाऊस: 12 मिमी",
    disease_risk_high: "🦠 रोग जोखिम: उच्च",
    fungal_risk_desc: "उच्च आर्द्रता बुरशी संक्रमणाचा जोखिम वाढवते। आज पिकांचे बारीक निरीक्षण करा।",
    loading_scans: "स्कॅन लोड होत आहेत...",
    table_date: "तारीख",
    table_crop: "पिक",
    table_disease: "रोग",
    table_severity: "गंभीरता",
    table_status: "स्थिती",
    table_treatment: "उपचार",
    table_confidence: "आत्मविश्वास",
    live_data: "लाइव डेटा",
    weather_risk_monitor: "हवामान धोका मॉनिटर",
    current_conditions: "🌡️ वर्तमान परिस्थिती",
    location_maharashtra: "महाराष्ट्र, भारत",
    multi_day_forecast: "📅 बहु-दिवसीय अंदाज",
    loading_forecast: "अंदाज लोड होत आहे...",
    weather_condition: "अंशतः ढगाळ · आर्द्रता 74% · पाऊस 12 मिमी",
    disease_risk_alerts: "⚠️ रोग जोखिम अलर्ट",
    fungal_check_title: "🍄 बुरशी संक्रमण जोखिम तपासा",
    fungal_check_desc: "70% वर आर्द्रता स्तर पहा. या परिस्थितीतून बुरशीजन्य बीजाणु वेगाने पसरतात.",
    track_progress: "प्रगती ट्रॅक करा",
    scan_history: "स्कॅन इतिहास",
    all_detections: "📜 सर्व रोग शोध",
    crop_health_score: "🏆 पिक स्वास्थ्य स्कोर",
    health_score_label: "100 पैकी · चांगली आरोग्य",
    health_recovery_msg: "आपली पिके चांगली पुनर्प्राप्ती दर्शवत आहेत. क्षेत्राचे निरीक्षण सुरू ठेवा आणि अनुसूचित अनुप्रयोग राखा.",
    ai_assistant: "24/7 AI सहायक",
    chatbot_title: "CropDr. चॅट",
    chatbot_subtitle: "🤖 आपल्या पिकांविषयी काहीही विचारा",
    ai_greeting: "🌱 नमस्ते! मैं आपका CropDr. AI सहायक हूं. पिक रोगांबद्दल, उपचारांबद्दल, खतांबद्दल किंवा हवामानाच्या प्रभावांबद्दल मला काहीही विचारा. मी मराठीतही उत्तर देऊ शकतो!",
    ai_tips: "💡 विचारण्याचा प्रयत्न करा: \"माझी पिक पिवळी का होत आहे?\" किंवा \"बुरशी संक्रमणासाठी मी काय फवारावे?\"",
    quick_q1: "माझी पिक पिवळी का होत आहे?",
    quick_q2: "बुरशी संक्रमण फवारा?",
    chat_placeholder: "आपल्या पिकांविषयी विचारा... (इंग्रजी किंवा मराठी)",
    send_btn: "पाठवा",
    conversations_title: "🕰️ आपल्या संभाषणा",
    new_chat_btn: "+ नवीन चॅट",
    loading_history: "इतिहास लोड होत आहे...",
    stay_ahead: "आगे राहा",
    early_warning_alerts: "प्रारंभिक चेतावणी अलर्ट",
    active_alerts: "🔔 सक्रिय अलर्ट",
    loading_live_alerts: "लाइव अलर्ट लोड होत आहेत...",
    recent_notifications: "📢 अलीकडील सूचना",
    no_notifications: "कोणती अलीकडील सूचना नाही",
    account: "खाते",
    your_profile: "आपली प्रोफाइल",
    farmer_tag: "🌾 लहान शेतकरी",
    plan_label: "🌱 योजना: सर्वकाळ विनामूल्य",
    plan_desc: "अमर्यादित स्कॅन · सर्व वैशिष्ट्ये समाविष्ट",
    farmer_details: "📋 शेतकरी तपशील",
    full_name: "पूर्ण नाव",
    email_address: "ई-मेल पत्ता",
    location: "स्थान",
    preferred_language: "पसंतीची भाषा",
    empty_dash: "—",
    language_value: "इंग्रजी / मराठी",
    view_all_arrow: "सर्व पहा →",
    new_scan_btn: "+ नवीन स्कॅन"
  }
};

let currentLang = localStorage.getItem('cropdr_lang') || 'en';

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('cropdr_lang', lang);
  document.querySelectorAll('.lang-switch').forEach(el => el.value = lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  const detLang = document.getElementById('det-lang');
  if (detLang) {
    if (lang === 'en') detLang.value = 'English';
    else if (lang === 'hi') detLang.value = 'हिंदी (Hindi)';
    else if (lang === 'mr') detLang.value = 'मराठी (Marathi)';
  }
}

/* ─── Config ─── */
const API = window.location.origin.includes('localhost') ? 'http://localhost:3001/api' : '/api';

/* ─── State ─── */
let currentUser = null;

/* ─── Auth helpers ─── */
function getToken() { return localStorage.getItem('cropdr_token'); }
function setToken(t) { localStorage.setItem('cropdr_token', t); }
function clearToken() { localStorage.removeItem('cropdr_token'); }

function authHeaders() {
  return { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' };
}

function getInitials(name) {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U';
}

/* ─── Page Router & Nav ─── */
function goHome() { window.location.href = 'index.html'; }
function goAuth() { window.location.href = 'auth.html'; }
function goDashboard() { window.location.href = 'dashboard.html'; }

function updateNav() {
  const guest = document.getElementById('nav-links-guest');
  const user = document.getElementById('nav-user');
  if (!guest && !user) return; // not on landing page
  
  if (currentUser) {
    if(guest) guest.style.display = 'none';
    if(user) user.style.display = 'flex';
    const initials = getInitials(currentUser.name);
    const navAvatar = document.getElementById('nav-avatar');
    const navUserName = document.getElementById('nav-user-name');
    if(navAvatar) navAvatar.textContent = initials;
    if(navUserName) navUserName.textContent = currentUser.name.split(' ')[0];
  } else {
    if(guest) guest.style.display = 'flex';
    if(user) user.style.display = 'none';
  }
}

function logout() {
  currentUser = null;
  clearToken();
  showToast('👋 Logged out successfully.');
  setTimeout(() => goHome(), 800);
}

/* ─── Toast ─── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ─── Scroll Reveal ─── */
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Global Init ─── */
window.addEventListener('load', async () => {
  // Apply saved language immediately
  switchLanguage(currentLang);
  
  const loader = document.getElementById('page-loading');
  
  const token = getToken();
  if (token) {
    try {
      const res = await fetch(`${API}/user/profile`, { headers: { 'Authorization': 'Bearer ' + token } });
      if (res.ok) {
        const user = await res.json();
        currentUser = { ...user, token };
        updateNav();
        
        // If on auth page and logged in, redirect to dashboard
        if (window.location.pathname.includes('auth.html')) {
          goDashboard();
        }
        
        // Initialize dashboard safely now that user data is loaded
        if (typeof window.initDashboard === 'function') {
          window.initDashboard();
        }
      } else { clearToken(); }
    } catch { clearToken(); }
  } else {
    // If on dashboard and NOT logged in, redirect to auth
    if (window.location.pathname.includes('dashboard.html')) {
      goAuth();
    }
  }
  
  setTimeout(() => {
    if(loader) loader.classList.add('hidden');
    initRevealObserver();
  }, 1000);
});
