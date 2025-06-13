import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaDesktop, FaMapMarkerAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type FormData = {
  date: string;
  startTime: string;
  endTime: string;
};

const options = [
  { label: "Venue", icon: <FaMapMarkerAlt /> },
  { label: "Online", icon: <FaDesktop /> },
  { label: "To be announced", icon: <FaCalendarAlt /> },
];

function CreateEventPage() {
  const {isAuthenticated} = useAuth();
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
  const [formData, setFormData] = useState<FormData>({
    date: "2025-05-23",
    startTime: "10:00",
    endTime: "11:00",
  });
  const [active, setActive] = useState("Venue");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen min-w-full text-stone-900">
      <form className="mx-10 lg:mx-[25%] md:mx-[10%] md:mt-30 mt-10">
        <div>
          <h1 className="md:text-[48px] text-3xl font-semibold">Create an event</h1>
          <p className="md:text-lg text-sm font-normal">
            Planning something exciting? Let’s make it official! Fill out the
            form below to create and share your event with others.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="md:text-[32px] text-2xl font-semibold">Event title</h2>
          <h3 className="md:text-md text-sm">Give your event a name that grabs attention</h3>
          <input
            type="text"
            placeholder="Event title"
            className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            id="title"
          />
          <input
            type="text"
            placeholder="Event subtitle"
            className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            id="subtitle"
          />
        </div>
        <div className="mt-10">
          <h2 className="md:text-[32px] text-2xl font-semibold">Date & Time</h2>
          <h3 className="md:text-lg text-sm">Choose when your event will take place</h3>
          <div>
            <input
              name="date"
              type="date"
              className=" border-2 my-3  border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              value={formData.date}
              onChange={handleChange}
            />
            <div className="md:inline relative">
              <div className="md:hidden">Start time</div>
              <input
                name="startTime"
                type="time"
                className="border-2 md:my-3 md:ms-5 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                value={formData.startTime}
                onChange={handleChange}
              />
              <div className="md:inline absolute left-6 bottom-[-38px] hidden">
                Start time
              </div>
            </div>
            <div className="inline relative">
              <div className="mt-2 md:hidden">End time</div>
              <input
                name="endTime"
                type="time"
                className="border-2 md:my-3 md:ms-5 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                value={formData.endTime}
                onChange={handleChange}
              />
              <div className="md:inline hidden absolute left-6 bottom-[-38px]">
                End time
              </div>
            </div>
          </div>
        </div>
        <div className="mt-15">
          <h2 className="text-[32px] font-semibold">Event Location</h2>
          <h3 className="mb-5">
            Add the venue or specify if it’s an online event
          </h3>
          <div className="flex gap-2">
            {options.map((option) => (
              <button
                type="button"
                key={option.label}
                onClick={() => setActive(option.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition
            ${
              active === option.label
                ? "bg-yellow-300 border-yellow-300 text-black"
                : "bg-white border-gray-300 text-black hover:bg-gray-100"
            }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter location"
              className={`mt-5 w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300 ${
                active !== "Venue"
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
              id="location"
            />
          </div>
        </div>

        <div className="mt-15 ">
          <h2 className="md:text-[32px] text-2xl font-semibold">Ticket price</h2>
          <h3 className="mb-5 md:text-lg text-sm">
            Set the ticket price for your event. You can choose to keep it
            <br /> free or charge a fee based on your event type.
          </h3>
          <input type="checkbox" id="free_checkbox" className="font-bold" />
          <label htmlFor="free_checkbox" className="mx-2 text-xl font-semibold">
            Free
          </label>
          <label htmlFor="ticket_price" className="block mt-5">Set ticket price</label>
          <input
            type="text"
            placeholder="Amount"
            className="block max-w-50 border-2 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            id="subtitle"
          />
        </div>

        <div className="mt-15">
          <h2 className="md:text-[32px] text-2xl font-semibold">Event Description</h2>
          <h3 className="mb-5 text-sm md:text-lg">Share more about what the event is about</h3>
          <textarea
            placeholder="Enter event description..."
            rows={8} // Adjust number of visible lines
            className="w-full p-4 border border-gray-300 rounded-md md:text-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>
        <div className="mt-15">
          <h2 className="md:text-[32px] text-2xl font-semibold">Cover image</h2>
          <h3 className="mb-5 md:text-lg text-sm">Upload an image to make your event stand out</h3>
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
              className="flex items-center gap-2 px-5 py-2 border border-gray-400 rounded-md text-black font-medium hover:bg-gray-100 transition"
            >
              <FiUpload className="text-lg" />
              Upload an image
            </button>
          </div>
        </div>
        <button type="submit" className="mt-10 mb-30 text-lg font-semibold py-2.5 px-10 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors">Submit</button>
      </form>
    </div>
  );
}

export default CreateEventPage;
