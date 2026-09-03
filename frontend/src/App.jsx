import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import FarmerDashboard from "./pages/FarmerDashboard.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";
import FPODashboard from "./pages/FPODashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import PriceTrends from "./pages/PriceTrends.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/farmer" element={<FarmerDashboard />} />
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/fpo" element={<FPODashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/prices/:crop" element={<PriceTrends />} />
            </Routes>
          </main>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}


