import api from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCalendarAlt, FaDesktop, FaMapMarkerAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  eventCoverImage: z
    .instanceof(File, { message: "Cover image is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
  eventTitle: z.string().min(1, "Please enter your event title"),
  eventSubtitle: z.string().optional(),
  eventDate: z
    .string()
    .min(1, "Event date is required")
    .refine(
      (val) => {
        const selected = new Date(val);
        const today = new Date();
        selected.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return selected > today;
      },
      { message: "Date cannot be in the past" }
    ),
  eventStartTime: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{2}:\d{2}$/.test(val), {
      message: "Invalid start time format (HH:mm)",
    }),
  eventEndTime: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{2}:\d{2}$/.test(val), {
      message: "Invalid start time format (HH:mm)",
    }),
  eventLocation: z.string().min(1, "Please select your location option"),
  eventPrice: z
    .string()
    .min(1, "Please enter a valid amount")
    .refine((val) => !val || /^\d+(\.\d{1,2})?$/.test(val), {
      message: "Enter number",
    }),
  eventDescription: z.string().min(1, "Please enter your event details"),
  totalTickets: z
    .string()
    .min(0, "Please enter a valid amount")
    .refine((val) => !val || /^\d+(\.\d{1,2})?$/.test(val), {
      message: "Enter number",
    }),
});

type FormFields = z.infer<typeof schema>;

const options = [
  { label: "Venue", icon: <FaMapMarkerAlt /> },
  { label: "Online", icon: <FaDesktop /> },
  { label: "To be announced", icon: <FaCalendarAlt /> },
];

function CreateEventPage() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      eventDate: "2025-05-23",
      eventStartTime: "10:00",
      eventEndTime: "11:00",
    },
    resolver: zodResolver(schema),
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("eventCoverImage", file, { shouldValidate: true });
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      console.log("Selected file:", file);
    }
  };

  const [active, setActive] = useState("Venue");

  const handleLocationSelect = (label: string) => {
    setActive(label);

    if (label === "Online" || label === "To be announced") {
      setValue("eventLocation", label);
    } else {
      setValue("eventLocation", "");
    }
  };

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Form Data:", data);
    const {
      eventCoverImage,
      eventTitle,
      eventSubtitle,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventDescription,
      eventPrice,
      eventLocation,
      totalTickets,
    } = data;
    try {
      const res = await api.post(
        `/api/events`,
        {
          eventCoverImage,
          eventTitle,
          eventSubtitle,
          eventDate,
          eventStartTime,
          eventEndTime,
          eventDescription,
          eventPrice,
          eventLocation,
          totalTickets
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(res.data.message);
      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError("root", {
        message: "Server is busy, Please try again after some time.",
      });
      toast.error(error.response.data?.error);
    }
  };

  const [isFree, setIsFree] = useState(false);

  const handleFreeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsFree(checked);

    if (checked) {
      setValue("eventPrice", "0");
    }
  };

  return (
    <div className="min-h-screen min-w-full text-stone-900">
      <form
        className="mx-10 lg:mx-[25%] md:mx-[10%] md:mt-30 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="md:text-[48px] text-3xl font-semibold">
            Create an event
          </h1>
          <p className="md:text-lg text-sm font-normal">
            Planning something exciting? Let’s make it official! Fill out the
            form below to create and share your event with others.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="md:text-[32px] text-2xl font-semibold">Event title</h2>
          <h3 className="md:text-md text-sm">
            Give your event a name that grabs attention
          </h3>
          <input
            {...register("eventTitle", { required: "Please enter title" })}
            type="text"
            placeholder="Event title"
            className="w-full border-2 mt-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            name="eventTitle"
          />
          {errors.eventTitle && (
            <p className="text-red-500 text-sm">{errors.eventTitle.message}</p>
          )}
          <input
            {...register("eventSubtitle")}
            type="text"
            placeholder="Event subtitle"
            className="w-full border-2 mt-4 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            name="eventSubtitle"
          />
          {errors.eventSubtitle && (
            <p className="text-red-500 text-sm">
              {errors.eventSubtitle.message}
            </p>
          )}
        </div>
        <div className="mt-10">
          <h2 className="md:text-[32px] text-2xl font-semibold">Date & Time</h2>
          <h3 className="md:text-lg text-sm">
            Choose when your event will take place
          </h3>
          <div>
            <input
              {...register("eventDate")}
              name="eventDate"
              type="date"
              className="border-2 my-3  border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            <div className="md:inline relative">
              <div className="md:hidden">Start time</div>
              <input
                {...register("eventStartTime")}
                name="eventStartTime"
                type="time"
                className="border-2 md:my-3 md:ms-5 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              />
              <div className="md:inline absolute left-6 bottom-[-38px] hidden">
                Start time
              </div>
              {errors.eventStartTime && (
                <p className="text-red-500 text-sm">
                  {errors.eventStartTime.message}
                </p>
              )}
            </div>
            <div className="inline relative">
              <div className="mt-2 md:hidden">End time</div>
              <input
                {...register("eventEndTime")}
                name="eventEndTime"
                type="time"
                className="border-2 md:my-3 md:ms-5 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              />
              <div className="md:inline hidden absolute left-6 bottom-[-38px]">
                End time
              </div>
              {errors.eventEndTime && (
                <p className="text-red-500 text-sm">
                  {errors.eventEndTime.message}
                </p>
              )}
            </div>
            {errors.eventDate && (
              <>
                <p className="text-red-500 text-sm">
                  {errors.eventDate.message}
                </p>
              </>
            )}
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
                onClick={() => handleLocationSelect(option.label)}
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
              {...register("eventLocation")}
              type="text"
              placeholder="Enter location"
              className={`mt-5 w-full border-2 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300 ${
                active !== "Venue"
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
              name="eventLocation"
            />
            {errors.eventLocation && (
              <p className="text-red-500 text-sm">
                {errors.eventLocation.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-15 ">
          <h2 className="md:text-[32px] text-2xl font-semibold">
            Ticket price
          </h2>
          <h3 className="mb-5 md:text-lg text-sm">
            Set the ticket price for your event. You can choose to keep it
            <br /> free or charge a fee based on your event type.
          </h3>
          <input
            type="checkbox"
            name="free_checkbox"
            id="free_checkbox"
            className="font-bold"
            checked={isFree}
            onChange={handleFreeToggle}
          />
          <label htmlFor="free_checkbox" className="mx-2 text-xl font-semibold">
            Free
          </label>
          <label htmlFor="eventPrice" className="block mt-5">
            Set ticket price
          </label>
          <input
            {...register("eventPrice")}
            placeholder="Amount"
            className="block max-w-50 border-2 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            name="eventPrice"
            id="eventPrice"
            disabled={isFree}
          />
          {errors.eventPrice && (
            <p className="text-red-500 text-sm">{errors.eventPrice.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="eventPrice" className="block mt-5">
            Set Total tickets (optional)
          </label>
          <input
            {...register("totalTickets")}
            placeholder="Total tickets"
            className="block max-w-50 border-2 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            name="totalTickets"
            id="totalTickets"
          />
          {errors.totalTickets && (
            <p className="text-red-500 text-sm">
              {errors.totalTickets.message}
            </p>
          )}
        </div>

        <div className="mt-15">
          <h2 className="md:text-[32px] text-2xl font-semibold">
            Event Description
          </h2>
          <h3 className="mb-5 text-sm md:text-lg">
            Share more about what the event is about
          </h3>
          <textarea
            {...register("eventDescription")}
            placeholder="Enter event description..."
            rows={8}
            name="eventDescription"
            className="w-full p-4 border border-gray-300 rounded-md md:text-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          {errors.eventDescription && (
            <p className="text-red-500 text-sm">
              {errors.eventDescription.message}
            </p>
          )}
        </div>
        <div className="mt-15">
          <h2 className="md:text-[32px] text-2xl font-semibold">Cover image</h2>
          <h3 className="mb-5 md:text-lg text-sm">
            Upload an image to make your event stand out
          </h3>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="my-4 w-3xl h-1/3 object-cover rounded"
            />
          )}
          <div>
            {/* Hidden input */}
            <input
              {...register("eventCoverImage")}
              type="file"
              name="eventCoverImage"
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
            {errors.eventCoverImage && (
              <p className="text-red-500 text-sm">
                {errors.eventCoverImage.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-10 mb-30 text-lg font-semibold py-2.5 px-10 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors"
        >
          Submit
        </button>
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}

export default CreateEventPage;
