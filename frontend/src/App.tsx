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
import OTPPage from "./pages/OTPPage";
import UnauthorizedErrorPage from "./pages/UnauthorizedErrorPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "./pages/LoadingPage";
import AccountSettingPage from "./pages/AccountSettingPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import LikedEventsPage from "./pages/LikedEventsPage";
import EventPage from "./pages/EventPage";
import OrganizerPage from "./pages/OrganizerPage";
import AllEventsPage from "./pages/AllEventsPage";
import Organize from "./pages/Organize";
import EditEventPage from "./pages/EditEventPage";

export const GoogleAuthWrapper = () => {
  const clientId =
    "730139355395-it3qlc6s7chlotvgif2ukot7k5sa2dpf.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SigninPage />
    </GoogleOAuthProvider>
  );
};

function App() {
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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <LandingPage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateEventPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account-settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <AccountSettingPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/liked-events"
            element={
              <ProtectedRoute>
                <Layout>
                  <LikedEventsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/signup" element={<GoogleAuthWrapper />} />
          <Route path="/otp-verification" element={<OTPPage />} />
          <Route path="*" element={<PageNotFoundPage />} />
          <Route path="/unauthorized" element={<UnauthorizedErrorPage />} />
          <Route path="/server-error" element={<ServerErrorPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route
            path="/events/:eventId"
            element={
              <Layout>
                <EventPage />
              </Layout>
            }
          />
          <Route
            path="/organizers/:userId"
            element={
              <Layout>
                <OrganizerPage />
              </Layout>
            }
          />
          <Route
            path="/organizers/:userId/organize"
            element={
              <Layout>
                <Organize />
              </Layout>
            }
          />
          <Route
            path="/events"
            element={
              <Layout>
                <AllEventsPage />
              </Layout>
            }
          />
          <Route
            path="/organizers/:userId/organize/:eventId/edit"
            element={
              <ProtectedRoute>
                <Layout>
                  <EditEventPage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
