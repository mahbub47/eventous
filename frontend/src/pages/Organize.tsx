/* eslint-disable no-constant-binary-expression */
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

function Organize() {
  const {user} = useAuth();
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenID, setIsOpenID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/api/events/my-events");
        setMyEvents(response.data);
        console.log("Fetched my events:", response.data);
      } catch (error) {
        console.error("Error fetching my events:", error);
      }
    };
    fetchMyEvents();
  }, []);

  const handleToggle = (id: string) => {
    setIsOpenID(id);
    setIsOpen(!isOpen);
  };

  const handleEditEvent = (eventId: string) => {
    navigate(`/organizers/${user?._id}/organize/${eventId}/edit`);
  }

  const handleDeleteEvent = (eventId: string) => async () => {
    try {
      const res = await api.delete(`/api/events/${eventId}`);
      setIsOpen(!isOpen);
      toast.success(res.data.message);
      navigate(`/organizers/${user?._id}/organize`);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const handleBookingEvent = (eventId: string) => {
    navigate(`/organizers/${user?._id}/organize/${eventId}/bookings`);
  };

  return (
    <div className="min-h-screen">
      <div className="lg:w-8/12 w-10/12 mx-auto mt-20">
        <h1 className="text-3xl font-medium mb-4">Events</h1>
        <div className="flex flex-col gap-4">
          {myEvents.map((event) => {
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
              <div className="w-full p-5 bg-stone-100 flex lg:flex-row flex-col" key={event._id}>
                <div className="flex-1 flex">
                  <div className="flex flex-col justify-center items-center text-center mx-5">
                    <div className="font-normal text-lg text-red-500">
                      {formattedMonth}
                    </div>
                    <div className="font-normal text-md">{formattedDate}</div>
                  </div>
                  <div className="mx-5 flex flex-col justfy--between">
                    <div>
                      <h2 className="text-lg font-semibold cursor-pointer hover:underline" onClick={() => {navigate(`/events/${event._id}`);}}>
                        {event.eventTitle}
                      </h2>
                      <h4 className="text-md">{event.eventLocation}</h4>
                    </div>
                    <div className="text-xs">{formattedDATE}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-between items-center mt-5 lg:mt-0">
                  <div className="flex flex-col items-center">
                    <div className="text-sm">Ticket sold</div>
                    <div>{event.totalSoldTickets || 0} / {event.totalTickets || "NA"}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm">Gross</div>
                    <div>{event.eventPrice === "0" ? "NA" : event.grossRevenue || 0}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm mb-1">Status</div>
                    <div className={`${event.eventDate && new Date(event.eventDate) > new Date() ? "bg-green-200" : "bg-red-200"} ${event.eventDate && new Date(event.eventDate) === new Date() ? "bg-blue-200" : ""} px-4 rounded text-sm py-1`}>{event.eventDate && new Date(event.eventDate) > new Date() ? "Upcoming" : "Past"}{event.eventDate && new Date(event.eventDate) === new Date() ? "Ongoing" : ""}</div>
                  </div>
                  <div>
                    <GoKebabHorizontal className="h-5 w-5 mr-5 cursor-pointer" onClick={() => handleToggle(event._id)}/>
                    <div className={`border-2 bg-white border-gray-300 absolute ${isOpen && isOpenID === event._id ? "block" : "hidden"}`}>
                      <div className="py-1">
                      <a
                        className="block px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleEditEvent(event._id)}
                      >
                        Edit
                      </a>
                      <a
                        className="block px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleBookingEvent(event._id)}
                      >
                        Bookings
                      </a>
                      <a
                        className="block px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={handleDeleteEvent(event._id)}
                      >
                        Delete
                      </a>
                    </div>
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

export default Organize;
