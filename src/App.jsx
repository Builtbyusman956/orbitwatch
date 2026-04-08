import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdSenseScript from "./components/ads/AdSenseScript";
import Home from "./pages/Home";
import Launches from "./pages/Launches";
import APOD from "./pages/APOD";
import Asteroids from "./pages/Asteroids";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <AdSenseScript />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/asteroids" element={<Asteroids />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;