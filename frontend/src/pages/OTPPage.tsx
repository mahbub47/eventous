import { useState } from "react";
import bgImage from "../assets/signup-bg.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const email = user.email;
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email,
      otp,
    });
    const { token } = res.data.token;
    const obj = { token };
    localStorage.setItem("user-info", JSON.stringify(obj));

    navigate("/user-dashboard");
    alert(res.data.message);
    localStorage.setItem("token", res.data.token);
  };
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
        <div className="bg-white w-full max-w-md rounded-sm shadow-lg p-8 m-4 z-10">
          <h1 className="text-xl font-normal text-stone-900">Eventous</h1>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-2 text-stone-900">
            Check your <br />
            email
            <br />
            for a code
          </h2>
          <p className="text-md text-stone-600 mb-6">
            Check your inbox and enter the code
            <br /> we have sent you
          </p>

          <div className="mb-4">
            <label className="relative block">
              <input
                type="email"
                placeholder="something@gmail.com"
                className="w-full pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={email}
                disabled
              />
              <span className="absolute right-4 my-2">
                <button className="text-stone-900 font-medium cursor-pointer">
                  Edit
                </button>
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="relative block">
              <input
                type="code"
                placeholder="Enter OTP"
                className="w-full pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </label>
          </div>

          <button
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-stone-950 font-semibold py-2 rounded-md mb-4 transition-colors"
            onClick={handleVerify}
          >
            Submit
          </button>

          <div className="flex items-center text-gray-600 text-sm mb-4 justify-center">
            <button className="text-lg font-medium text-stone-900 cursor-pointer">
              Resend code
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPPage;
