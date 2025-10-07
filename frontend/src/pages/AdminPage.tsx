import api from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GrPlan } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Event = {
  _id: string;
  eventTitle: string;
  eventSubtitle?: string;
  eventDate: string;
  eventStartTime?: string;
  eventEndTime?: string;
  eventLocation: string;
  eventPrice: string;
  eventDescription: string;
  eventCoverImage?: string;
  createdBy?: string;
  grossRevenue?: string;
  totalTickets?: string;
  totalSoldTickets?: string;
};

function AdminPage() {
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const nevigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/api/admin/pending-events");
        setPendingEvents(response.data);
        console.log("Fetched my events:", response.data);
      } catch (error) {
        console.error("Error fetching my events:", error);
      }
    };
    fetchMyEvents();
  }, []);

  const handleApproveEvent = async (eventId: string) => {
    try {
      const res = await api.put(`/api/admin/${eventId}/approve`);
      toast.success(res.data.message);
      setPendingEvents((prev) =>
        prev.map((e) =>
          e._id === eventId ? { ...e, pendingStatus: false } : e
        )
      );
    } catch (error) {
      console.error("Error confirming event:", error);
    }
  };

  const handleDenyEvent = (eventId: string) => async () => {
    try {
      await api.delete(`/api/events/${eventId}`);
      toast.success("Event denied and deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="">
        <ul className="flex justify-between px-5 py-1">
          <li className="text-xl">Eventous</li>
          <li className="font-semibold flex justify-center items-center gap-2">
            <span>
              <GrPlan />
            </span>
            Admin Dashboard
          </li>
        </ul>
        <div className="h-[1px] w-full bg-amber-300"></div>
      </nav>
      <div className="lg:w-8/12 w-10/12 mx-auto mt-20">
        <h1 className="text-3xl font-medium mb-4">Pending Events</h1>
        <div className="flex flex-col gap-4">
          {pendingEvents.map((event) => {
            const formattedDate = event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                })
              : "Date not available";
            const formattedMonth = event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString("en-GB", {
                  month: "short",
                })
              : "Date not available";
            const formattedDATE = event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date not available";
            return (
              <div
                className="w-full p-5 bg-stone-100 flex lg:flex-row flex-col"
                key={event._id}
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
                      <h2 className="text-lg font-semibold hover:underline cursor-pointer" onClick={() => {nevigate(`/events/${event._id}`);}}>
                        {event.eventTitle}
                      </h2>
                      <h4 className="text-md">{event.eventLocation}</h4>
                    </div>
                    <div className="text-xs">{formattedDATE}</div>
                  </div>
                </div>
                <div className="justify-center items-center flex gap-4">
                  <button
                    className="bg-green-300 px-5 py-2 text-stone-900 rounded cursor-pointer"
                    onClick={() => handleApproveEvent(event._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-300 text-stone-900 px-5 py-2 rounded cursor-pointer"
                    onClick={handleDenyEvent(event._id)}
                  >
                    Deny
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
