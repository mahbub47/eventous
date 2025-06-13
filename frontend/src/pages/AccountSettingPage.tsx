import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function AccountSettingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // Do something with the file (e.g., upload or preview)
    }
  };
  return (
    <div className="min-h-screen text-stone-900">
      <form action="" className="mx-10 lg:mx-[25%] md:mx-[10%] md:mt-30 mt-10">
        <div>
          <h1 className="md:text-[48px] text-3xl font-semibold mb-5">
            Account Information
          </h1>
          <hr />
          <p className="text-sm font-normal text-gray-400">
            Eventous account since 20 april, 2025
          </p>
          <div className="mt-10">
            <div>
              {/* Hidden input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Styled upload button */}
              <button
                type="button"
                onClick={handleButtonClick}
                className="flex-col justify-center items-center gap-2 px-5 py-2 border-dashed border-2 border-gray-400 rounded-md text-black font-medium hover:border-dashed hover:border-blue-500 hover:border-2 transition"
              >
                <CgProfile className="mt-3 text-3xl justify-self-center text-blue-500" />
                <div className="text-blue-500 mt-2 text-xl">
                  Upload an image
                </div>
                <div className="text-gray-400 mt-2 text-sm mb-3 ">
                  Choose a file to upload
                </div>
              </button>
            </div>
          </div>
          <div className="mt-15">
            <h2 className="md:text-[32px] text-2xl font-semibold">
              Contact Information
            </h2>
            <input
              type="text"
              placeholder="Full name"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="full_name"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="phone"
            />
            <input
              type="text"
              placeholder="Job title (optional)"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="job_title"
            />
            <input
              type="text"
              placeholder="Organization/company"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="organization"
            />
            <input
              type="link"
              placeholder="Website"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="website"
            />
          </div>
          <div className="mt-15">
            <h2 className="md:text-[32px] text-2xl font-semibold">
              Work Address
            </h2>
            <input
              type="text"
              placeholder="Address"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="address"
            />
            <input
              type="text"
              placeholder="Address 2 (optional)"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="address2"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="city"
            />
            <input
              type="text"
              placeholder="Zip code"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              id="zip_code"
            />
          </div>
          <button
            type="submit"
            className="mt-10 mb-30 text-lg font-semibold py-2.5 px-10 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSettingPage;
