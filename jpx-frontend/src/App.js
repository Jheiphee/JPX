import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Homepage from "./pages/homepage";
import WhoisJP from "./pages/WhoisJP";
import ViewMyWork from "./pages/ViewMyWork";
import Services from "./pages/Services";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="bg-[#0b0c1a] min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/whoisjp" element={<WhoisJP />} />
          <Route path="/view-my-work" element={<ViewMyWork />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
