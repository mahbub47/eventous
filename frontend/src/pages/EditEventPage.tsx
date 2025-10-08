import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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

function EditEventPage() {
  const { user } = useAuth();
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

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

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  const handleDeleteEvent = async () => {
    try {
      const res = await api.delete(`/api/events/${eventId}`);
      toast.success(res.data.message);
      navigate(`/organizers/${user?._id}/organize`);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEventDescription = async () => {
    try {
      const res = await api.put(`/api/events/${eventId}/description`, {
        eventDescription:
          (
            document.getElementById(
              "event-description"
            ) as HTMLTextAreaElement | null
          )?.value ?? "",
        eventLocation:
          (
            document.getElementById(
              "event-location"
            ) as HTMLInputElement | null
          )?.value ?? "",
      });
      toast.success(res.data.message);
      navigate(`/organizers/${user?._id}/organize`);
    } catch (error) {
      console.error("Error updating event description:", error);
    }
  };

  return (
    <div className="p-5 w-full lg:max-w-[60%] mx-auto lg:mt-10 mt-5">
      <img
        src={`http://localhost:5000${event?.eventCoverImage}`}
        alt="event cover"
        className="w-full rounded-lg h-[40vh] object-cover"
      />
      <h1 className="font-semibold lg:text-[48px]/18 text-stone-900 text-4xl mt-10">
        {event?.eventTitle}
      </h1>
      <h2 className="font-normal lg:text-xl text-stone-900 mb-10 text-md">
        {event?.eventSubtitle}
      </h2>
      <div className="font-semibold lg:text-2xl text-lg">Date & Time</div>
      <h3 className="font-normal lg:text-lg text-sm mt-2 mb-10">
        {formattedDate}
      </h3>
      <div className="font-semibold lg:text-2xl text-lg">Location</div>
      <input
        type="text"
        id="event-location"
        defaultValue={event?.eventLocation}
        className="w-full border-2 mt-4 border-green-300 rounded-sm px-4 py-2 focus:outline-none mb-5"
      />
      <div className="font-semibold lg:text-2xl text-lg">About this event</div>
      <div className="font-normal text-lg mt-3 mb-10">
        <textarea
          className="w-full h-fit border-2 border-green-300 bg-gray-50 p-4 rounded text-sm lg:text-lg"
          defaultValue={event?.eventDescription}
          id="event-description"
          rows={8}
        ></textarea>
      </div>
      <div className="flex mb-20 gap-8">
        <button
          className="bg-blue-400 text-white p-2 rounded cursor-pointer hover:bg-blue-500"
          onClick={handleUpdateEventDescription}
        >
          Save Changes
        </button>
        <button
          className="bg-red-400 text-white p-2 rounded cursor-pointer hover:bg-red-500"
          onClick={handleDeleteEvent}
        >
          Delete Event
        </button>
      </div>
    </div>
  );
}

export default EditEventPage;
