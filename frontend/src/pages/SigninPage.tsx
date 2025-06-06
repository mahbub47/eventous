import { FaEnvelope, FaLock } from "react-icons/fa";
import bgImage from "../assets/signup-bg.jpg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

function SigninPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    const res = await axios.post("http://localhost:5000/api/auth/send-otp", {
      email,
    });
    toast.success(res.data.message);
    navigate("/otp-verification", {
      state: {
        user: {
          email: email,
        },
      },
    });
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const res = await axios.post("http://localhost:5000/api/auth/google", {
          token: access_token,
        });

        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user-info", JSON.stringify(res.data.user));
        setUser(res.data.user);

        navigate("/user-dashboard");
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    onError: (error) => console.error("Login Error:", error),
    flow: "implicit",
  });

  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          zIndex: 0,
          filter: `grayscale(50%) brightness(70%)`,
        }}
      ></div>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
        <form
          className="bg-white w-full max-w-md rounded-sm shadow-lg p-8 m-4 z-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-normal text-stone-900">Eventous</h1>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-2 text-stone-900">
            Welcome! <br />
            Join Eventous <br />
            Today
          </h2>
          <p className="text-sm text-stone-600 mb-6">
            Create events. Discover opportunities. <br />
            Be part of something big.
          </p>

          <div className="mb-4">
            <label className="relative block">
              <span className="absolute inset-y-0 left-3 flex items-center text-stone-500">
                <FaEnvelope />
              </span>
              <input
                name="email"
                type="email"
                required
                value={email}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-stone-950 font-semibold py-2 rounded-md mb-4 transition-colors"
            type="submit"
          >
            Continue
          </button>

          <div className="flex items-center text-gray-600 text-sm mb-4">
            <FaLock className="mr-2" />
            <span>Your information is safe with us.</span>
          </div>

          <div className="flex items-center justify-center my-12">
            <span className="text-sm text-stone-500">— or continue with —</span>
          </div>

          <div className="flex justify-center gap-8 my-4">
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
              onClick={() => login()}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                alt="Google Logo"
                width={32}
                height={32}
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SigninPage;
