import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().min(1, "Please enter your email").email(),
  address: z.string().optional(),
  phone: z
    .string()
    .min(1, "Please enter your phone number")
    .refine(
      (val) => !val || /^(\+88)?01[3-9]\d{8}$/.test(val),
      "Enter a valid phone number"
    ),
  note: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

interface Event {
  eventId?: string;
  eventTitle?: string;
  eventSubtitle?: string;
  eventDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
  eventLocation?: string;
  eventDescription?: string;
  eventPrice?: string;
  createdBy?: string;
  eventCoverImage: string;
}

function GetTicketPage() {
  const { user } = useAuth();
  const [isNext, setIsNext] = useState(1);
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleClickForOne = () => {
    setIsNext(1);
  };

  const handleCheckout = () => {
    setIsNext(2);
  };

  const onSubmit = async (data: FormFields) => {
    try {
      const {
        note = "",
        name = "",
        email = "",
        address = "",
        phone = "",
      } = data;

      const res = await api.post(`/api/bookings/book/${eventId}`, {
        note,
        name,
        email,
        address,
        phone,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.url);
      window.location.href = res.data.url;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place booking");
    }
  };

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  return (
    <div className="min-h-screen">
      <div className="w-8/12 mx-auto mt-20 mb-10 flex justify-center items-center">
        <div
          className={`${
            isNext === 1 ? "bg-yellow-300" : "bg-gray-300"
          } h-10 w-10 rounded-full flex items-center justify-center cursor-pointer`}
          onClick={handleClickForOne}
        >
          1
        </div>
        <div className="bg-gray-300 h-1 w-2/12 flex items-center justify-center mx-5"></div>
        <div
          className={`${
            isNext === 2 ? "bg-yellow-300" : "bg-gray-300"
          } h-10 w-10 rounded-full flex items-center justify-center cursor-pointer`}
          onClick={handleSubmit(onSubmit)}
        >
          2
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isNext === 1 ? (
          <div className="w-6/12 mx-auto justify-start flex-col flex">
            <h1 className="font-normal text-4xl">Booking information</h1>
            <div className="mt-10">
              <div className="mt-2">
                <label htmlFor="name" className="block mb-3">
                  Full Name
                </label>
                <input
                  readOnly
                  {...register("name")}
                  type="text"
                  id="name"
                  className="border-2 border-gray-300 rounded-sm px-4 w-1/2 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  readOnly
                  {...register("email")}
                  type="email"
                  id="email"
                  className="border-2 border-gray-300 rounded-sm px-4 w-1/2 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="address" className="block mb-2">
                  Address
                </label>
                <input
                  readOnly
                  {...register("address")}
                  type="text"
                  id="address"
                  className="border-2 border-gray-300 rounded-sm px-4 w-1/2 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="phone" className="block mb-2">
                  Contact Number
                </label>
                <input
                  readOnly
                  {...register("phone")}
                  type="tel"
                  id="phone"
                  className="border-2 border-gray-300 rounded-sm px-4 w-1/2 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="note" className="block mb-2">
                  Note
                </label>
                <textarea
                  {...register("note")}
                  rows={4}
                  id="note"
                  className="border-2 border-gray-300 rounded-sm px-4 w-1/2 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                />
              </div>
              <button
                onClick={handleCheckout}
                className="px-15 text-stone-900 font-medium cursor-pointer bg-yellow-300 py-2 rounded mt-20"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="w-6/12 mx-auto flex flex-col items-center mb-10">
            <h1 className="font-normal text-4xl mb-10">Ticket</h1>
            <div>
              <div className="w-100 h-fit border-2 border-gray-300 rounded-4xl text-center">
                <img
                  src={`http://localhost:5000${event?.eventCoverImage}`}
                  alt="Event Cover"
                  className="object-cover w-full h-50 rounded-4xl"
                />
                <h3 className="text-md mt-5">Ticket ID: XX-0011-AA</h3>
                <h1 className="text-xl font-normal mt-5">
                  {event?.eventTitle}
                </h1>
                <h2 className="text-sm font-normal mb-10">
                  {event?.eventLocation}
                </h2>
              </div>
              <div className="w-100 h-fit border-2 border-gray-300 rounded-4xl text-center mt-[5px]">
                <h1 className="text-md mt-10">Name: {user?.name}</h1>
                <h3 className="text-sm font-normal mt-5">
                  email: {user?.email}
                </h3>
                <h3 className="text-sm font-normal ">phone: {user?.phone}</h3>
                <div className="m-10">
                  <div>
                    <div className="flex justify-between my-3">
                      <h2>Date:</h2>
                      <h3 className="text-sm">{formattedDate}</h3>
                    </div>
                    <hr />
                  </div>
                  <div>
                    <div className="flex justify-between my-3">
                      <h2>Place:</h2>
                      <h3 className="text-sm text-end">
                        {event?.eventLocation}
                      </h3>
                    </div>
                    <hr />
                  </div>
                  <div>
                    <div className="flex justify-between my-3">
                      <h2>Time:</h2>
                      <h3 className="text-sm">
                        {event?.eventStartTime} to {event?.eventEndTime}
                      </h3>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="w-100 h-fit border-2 border-gray-300 rounded-4xl text-center mt-[5px]">
                <div className="w-full h-full flex justify-center items-center p-5 py-8">
                  <h3 className="text-md">total</h3>
                  <h1 className="text-3xl font-semibold ms-2">
                    ৳{event?.eventPrice}
                  </h1>
                </div>
              </div>
            </div>
            <div className="max-w-100 mx-auto flex flex-col items-start mb-20">
              <button
                type="submit"
                className="mt-10 mb-30 text-lg font-normal py-2.5 px-10 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors"
              >
                Place order
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default GetTicketPage;
