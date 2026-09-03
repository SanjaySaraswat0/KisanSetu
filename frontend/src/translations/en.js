export default {
  // Navigation
  nav: {
    brand: "KisanSetu",
    farmer: "Farmer",
    buyer: "Buyer",
    fpo: "FPO Pooling",
    marketplace: "Marketplace",
    admin: "Admin",
    aiAssistant: "AI Assistant",
  },

  // Decision actions
  actions: {
    SELL_NOW: "Sell Now",
    WAIT: "Wait",
    STORE: "Store",
    AGGREGATE: "Pool with FPO",
    FPO_POOL: "Pool with FPO",
  },

  // Market indicators
  signals: {
    marketPrice: "Market Price",
    demandLevel: "Demand Level",
    weatherRisk: "Weather Risk",
    logisticsFreight: "Logistics Freight",
    high: "HIGH",
    medium: "MEDIUM",
    low: "LOW",
    clear: "LOW (Clear)",
  },

  // Farmer Dashboard
  farmer: {
    bannerTag: "Farmer Decision Engine",
    welcome: "Welcome, Ramesh Kumar",
    subtitle: "Ujjain, Madhya Pradesh • Pragati Kisan FPO Member",
    mandiPriceTitle: "Mandi Price (Wheat)",
    perQuintal: "/ quintal",
    perKg: "/ kg",
    formTitle: "Enter Produce Details",
    cropName: "Crop Name",
    quantity: "Quantity (kg)",
    district: "District",
    daysUntilHarvest: "Days Until Harvest",
    availableStorage: "Available Storage (kg)",
    currentPrice: "Current Market Price (₹/kg)",
    transportCost: "Transport (₹/kg)",
    storageCost: "Storage (₹/kg)",
    calculateBtn: "Calculate AI Decision",
    calculatingBtn: "Analyzing with Gemini AI...",
    aiRecommendation: "AI Recommendation",
    riskFactorsTitle: "Risk Factors",
    totalPayoutLabel: "Estimated Total Payout",
    placeholderPrompt: "Fill in the form and click Calculate AI Decision to get your Gemini-powered recommendation.",
    crops: {
      Wheat: "Wheat (गेहूँ)",
      Onion: "Onion (प्याज)",
      Potato: "Potato (आलू)",
      Cotton: "Cotton (कपास)",
    },
  },

  // Sell Decision Card
  decisionCard: {
    confidence: "Confidence",
    currentPrice: "Current price",
    forecast7d: "7-day forecast",
    netRealization: "Net realization",
  },

  // Net Realization Card
  netRealization: {
    buyerOffer: "Buyer Offer",
    bestNetRealization: "Best Net Realization",
    quotedPrice: "Quoted Price",
    transportCost: "Transport Cost",
    storageFees: "Storage / Fees",
    title: "NET REALIZATION",
    totalNetPayout: "Total Net Payout",
  },

  // Quality Grading Card
  quality: {
    title: "AI Quality Grading (YOLOv8 Vision)",
    dropTitle: "Click or drag crop image to analyze quality",
    dropSubtitle: "Supports JPG, PNG (Max 5MB)",
    changeImage: "Click to change image",
    scanBtn: "Scan Crop Quality",
    scanningBtn: "Analyzing Quality...",
    detectedCrop: "Detected Crop",
    confidence: "Confidence",
    defectRate: "Defect Rate",
    defects: "Defects",
  },

  // Buyer Dashboard
  buyer: {
    bannerTag: "Buyer Procurement Portal",
    companyName: "AgriCorp Processing Ltd",
    subtitle: "Post crop purchase requirements, source directly from verified farmers & FPO produce pools.",
    formTitle: "Post Purchase Requirement",
    category: "Buyer Category",
    requiredCrop: "Required Crop",
    requiredQuantity: "Required Quantity (kg)",
    maxOfferPrice: "Max Offer Price (₹/kg)",
    targetDistrict: "Target District",
    postBtn: "+ Post Purchase Requirement",
    activeTitle: "Active Procurement Requirements",
    postedBy: "Posted by",
    qualityGrade: "Quality",
    matchBtn: "Match Farmers / FPOs",
    categories: {
      Processor: "Food Processor (प्रोसेसर)",
      Wholesaler: "Wholesaler (थोक विक्रेता)",
      Retailer: "Retail Chain (रिटेलर)",
      Institutional: "Institutional Buyer (संस्थागत)",
      Bulk: "Bulk Exporter (थोक निर्यातक)",
    },
  },

  // FPO Dashboard
  fpo: {
    bannerTag: "FPO Portal",
    coopName: "Pragati Kisan Producer Co-op",
    subtitle: "Manage member produce pooling, aggregate lots & negotiate bulk buyer contracts.",
    totalAggregated: "Total Aggregated Produce",
    poolsTitle: "Active Produce Aggregation Pools",
    aggregatedLot: "Aggregated Lot",
    targetPrice: "Target Price",
    contributionsTitle: "Member Lot Contributions",
    farmerNamePlaceholder: "Farmer Name (e.g. Vikram Singh)",
    qtyPlaceholder: "Qty (kg)",
    poolBtn: "+ Pool Member Lot",
  },

  // Marketplace
  marketplace: {
    title: "KisanSetu Direct Produce Marketplace",
    subtitle: "Direct market linkage between verified farmers, FPOs, and bulk buyers.",
    all: "All",
    wheat: "Wheat",
    onion: "Onion",
    verifiedSeller: "✓ VERIFIED SELLER",
    availableQty: "Available Quantity:",
    askingPrice: "Asking Price:",
    location: "Location:",
    makeOfferBtn: "Make Buyer Offer",
  },

  // Admin Dashboard
  admin: {
    bannerTag: "Admin Console",
    title: "KisanSetu Platform Management",
    subtitle: "Platform analytics, dispute resolution & market dataset verification.",
    stats: {
      farmers: "Total Farmers",
      buyers: "Active Buyers",
      fpos: "Registered FPOs",
      listings: "Active Listings",
      txVolume: "Transaction Volume",
      totalVolume: "Total Volume",
    },
    disputeTitle: "Pending Dispute Resolution",
    orderTag: "ORDER #881",
    disputeDesc: "Ramesh Kumar (Farmer) vs AgriCorp Processing Ltd (Buyer)",
    disputeReason: "Discrepancy in produce quality grading score (Grade A quoted vs Grade B received).",
    reviewBtn: "Review Dispute",
  },

  // Login / Landing Page
  login: {
    tag: "SIH26132 — Market Linkages & Price Discovery",
    title: "KisanSetu",
    subtitle: "Helping farmers answer: When to sell? Where to sell? Whom to sell to? Should I sell now, store, or aggregate through an FPO?",
    enterPortal: "Enter Portal →",
    farmerCard: {
      title: "Farmer Portal",
      desc: "AI sell recommendations, expected net realization, weather signals, and FPO pooling.",
    },
    buyerCard: {
      title: "Buyer Portal",
      desc: "For Processors, Wholesalers, Retailers & Bulk Buyers to post requirements and match lots.",
    },
    fpoCard: {
      title: "FPO Pooling",
      desc: "Aggregate smallholder lots (100kg + 150kg + 250kg = 500kg) for high-value contract negotiation.",
    },
    adminCard: {
      title: "Admin Console",
      desc: "Platform metrics, dispute handling, quality inspection logs, and market price data oversight.",
    },
    engineTitle: "Powered by KisanSetu Intelligence Engine",
    engineDesc: "Combining Mandi Price Forecasts (Prophet) + Sell-Decision Classifier (XGBoost + SHAP) + Produce Quality Grading (YOLOv8) + Voice AI Agent (BHASHINI + LangGraph + Gemini API) + Smart Net Realization Calculator.",
  },

  // Price Trends
  trends: {
    priceTrend: "Price Trend",
  },

  // AI Assistant Modal
  assistant: {
    title: "KisanSetu AI Assistant",
    subtitle: "Context-Aware Agricultural Market Advisory",
    poweredBy: "✦ Gemini 2.5 Flash",
    loadingText: "Gemini AI is analyzing live mandi data...",
    placeholder: "Ask your question (e.g. What should I do with my wheat?)...",
    send: "Send",
    greeting: "Namaste! I am KisanSetu AI Assistant (powered by Gemini 2.5 Flash). Ask me about live mandi prices, best selling times, buyer offers, or produce storage options.",
    sampleChips: [
      "What should I do with my wheat?",
      "Which buyer gives me the best deal?",
      "Should I store my crop or sell now?",
    ],
  },
};
