import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Bookings {
  _id: string;
  event: string;
  eventName: string;
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

function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Bookings[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/api/bookings/my-bookings`);
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

  const handlePayNow = async (booking: Bookings) => {
    try {
      const res = await api.post(`/api/bookings/${booking._id}/pay`);
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await api.delete(`/api/bookings/${bookingId}`);
      toast.success(res.data.message || "Booking canceled successfully");
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="lg:w-8/12 w-10/12 mx-auto mt-20">
        <h1 className="text-2xl font-medium mb-4">My Bookings</h1>
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
                  <div className="mx-5 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {booking.eventName || "Unknown Event"}
                      </h2>
                      <h4 className="text-md">booking ID: {booking._id}</h4>
                    </div>
                    <div className="text-xs">{booking.email}</div>
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
                  <div className="flex flex-col items-center">
                    <div className="text-sm mb-1"></div>
                    <div>
                      <button
                        onClick={() => handlePayNow(booking)}
                        disabled={booking.paidStatus === true}
                        className={`${
                          booking.paidStatus === true
                            ? "bg-green-200"
                            : "bg-yellow-200"
                        } px-5 py-2 font-semibold cursor-pointer`}
                      >
                        {booking.paidStatus === true ? "Paid" : "Pay now"}
                      </button>
                      <button className=" px-5 py-2 font-semibold cursor-pointer bg-red-200 mx-3" onClick={() => handleCancelBooking(booking._id)}>
                        Cancel Booking
                      </button>
                    </div>
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

export default MyBookingsPage;
