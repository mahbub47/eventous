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
import UnauthorizedErrorPage from "./pages/UnauthorizedErrorPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import LoadingPage from "./pages/LoadingPage";
import AccountSettingPage from "./pages/AccountSettingPage";

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
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <AuthProvider>
<Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/account-settings" element={<AccountSettingPage />} />
          </Route>
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/signup" element={<GoogleAuthWrapper />} />
          <Route path="/otp-verification" element={<OTPPage />} />
          <Route path="*" element={<PageNotFoundPage />} />
          <Route path="/un-authorized" element={<UnauthorizedErrorPage />} />
          <Route path="/server-error" element={<ServerErrorPage />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
