import api from "@/utils/api";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { useParams } from "react-router-dom";

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

interface Organizer {
  name?: string;
  phone?: string;
  jobTitle?: string;
  organization?: string;
  website?: string;
  address?: string;
  address2?: string;
  city?: string;
  zipCode?: string;
  profileImage?: string;
}

function EventPage() {
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const response = await api.get(`/api/users/${event?.createdBy}`);
        console.log("Fetched User:", response.data);
        setOrganizer(response.data);
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    };
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${eventId}`);
        console.log("Fetched event:", response.data);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchOrganizer();
    fetchEvent();
  }, [eventId, event?.createdBy]);

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-4 w-full max-w-[60%] mx-auto mt-10 ">
      <img
        src={`http://localhost:5000${event.eventCoverImage}`}
        alt="event cover"
        className="w-full rounded-lg h-[40vh] object-cover"
      />
      <div className="relative w-full h-8">
        <button className="absolute bottom-0 right-0">
          <FaRegBookmark className="w-5 h-5" />
        </button>
      </div>
      <h3 className="font-normal text-lg mt-10">{formattedDate}</h3>
      <h1 className="font-semibold text-[48px]/18 text-stone-900">
        {event.eventTitle}
      </h1>
      <h2 className="font-normal text-xl text-stone-900 mb-10">
        {event.eventSubtitle}
      </h2>
      <div className="font-semibold text-2xl">By</div>
      <div className="flex flex-row p-5 items-center bg-stone-100 w-fit rounded-xl my-5">
        <img
          src={`http://localhost:5000${organizer?.profileImage}`}
          alt=""
          className="w-10 h-10 object-cover rounded-full"
        />
        <h1 className="font-semibold text-xl px-5 hover:underline cursor-pointer">{organizer?.name}</h1>
        <button className="text-stone-900 font-medium cursor-pointer bg-yellow-300 py-2 px-3 rounded">
          Follow
        </button>
      </div>
      <div className="font-semibold text-2xl">Date & Time</div>
      <div className="font-normal text-lg mt-2 mb-10">
        {formattedDate} <br /> {event.eventStartTime} to {event.eventEndTime}
      </div>
      <div className="font-semibold text-2xl">Location</div>
      <div className="font-normal text-lg mt-2 mb-10">
        {event.eventLocation}
      </div>
      <div className="font-semibold text-2xl">About this event</div>
      <div className="font-normal text-lg mt-3 mb-10">
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
          {event.eventDescription || "No description available."}
        </pre>
      </div>
      <div className="p-5 border-2 rounded w-fit flex flex-col items-center justify-center my-20">
        <h1 className="font-normal text-2xl mb-5">{event.eventPrice === "0" ? "Free" : event.eventPrice + "  BDT"}</h1>
        <button className="px-15 text-stone-900 font-medium cursor-pointer bg-yellow-300 py-2 rounded">
          Get Ticket
        </button>
      </div>
    </div>
  );
}

export default EventPage;
