import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
// import HeroEvents from "./components/hero-events/HeroEvents";
// import HeroEnding from "./components/hero/HeroEnding";
// import HeroTitle from "./components/hero/HeroTitle";
import Navbar from "./components/navbar/Navbar";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <Router>
      <div className="bg-white w-full min-h-[100vh] absolute">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
