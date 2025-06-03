import { useState } from "react";

type FormData = {
  date: string;
  startTime: string;
  endTime: string;
};

function CreateEventPage() {
  const [formData, setFormData] = useState<FormData>({
    date: "2025-05-23",
    startTime: "10:00",
    endTime: "2:00",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen min-w-full text-stone-900">
      <form className=" mx-[25%] mt-30 ">
        <div>
          <h1 className="lg:text-[48px] font-semibold">Create an event</h1>
          <p className="text-lg font-normal">
            Planning something exciting? Let’s make it official! Fill out the
            form below to create and share your event with others.
          </p>
        </div>
        <div className="mt-10">
          <label htmlFor="title subtitle">
            <h2 className="text-[32px] font-semibold">Event title</h2>
            <h3>Give your event a name that grabs attention</h3>
          </label>
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
          <label htmlFor="">
            <h2 className="text-[32px] font-semibold">Date & Time</h2>
            <h3>Choose when your event will take place</h3>
          </label>
          <input
            name="date"
            type="date"
            className=" border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            id="title"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            name="startTime"
            type="time"
            placeholder="Event subtitle"
            className="border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            id="subtitle"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateEventPage;
