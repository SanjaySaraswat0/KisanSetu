export default {
  // Navigation
  nav: {
    brand: "किसानसेतु",
    farmer: "किसान",
    buyer: "खरीदार",
    fpo: "एफपीओ पूलिंग",
    marketplace: "मंडी बाज़ार",
    admin: "एडमिन",
    aiAssistant: "एआई सहायक",
  },

  // Decision actions
  actions: {
    SELL_NOW: "अभी बेचें",
    WAIT: "इंतज़ार करें",
    STORE: "भंडारण करें",
    AGGREGATE: "एफपीओ पूलिंग करें",
    FPO_POOL: "एफपीओ पूलिंग करें",
  },

  // Market indicators
  signals: {
    marketPrice: "मंडी भाव",
    demandLevel: "मांग स्तर",
    weatherRisk: "मौसम जोखिम",
    logisticsFreight: "परिवहन भाड़ा",
    high: "उच्च",
    medium: "मध्यम",
    low: "कम",
    clear: "कम (साफ मौसम)",
  },

  // Farmer Dashboard
  farmer: {
    bannerTag: "किसान निर्णय इंजन",
    welcome: "स्वागत है, रमेश कुमार",
    subtitle: "उज्जैन, मध्य प्रदेश • प्रगति किसान एफपीओ सदस्य",
    mandiPriceTitle: "मंडी भाव (गेहूँ)",
    perQuintal: "/ क्विंटल",
    perKg: "/ किलो",
    formTitle: "फसल विवरण दर्ज करें",
    cropName: "फसल का नाम",
    quantity: "मात्रा (किलो)",
    district: "जिला",
    daysUntilHarvest: "कटाई में शेष दिन",
    availableStorage: "उपलब्ध भंडारण (किलो)",
    currentPrice: "वर्तमान मंडी भाव (₹/किलो)",
    transportCost: "परिवहन खर्च (₹/किलो)",
    storageCost: "भंडारण खर्च (₹/किलो)",
    calculateBtn: "एआई निर्णय की गणना करें",
    calculatingBtn: "जेमिनी एआई विश्लेषण कर रहा है...",
    aiRecommendation: "एआई अनुशंसा",
    riskFactorsTitle: "जोखिम कारक",
    totalPayoutLabel: "अनुमानित कुल भुगतान",
    placeholderPrompt: "फॉर्म भरें और जेमिनी-संचालित अनुशंसा प्राप्त करने के लिए 'एआई निर्णय की गणना करें' पर क्लिक करें।",
    crops: {
      Wheat: "गेहूँ (Wheat)",
      Onion: "प्याज (Onion)",
      Potato: "आलू (Potato)",
      Cotton: "कपास (Cotton)",
    },
  },

  // Sell Decision Card
  decisionCard: {
    confidence: "सटीकता",
    currentPrice: "वर्तमान भाव",
    forecast7d: "7-दिवसीय पूर्वानुमान",
    netRealization: "शुद्ध प्राप्ति",
  },

  // Net Realization Card
  netRealization: {
    buyerOffer: "खरीदार का प्रस्ताव",
    bestNetRealization: "सर्वोत्तम शुद्ध प्राप्ति",
    quotedPrice: "प्रस्तावित मूल्य",
    transportCost: "परिवहन खर्च",
    storageFees: "भंडारण / शुल्क",
    title: "शुद्ध प्राप्ति (NET REALIZATION)",
    totalNetPayout: "कुल शुद्ध भुगतान",
  },

  // Quality Grading Card
  quality: {
    title: "एआई गुणवत्ता ग्रेडिंग (YOLOv8 विज़न)",
    dropTitle: "गुणवत्ता विश्लेषण के लिए फसल की फोटो चुनें या यहाँ खींचें",
    dropSubtitle: "JPG, PNG समर्थित (अधिकतम 5MB)",
    changeImage: "फोटो बदलने के लिए क्लिक करें",
    scanBtn: "फसल गुणवत्ता स्कैन करें",
    scanningBtn: "गुणवत्ता का विश्लेषण हो रहा है...",
    detectedCrop: "पहचानी गई फसल",
    confidence: "सटीकता",
    defectRate: "खामी दर",
    defects: "पहचाने गए दोष",
  },

  // Buyer Dashboard
  buyer: {
    bannerTag: "खरीदार खरीद पोर्टल",
    companyName: "एग्रीकॉर्प प्रोसेसिंग लिमिटेड",
    subtitle: "फसल खरीद मांग पोस्ट करें, सत्यापित किसानों और एफपीओ उत्पाद समूहों से सीधे खरीदें।",
    formTitle: "खरीद आवश्यकता पोस्ट करें",
    category: "खरीदार श्रेणी",
    requiredCrop: "आवश्यक फसल",
    requiredQuantity: "आवश्यक मात्रा (किलो)",
    maxOfferPrice: "अधिकतम प्रस्ताव मूल्य (₹/किलो)",
    targetDistrict: "लक्षित जिला",
    postBtn: "+ खरीद आवश्यकता पोस्ट करें",
    activeTitle: "सक्रिय खरीद आवश्यकताएँ",
    postedBy: "द्वारा पोस्ट किया गया",
    qualityGrade: "गुणवत्ता",
    matchBtn: "किसान / एफपीओ से मिलान करें",
    categories: {
      Processor: "खाद्य प्रसंस्करणकर्ता (Processor)",
      Wholesaler: "थोक विक्रेता (Wholesaler)",
      Retailer: "रिटेल चेन (Retailer)",
      Institutional: "संस्थागत खरीदार (Institutional)",
      Bulk: "थोक निर्यातक (Bulk Exporter)",
    },
  },

  // FPO Dashboard
  fpo: {
    bannerTag: "एफपीओ पोर्टल",
    coopName: "प्रगति किसान उत्पादक सहकारी समिति",
    subtitle: "सदस्यों के उत्पाद पूलिंग का प्रबंधन करें, बड़े लॉट बनाएं और थोक खरीदारों से बातचीत करें।",
    totalAggregated: "कुल एकत्रित उपज",
    poolsTitle: "सक्रिय उत्पाद एकत्रीकरण समूह",
    aggregatedLot: "एकत्रित लॉट",
    targetPrice: "लक्षित मूल्य",
    contributionsTitle: "सदस्य लॉट योगदान",
    farmerNamePlaceholder: "किसान का नाम (उदा. विक्रम सिंह)",
    qtyPlaceholder: "मात्रा (किलो)",
    poolBtn: "+ सदस्य लॉट शामिल करें",
  },

  // Marketplace
  marketplace: {
    title: "किसानसेतु प्रत्यक्ष उत्पाद बाज़ार",
    subtitle: "सत्यापित किसानों, एफपीओ और थोक खरीदारों के बीच सीधा बाज़ार संपर्क।",
    all: "सभी",
    wheat: "गेहूँ",
    onion: "प्याज",
    verifiedSeller: "✓ सत्यापित विक्रेता",
    availableQty: "उपलब्ध मात्रा:",
    askingPrice: "मांग मूल्य:",
    location: "स्थान:",
    makeOfferBtn: "खरीद प्रस्ताव दें",
  },

  // Admin Dashboard
  admin: {
    bannerTag: "एडमिन कंसोल",
    title: "किसानसेतु मंच प्रबंधन",
    subtitle: "प्लेटफ़ॉर्म विश्लेषण, विवाद समाधान और बाज़ार डेटा सत्यापन।",
    stats: {
      farmers: "कुल किसान",
      buyers: "सक्रिय खरीदार",
      fpos: "पंजीकृत एफपीओ",
      listings: "सक्रिय लिस्टिंग",
      txVolume: "लेनदेन मूल्य",
      totalVolume: "कुल मात्रा",
    },
    disputeTitle: "लंबित विवाद समाधान",
    orderTag: "ऑर्डर #881",
    disputeDesc: "रमेश कुमार (किसान) बनाम एग्रीकॉर्प प्रोसेसिंग लिमिटेड (खरीदार)",
    disputeReason: "उत्पाद गुणवत्ता ग्रेडिंग स्कोर में विसंगति (ग्रेड ए प्रस्तावित बनाम ग्रेड बी प्राप्त)।",
    reviewBtn: "विवाद की समीक्षा करें",
  },

  // Login / Landing Page
  login: {
    tag: "SIH26132 — बाज़ार संपर्क और मूल्य खोज",
    title: "किसानसेतु",
    subtitle: "किसानों के प्रमुख सवालों का समाधान: कब बेचें? कहाँ बेचें? किसे बेचें? क्या अभी बेचें, स्टोर करें या एफपीओ के ज़रिये बेचें?",
    enterPortal: "पोर्टल में प्रवेश करें →",
    farmerCard: {
      title: "किसान पोर्टल",
      desc: "एआई बिक्री अनुशंसाएँ, अपेक्षित शुद्ध प्राप्ति, मौसम संकेत और एफपीओ पूलिंग।",
    },
    buyerCard: {
      title: "खरीदार पोर्टल",
      desc: "प्रोसेसर, थोक व्यापारी, रिटेलर्स और बल्क खरीदारों के लिए आवश्यकताएँ पोस्ट करने हेतु।",
    },
    fpoCard: {
      title: "एफपीओ पूलिंग",
      desc: "छोटे किसानों के लॉट एकत्र करें (100kg + 150kg + 250kg = 500kg) और बेहतर दाम पाएं।",
    },
    adminCard: {
      title: "एडमिन कंसोल",
      desc: "प्लेटफ़ॉर्म मेट्रिक्स, विवाद प्रबंधन, गुणवत्ता निरीक्षण और बाज़ार मूल्य निगरानी।",
    },
    engineTitle: "किसानसेतु इंटेलिजेंस इंजन द्वारा संचालित",
    engineDesc: "मंडी मूल्य पूर्वानुमान (Prophet) + बिक्री निर्णय क्लासिफ़ायर (XGBoost + SHAP) + गुणवत्ता ग्रेडिंग (YOLOv8) + वॉयस एआई एजेंट (भाषिणी + जेमिनी एआई) + स्मार्ट शुद्ध प्राप्ति कैलकुलेटर।",
  },

  // Price Trends
  trends: {
    priceTrend: "मूल्य रुझान",
  },

  // AI Assistant Modal
  assistant: {
    title: "किसानसेतु एआई साथी",
    subtitle: "संदर्भ-सजग कृषि बाज़ार सलाहकार",
    poweredBy: "✦ जेमिनी 2.5 फ्लैश",
    loadingText: "किसानसेतु एआई विश्लेषण कर रहा है...",
    placeholder: "अपना सवाल लिखें (जैसे: क्या मुझे गेहूँ अभी बेचना चाहिए?)...",
    send: "भेजें",
    greeting: "नमस्ते! मैं किसानसेतु AI साथी हूँ (Gemini 2.5 Flash संचालित)। आप मुझसे मंडी के लाइव भाव, फसल बेचने का सही समय, या उपलब्ध खरीदारों के बारे में पूछ सकते हैं।",
    sampleChips: [
      "क्या मुझे अपना गेहूँ अभी बेचना चाहिए?",
      "मेरे गेहूँ के लिए सबसे अच्छा खरीदार कौन है?",
      "अगर मैं 5 दिन इंतज़ार करूँ तो क्या होगा?",
    ],
  },
};
