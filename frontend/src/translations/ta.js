export default {
  // Navigation
  nav: {
    brand: "கிசான்சேது",
    farmer: "விவசாயி",
    buyer: "வாங்குபவர்",
    fpo: "எஃப்.பி.ஓ திரட்டல்",
    marketplace: "சந்தை",
    admin: "நிர்வாகம்",
    aiAssistant: "AI உதவியாளர்",
  },

  // Decision actions
  actions: {
    SELL_NOW: "இப்போதே விற்கவும்",
    WAIT: "காத்திருக்கவும்",
    STORE: "சேமிக்கவும்",
    AGGREGATE: "FPO உடன் இணைக்கவும்",
    FPO_POOL: "FPO உடன் இணைக்கவும்",
  },

  // Market indicators
  signals: {
    marketPrice: "சந்தை விலை",
    demandLevel: "தேவை நிலை",
    weatherRisk: "வானிலை அபாயம்",
    logisticsFreight: "போக்குவரத்து கட்டணம்",
    high: "அதிகம்",
    medium: "நடுத்தரம்",
    low: "குறைவு",
    clear: "குறைவு (தெளிவான வானிலை)",
  },

  // Farmer Dashboard
  farmer: {
    bannerTag: "விவசாயி முடிவு இயந்திரம்",
    welcome: "வரவேற்கிறோம், ரமேஷ் குமார்",
    subtitle: "உஜ்ஜைன், மத்திய பிரதேசம் • பிரகதி கிசான் FPO உறுப்பினர்",
    mandiPriceTitle: "சந்தை விலை (கோதுமை)",
    perQuintal: "/ குவிண்டால்",
    perKg: "/ கிலோ",
    formTitle: "விளைபொருள் விவரங்களை உள்ளிடவும்",
    cropName: "பயிர் பெயர்",
    quantity: "அளவு (கிலோ)",
    district: "மாவட்டம்",
    daysUntilHarvest: "அறுவடைக்கு மீதமுள்ள நாட்கள்",
    availableStorage: "சேமிப்பு வசதி (கிலோ)",
    currentPrice: "தற்போதைய சந்தை விலை (₹/கிலோ)",
    transportCost: "போக்குவரத்து செலவு (₹/கிலோ)",
    storageCost: "சேமிப்பு செலவு (₹/கிலோ)",
    calculateBtn: "AI முடிவைக் கணக்கிடு",
    calculatingBtn: "ஜெமினி AI பகுப்பாய்வு செய்கிறது...",
    aiRecommendation: "AI பரிந்துரை",
    riskFactorsTitle: "அபாயக் காரணிகள்",
    totalPayoutLabel: "மதிப்பிடப்பட்ட மொத்த தொகை",
    placeholderPrompt: "படிவத்தை பூர்த்தி செய்து ஜெமினி பரிந்துரையைப் பெற 'AI முடிவைக் கணக்கிடு' என்பதைக் கிளிக் செய்யவும்.",
    crops: {
      Wheat: "கோதுமை (Wheat)",
      Onion: "வெங்காயம் (Onion)",
      Potato: "உருளைக்கிழங்கு (Potato)",
      Cotton: "பருத்தி (Cotton)",
    },
  },

  // Sell Decision Card
  decisionCard: {
    confidence: "நம்பகத்தன்மை",
    currentPrice: "தற்போதைய விலை",
    forecast7d: "7-நாள் முன்னறிவிப்பு",
    netRealization: "நிகர வருமானம்",
  },

  // Net Realization Card
  netRealization: {
    buyerOffer: "வாங்குபவர் சலுகை",
    bestNetRealization: "சிறந்த நிகர வருமானம்",
    quotedPrice: "வழங்கப்பட்ட விலை",
    transportCost: "போக்குவரத்து செலவு",
    storageFees: "சேமிப்பு / கட்டணங்கள்",
    title: "நிகர வருமானம் (NET REALIZATION)",
    totalNetPayout: "மொத்த நிகர தொகை",
  },

  // Quality Grading Card
  quality: {
    title: "AI தர மதிப்பீடு (YOLOv8 பார்வை)",
    dropTitle: "தரத்தை பகுப்பாய்வு செய்ய பயிர் புகைப்படத்தைத் தேர்ந்தெடுக்கவும் அல்லது இழுத்து விடவும்",
    dropSubtitle: "JPG, PNG ஆதரிக்கப்படுகிறது (அதிகபட்சம் 5MB)",
    changeImage: "படத்தை மாற்ற கிளிக் செய்யவும்",
    scanBtn: "பயிர் தரத்தை ஸ்கேன் செய்யவும்",
    scanningBtn: "தரம் பகுப்பாய்வு செய்யப்படுகிறது...",
    detectedCrop: "கண்டறியப்பட்ட பயிர்",
    confidence: "நம்பகத்தன்மை",
    defectRate: "குறைபாடு விகிதம்",
    defects: "கண்டறியப்பட்ட குறைபாடுகள்",
  },

  // Buyer Dashboard
  buyer: {
    bannerTag: "வாங்குபவர் கொள்முதல் தளம்",
    companyName: "அக்ரிகார்ப் பிராசசிங் லிமிடெட்",
    subtitle: "பயிர் கொள்முதல் தேவைகளை பதிவிடவும், சரிபார்க்கப்பட்ட விவசாயிகள் மற்றும் FPO-க்களிடமிருந்து நேரடியாக வாங்கவும்.",
    formTitle: "கொள்முதல் தேவையை பதிவிடவும்",
    category: "வாங்குபவர் பிரிவு",
    requiredCrop: "தேவையான பயிர்",
    requiredQuantity: "தேவையான அளவு (கிலோ)",
    maxOfferPrice: "அதிகபட்ச சலுகை விலை (₹/கிலோ)",
    targetDistrict: "இலக்கு மாவட்டம்",
    postBtn: "+ கொள்முதல் தேவையை பதிவிடவும்",
    activeTitle: "செயலில் உள்ள கொள்முதல் தேவைகள்",
    postedBy: "பதிவிட்டவர்",
    qualityGrade: "தரம்",
    matchBtn: "விவசாயிகள் / FPO-வை இணைக்கவும்",
    categories: {
      Processor: "உணவு பதப்படுத்துபவர் (Processor)",
      Wholesaler: "மொத்த வியாபாரி (Wholesaler)",
      Retailer: "சில்லறை விற்பனையாளர் (Retailer)",
      Institutional: "நிறுவன வாங்குபவர் (Institutional)",
      Bulk: "மொத்த ஏற்றுமதியாளர் (Bulk Exporter)",
    },
  },

  // FPO Dashboard
  fpo: {
    bannerTag: "FPO தளம்",
    coopName: "பிரகதி கிசான் உற்பத்தியாளர் கூட்டுறவு சங்கம்",
    subtitle: "உறுப்பினர்களின் விளைபொருள் திரட்டலை நிர்வகிக்கவும், மொத்த வாங்குபவர்களுடன் பேசி நல்ல விலை பெறவும்.",
    totalAggregated: "மொத்த திரட்டப்பட்ட விளைபொருள்",
    poolsTitle: "செயலில் உள்ள விளைபொருள் திரட்டல் குழுக்கள்",
    aggregatedLot: "திரட்டப்பட்ட அளவு",
    targetPrice: "இலக்கு விலை",
    contributionsTitle: "உறுப்பினர்களின் பங்களிப்பு",
    farmerNamePlaceholder: "விவசாயி பெயர் (எ.கா. விக்ரம் சிங்)",
    qtyPlaceholder: "அளவு (கிலோ)",
    poolBtn: "+ உறுப்பினர் பங்கை சேர்க்கவும்",
  },

  // Marketplace
  marketplace: {
    title: "கிசான்சேது நேரடி விளைபொருள் சந்தை",
    subtitle: "சரிபார்க்கப்பட்ட விவசாயிகள், FPO-க்கள் மற்றும் மொத்த வாங்குபவர்களுக்கு இடையிலான நேரடி சந்தை இணைப்பு.",
    all: "அனைத்தும்",
    wheat: "கோதுமை",
    onion: "வெங்காயம்",
    verifiedSeller: "✓ சரிபார்க்கப்பட்ட விற்பனையாளர்",
    availableQty: "கிடைக்கும் அளவு:",
    askingPrice: "கேட்கப்படும் விலை:",
    location: "இடம்:",
    makeOfferBtn: "வாங்கும் சலுகையை வழங்கவும்",
  },

  // Admin Dashboard
  admin: {
    bannerTag: "நிர்வாக கன்சோல்",
    title: "கிசான்சேது தள மேலாண்மை",
    subtitle: "தள பகுப்பாய்வு, சர்ச்சை தீர்வு மற்றும் சந்தை தரவு சரிபார்ப்பு.",
    stats: {
      farmers: "மொத்த விவசாயிகள்",
      buyers: "செயலில் உள்ள வாங்குபவர்கள்",
      fpos: "பதிவுசெய்யப்பட்ட FPO-க்கள்",
      listings: "செயலில் உள்ள பட்டியல்கள்",
      txVolume: "பரிவர்த்தனை மதிப்பு",
      totalVolume: "மொத்த அளவு",
    },
    disputeTitle: "நிலுவையில் உள்ள சர்ச்சை தீர்வு",
    orderTag: "ஆர்டர் #881",
    disputeDesc: "ரமேஷ் குமார் (விவசாயி) எதிர் அக்ரிகார்ப் பிராசசிங் லிமிடெட் (வாங்குபவர்)",
    disputeReason: "விளைபொருள் தர மதிப்பீட்டு மதிப்பெண்ணில் முரண்பாடு (கிரேடு A மேற்கோள் காட்டப்பட்டது vs கிரேடு B பெறப்பட்டது).",
    reviewBtn: "சர்ச்சையை மறுபரிசீலனை செய்யவும்",
  },

  // Login / Landing Page
  login: {
    tag: "SIH26132 — சந்தை இணைப்புகள் & விலை கண்டறிதல்",
    title: "கிசான்சேது",
    subtitle: "விவசாயிகளுக்கு வழிகாட்டல்: எப்போது விற்க வேண்டும்? எங்கு விற்க வேண்டும்? யாரிடம் விற்க வேண்டும்? இப்போதே விற்கவா அல்லது FPO மூலம் திரட்டவா?",
    enterPortal: "தளத்திற்குள் நுழையவும் →",
    farmerCard: {
      title: "விவசாயி தளம்",
      desc: "AI விற்பனை பரிந்துரைகள், எதிர்பார்க்கப்படும் நிகர வருமானம், வானிலை சமிக்ஞைகள் மற்றும் FPO திரட்டல்.",
    },
    buyerCard: {
      title: "வாங்குபவர் தளம்",
      desc: "பதப்படுத்துபவர்கள், மொத்த வியாபாரிகள் மற்றும் சில்லறை விற்பனையாளர்களுக்கு தேவைகளை பதிவிட.",
    },
    fpoCard: {
      title: "FPO திரட்டல்",
      desc: "சிறு விவசாயிகளின் விளைபொருட்களை திரட்டி (100kg + 150kg + 250kg = 500kg) அதிக விலைக்கு விற்கவும்.",
    },
    adminCard: {
      title: "நிர்வாக கன்சோல்",
      desc: "தள அளவீடுகள், சர்ச்சை கையாளுதல், தர ஆய்வு பதிவுகள் மற்றும் சந்தை விலை மேற்பார்வை.",
    },
    engineTitle: "கிசான்சேது நுண்ணறிவு இயந்திரத்தால் இயக்கப்படுகிறது",
    engineDesc: "சந்தை விலை முன்னறிவிப்பு (Prophet) + விற்பனை முடிவு வகைப்படுத்தி (XGBoost + SHAP) + தர மதிப்பீடு (YOLOv8) + குரல் AI முகவர் (பாஷினி + ஜெமினி AI) + ஸ்மார்ட் நிகர வருமான கால்குலேட்டர்.",
  },

  // Price Trends
  trends: {
    priceTrend: "விலை போக்கு",
  },

  // AI Assistant Modal
  assistant: {
    title: "கிசான்சேது AI உதவியாளர்",
    subtitle: "சூழல் சார்ந்த விவசாய சந்தை ஆலோசனை",
    poweredBy: "✦ ஜெமினி 2.5 ஃப்ளாஷ்",
    loadingText: "கிசான்சேது AI பகுப்பாய்வு செய்கிறது...",
    placeholder: "உங்கள் கேள்வியைத் தட்டச்சு செய்க...",
    send: "அனுப்பு",
    greeting: "வணக்கம்! நான் கிசான்சேது AI உதவியாளர். சந்தை விலைகள் மற்றும் பயிர் விற்பனை பற்றி என்னிடம் கேட்கலாம்.",
    sampleChips: [
      "எனது கோதுமையை நான் என்ன செய்ய வேண்டும்?",
      "எனக்கு சிறந்த விலையை வழங்கும் வாங்குபவர் யார்?",
      "நான் 5 நாட்கள் காத்திருந்தால் என்ன ஆகும்?",
    ],
  },
};
