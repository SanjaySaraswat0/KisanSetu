import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import FarmerDashboard from "./pages/FarmerDashboard.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";
import FPODashboard from "./pages/FPODashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import PriceTrends from "./pages/PriceTrends.jsx";
import LogisticsStorage from "./pages/LogisticsStorage.jsx";
import GrievancePortal from "./pages/GrievancePortal.jsx";
import AgentAssistantModal from "./components/AgentAssistantModal.jsx";
import FloatingAssistantButton from "./components/FloatingAssistantButton.jsx";
import { useAssistant } from "./context/AssistantContext.jsx";

export default function App() {
  const { isOpen, closeAssistant } = useAssistant();

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="/fpo" element={<FPODashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/prices" element={<PriceTrends />} />
            <Route path="/prices/:crop" element={<PriceTrends />} />
            <Route path="/logistics" element={<LogisticsStorage />} />
            <Route path="/grievances" element={<GrievancePortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>

      {/* Clean Footer */}
      <footer className="bg-emerald-950 text-emerald-300/80 border-t border-emerald-900 py-6 text-center text-xs mt-12 space-y-1">
        <div className="font-bold text-white tracking-wide">🌾 KisanSetu</div>
        <div>Strengthening Market Linkages and Transparent Price Discovery for Indian Farmers</div>
        <div className="text-[10px] text-emerald-400/60">
          Powered by Machine Learning (Prophet, XGBoost, SHAP, YOLOv8) • Multilingual Voice Advisory • 100% Escrow Protection
        </div>
      </footer>

      {/* Persistent Floating AI Assistant Button */}
      <FloatingAssistantButton />

      {/* Modal */}
      <AgentAssistantModal isOpen={isOpen} onClose={closeAssistant} />
    </div>
  );
}
