import bgImage from "@/assets/signup-bg.jpg";
import api from "@/utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AdminLoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(username, password);

  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await api.post("/api/admin/login", {
        username,
        password,
      });
      toast.success(res.data.message);
      navigate("/admin");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
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
            Welcome <br />
            back,
            <br />
            Admin
          </h2>
          <p className="text-md text-stone-600 mb-6">
            Please authenticate yourself using
            <br /> your valid username and password.
          </p>

          <div className="mb-4">
            <label className="relative block">
              <input
                type="text"
                placeholder="Enter username"
                className="w-full pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="relative block">
              <input
                type="password"
                required
                placeholder="Enter Password"
                className="w-full pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>

          <button
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-stone-950 font-semibold py-2 rounded-md mb-4 transition-colors"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminLoginPage