import {
  FaEnvelope,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaLock,
} from "react-icons/fa";
import bgImage from "../assets/signup-bg.jpg";

function SigninPage() {
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
            Welcome! <br />
            Join Eventous <br />Today
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
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </label>
          </div>

          <button className="w-full bg-yellow-300 hover:bg-yellow-400 text-stone-950 font-semibold py-2 rounded-md mb-4 transition-colors">
            Continue
          </button>

          <div className="flex items-center text-gray-600 text-sm mb-4">
            <FaLock className="mr-2" />
            <span>Your information is safe with us.</span>
          </div>

          <div className="flex items-center justify-center my-12">
            <span className="text-sm text-stone-500">— or sign up with —</span>
          </div>

          <div className="flex justify-center gap-8 my-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaFacebookF className="text-blue-600" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaLinkedinIn className="text-blue-700" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SigninPage;
