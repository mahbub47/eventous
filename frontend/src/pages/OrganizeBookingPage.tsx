import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Bookings {
  _id: string;
  event: string;
  user: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  note?: string;
  paidStatus: boolean;
  transactionId: string;
  bookingStatus: "pending" | "confirmed" | "canceled";
  createdAt: string;
}

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

function OrganizeBookingPage() {
  const { userId, eventId } = useParams();
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/api/events/${eventId}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/api/bookings/${eventId}`);
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
    fetchEvent();
  }, [userId, eventId]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await api.delete(`/api/bookings/${bookingId}`);
      toast.success(res.data.message || "Booking canceled successfully");
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      const res = await api.put(`/api/bookings/${bookingId}/confirm`);
      toast.success(res.data.message);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, bookingStatus: "confirmed" } : b
        )
      );
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="lg:w-8/12 w-10/12 mx-auto mt-20">
        <h1 className="text-2xl font-medium mb-4">Bookings for</h1>
        <h1 className="font-semibold text-3xl mb-10">{event?.eventTitle}</h1>
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => {
            const formattedDate = booking?.createdAt
              ? new Date(booking.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                })
              : "Date not available";
            const formattedMonth = booking?.createdAt
              ? new Date(booking.createdAt).toLocaleDateString("en-GB", {
                  month: "short",
                })
              : "Date not available";
            return (
              <div
                className="w-full p-5 bg-stone-100 flex lg:flex-row flex-col"
                key={booking._id}
              >
                <div className="flex-1 flex">
                  <div className="flex flex-col justify-center items-center text-center mx-5">
                    <div className="font-normal text-lg text-red-500">
                      {formattedMonth}
                    </div>
                    <div className="font-normal text-md">{formattedDate}</div>
                  </div>
                  <div className="mx-5 flex flex-col justfy--between">
                    <div>
                      <h2 className="text-lg font-semibold">{booking.name}</h2>
                      <h4 className="text-md">{booking.email}</h4>
                    </div>
                    <div className="text-xs">{booking.phone}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-between items-center mt-5 lg:mt-0">
                  <div className="flex flex-col items-center">
                    <div className="text-sm">paid status</div>
                    <div>{booking.paidStatus ? "Paid" : "Not Paid"}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm">Booking status</div>
                    <div>{booking.bookingStatus}</div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="text-sm mb-1"></div>
                    <button
                      disabled={booking.bookingStatus !== "pending"}
                      className={`${
                        booking.bookingStatus === "pending"
                          ? "bg-green-200"
                          : "bg-gray-200"
                      } px-5 py-2 font-semibold cursor-pointer`}
                      onClick={() => handleConfirmBooking(booking._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-200 px-5 py-2 font-semibold cursor-pointer"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrganizeBookingPage;
