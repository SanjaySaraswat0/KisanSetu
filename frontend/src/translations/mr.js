export default {
  // Navigation
  nav: {
    brand: "किसानसेतू",
    farmer: "शेतकरी",
    buyer: "खरेदीदार",
    fpo: "एफपीओ पूलिंग",
    marketplace: "बाजारपेठ",
    admin: "प्रशासक",
    aiAssistant: "एआय सहाय्यक",
  },

  // Decision actions
  actions: {
    SELL_NOW: "आत्ता विक्री करा",
    WAIT: "थांबा",
    STORE: "साठवणूक करा",
    AGGREGATE: "एफपीओ पूलिंग करा",
    FPO_POOL: "एफपीओ पूलिंग करा",
  },

  // Market indicators
  signals: {
    marketPrice: "बाजारभाव",
    demandLevel: "मागणी पातळी",
    weatherRisk: "हवामान जोखीम",
    logisticsFreight: "वाहतूक भाडे",
    high: "उच्च",
    medium: "मध्यम",
    low: "कमी",
    clear: "कमी (स्वच्छ हवामान)",
  },

  // Farmer Dashboard
  farmer: {
    bannerTag: "शेतकरी निर्णय इंजिन",
    welcome: "स्वागत आहे, रमेश कुमार",
    subtitle: "उज्जैन, मध्य प्रदेश • प्रगती किसान एफपीओ सदस्य",
    mandiPriceTitle: "बाजारभाव (गहू)",
    perQuintal: "/ क्विंटल",
    perKg: "/ किलो",
    formTitle: "उत्पादन तपशील भरा",
    cropName: "पिकाचे नाव",
    quantity: "प्रमाण (किलो)",
    district: "जिल्हा",
    daysUntilHarvest: "काढणीसाठी उर्वरित दिवस",
    availableStorage: "उपलब्ध साठवणूक (किलो)",
    currentPrice: "चालू बाजारभाव (₹/किलो)",
    transportCost: "वाहतूक खर्च (₹/किलो)",
    storageCost: "साठवणूक खर्च (₹/किलो)",
    calculateBtn: "एआय निर्णयाची गणना करा",
    calculatingBtn: "जेमिनी एआय विश्लेषण करत आहे...",
    aiRecommendation: "एआय शिफारस",
    riskFactorsTitle: "जोखीम घटक",
    totalPayoutLabel: "अंदाजे एकूण परतावा",
    placeholderPrompt: "फॉर्म भरा आणि जेमिनी-आधारित शिफारस मिळवण्यासाठी 'एआय निर्णयाची गणना करा' वर क्लिक करा.",
    crops: {
      Wheat: "गहू (Wheat)",
      Onion: "कांदा (Onion)",
      Potato: "बटाटा (Potato)",
      Cotton: "कापूस (Cotton)",
    },
  },

  // Sell Decision Card
  decisionCard: {
    confidence: "अचूकता",
    currentPrice: "चालू भाव",
    forecast7d: "७-दिवसांचा अंदाज",
    netRealization: "निव्वळ प्राप्ती",
  },

  // Net Realization Card
  netRealization: {
    buyerOffer: "खरेदीदाराची ऑफर",
    bestNetRealization: "सर्वोत्तम निव्वळ प्राप्ती",
    quotedPrice: "प्रस्तावित किंमत",
    transportCost: "वाहतूक खर्च",
    storageFees: "साठवणूक / शुल्क",
    title: "निव्वळ प्राप्ती (NET REALIZATION)",
    totalNetPayout: "एकूण निव्वळ परतावा",
  },

  // Quality Grading Card
  quality: {
    title: "एआय गुणवत्ता प्रतवारी (YOLOv8 व्हिजन)",
    dropTitle: "गुणवत्ता तपासणीसाठी पिकाचा फोटो निवडा किंवा येथे ड्रॅग करा",
    dropSubtitle: "JPG, PNG समर्थित (जास्तीत जास्त 5MB)",
    changeImage: "फोटो बदलण्यासाठी क्लिक करा",
    scanBtn: "पिकाची गुणवत्ता स्कॅन करा",
    scanningBtn: "गुणवत्तेचे विश्लेषण सुरू आहे...",
    detectedCrop: "ओळखलेले पीक",
    confidence: "अचूकता",
    defectRate: "त्रुटी दर",
    defects: "दोष",
  },

  // Buyer Dashboard
  buyer: {
    bannerTag: "खरेदीदार पोर्टल",
    companyName: "अ‍ॅग्रीकॉर्प प्रोसेसिंग लिमिटेड",
    subtitle: "पिकांची खरेदी मागणी पोस्ट करा, थेट पडताळणी केलेल्या शेतकरी आणि एफपीओ गटांकडून खरेदी करा.",
    formTitle: "खरेदी मागणी नोंदवा",
    category: "खरेदीदार प्रवर्ग",
    requiredCrop: "आवश्यक पीक",
    requiredQuantity: "आवश्यक प्रमाण (किलो)",
    maxOfferPrice: "कमाल ऑफर किंमत (₹/किलो)",
    targetDistrict: "लक्षित जिल्हा",
    postBtn: "+ खरेदी मागणी नोंदवा",
    activeTitle: "सक्रिय खरेदी मागण्या",
    postedBy: "यांनी नोंदवले",
    qualityGrade: "गुणवत्ता",
    matchBtn: "शेतकरी / एफपीओ जुळवा",
    categories: {
      Processor: "अन्न प्रक्रियादार (Processor)",
      Wholesaler: "घाऊक व्यापारी (Wholesaler)",
      Retailer: "किरकोळ साखळी (Retailer)",
      Institutional: "संस्थात्मक खरेदीदार (Institutional)",
      Bulk: "मोठा निर्यातदार (Bulk Exporter)",
    },
  },

  // FPO Dashboard
  fpo: {
    bannerTag: "एफपीओ पोर्टल",
    coopName: "प्रगती किसान उत्पादक सहकारी संस्था",
    subtitle: "सभासदांच्या मालाचे एकत्रीकरण व्यवस्थापित करा आणि मोठ्या खरेदीदारांशी चांगल्या दरासाठी चर्चा करा.",
    totalAggregated: "एकूण एकत्रित उत्पादन",
    poolsTitle: "सक्रिय उत्पादन एकत्रीकरण गट",
    aggregatedLot: "एकत्रित लॉट",
    targetPrice: "लक्षित किंमत",
    contributionsTitle: "सभासद लॉट योगदान",
    farmerNamePlaceholder: "शेतकऱ्याचे नाव (उदा. विक्रम सिंह)",
    qtyPlaceholder: "प्रमाण (किलो)",
    poolBtn: "+ सभासद लॉट जोडा",
  },

  // Marketplace
  marketplace: {
    title: "किसानसेतू थेट शेतमाल बाजारपेठ",
    subtitle: "पडताळणी केलेले शेतकरी, एफपीओ आणि घाऊक खरेदीदार यांच्यातील थेट दुवा.",
    all: "सर्व",
    wheat: "गहू",
    onion: "कांदा",
    verifiedSeller: "✓ पडताळणी केलेला विक्रेता",
    availableQty: "उपलब्ध प्रमाण:",
    askingPrice: "अपेक्षित किंमत:",
    location: "स्थान:",
    makeOfferBtn: "खरेदी ऑफर द्या",
  },

  // Admin Dashboard
  admin: {
    bannerTag: "प्रशासक कन्सोल",
    title: "किसानसेतू प्लॅटफॉर्म व्यवस्थापन",
    subtitle: "प्लॅटफॉर्म विश्लेषण, तक्रार निवारण आणि बाजार डेटा पडताळणी.",
    stats: {
      farmers: "एकूण शेतकरी",
      buyers: "सक्रिय खरेदीदार",
      fpos: "नोंदणीकृत एफपीओ",
      listings: "सक्रिय यादी",
      txVolume: "व्यवहार मूल्य",
      totalVolume: "एकूण प्रमाण",
    },
    disputeTitle: "प्रलंबित तक्रार निवारण",
    orderTag: "ऑर्डर #८८१",
    disputeDesc: "रमेश कुमार (शेतकरी) विरुद्ध अ‍ॅग्रीकॉर्प प्रोसेसिंग लिमिटेड (खरेदीदार)",
    disputeReason: "उत्पादन गुणवत्ता प्रतवारी स्कोअरमधील तफावत (ग्रेड ए नमूद वि. ग्रेड बी प्राप्त).",
    reviewBtn: "तक्रारीचे पुनरावलोकन करा",
  },

  // Login / Landing Page
  login: {
    tag: "SIH26132 — बाजार जोडणी आणि भाव शोध",
    title: "किसानसेतू",
    subtitle: "शेतकऱ्यांना मार्गदर्शन: कधी विकावे? कुठे विकावे? कोणाला विकावे? आत्ता विकावे, साठवून ठेवावे की एफपीओद्वारे एकत्र करून विकावे?",
    enterPortal: "पोर्टलमध्ये जा →",
    farmerCard: {
      title: "शेतकरी पोर्टल",
      desc: "एआय विक्री शिफारसी, अपेक्षित निव्वळ प्राप्ती, हवामान अंदाज आणि एफपीओ पूलिंग.",
    },
    buyerCard: {
      title: "खरेदीदार पोर्टल",
      desc: "प्रक्रियादार, घाऊक व्यापारी आणि किरकोळ विक्रेत्यांसाठी खरेदी मागण्या पोस्ट करण्यासाठी.",
    },
    fpoCard: {
      title: "एफपीओ पूलिंग",
      desc: "लहान शेतकऱ्यांचे लॉट एकत्र करा (100kg + 150kg + 250kg = 500kg) आणि चांगला दर मिळवा.",
    },
    adminCard: {
      title: "प्रशासक कन्सोल",
      desc: "प्लॅटफॉर्म मेट्रिक्स, तक्रार हाताळणी, गुणवत्ता तपासणी आणि बाजारभावांचे निरीक्षण.",
    },
    engineTitle: "किसानसेतू इंटेलिजन्स इंजिनद्वारे समर्थित",
    engineDesc: "बाजारभाव अंदाज (Prophet) + विक्री निर्णय क्लासिफायर (XGBoost + SHAP) + गुणवत्ता प्रतवारी (YOLOv8) + व्हॉइस एआय एजंट (भाषिणी + जेमिनी एआय) + स्मार्ट निव्वळ प्राप्ती कॅल्क्युलेटर.",
  },

  // Price Trends
  trends: {
    priceTrend: "भाव कल",
  },

  // AI Assistant Modal
  assistant: {
    title: "किसानसेतू एआय सहाय्यक",
    subtitle: "संदर्भ-जाणकार कृषी बाजार सल्लागार",
    poweredBy: "✦ जेमिनी २.५ फ्लॅश",
    loadingText: "किसानसेतू एआय विश्लेषण करत आहे...",
    placeholder: "तुमचा प्रश्न विचारा (उदा. मी गहू आता विकावा का?)...",
    send: "पाठवा",
    greeting: "नमस्कार! मी किसानसेतू AI सहाय्यक आहे. आपण मला बाजारभाव, धान्य विक्रीची योग्य वेळ किंवा खरेदीदारांबद्दल विचारू शकता.",
    sampleChips: [
      "मी माझा गहू आता विकावा का?",
      "माझ्या गव्हासाठी सर्वात चांगला खरेदीदार कोण आहे?",
      "मी ५ दिवस वाट पाहिली तर काय होईल?",
    ],
  },
};
