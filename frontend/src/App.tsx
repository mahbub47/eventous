import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CreateEventPage from "./pages/CreateEventPage";
import LandingPage from "./pages/LandingPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SigninPage from "./pages/SigninPage";
import UserDashboard from "./pages/UserDashboard";
import OTPPage from "./pages/OTPPage";

function App() {
  const GoogleAuthWrapper = () => {
    const clientId =
      "730139355395-it3qlc6s7chlotvgif2ukot7k5sa2dpf.apps.googleusercontent.com";
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <SigninPage />
      </GoogleOAuthProvider>
    );
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Route>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/signup" element={<GoogleAuthWrapper />} />
        <Route path="/otp-verification" element={<OTPPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
