import { useAuth } from "@/context/AuthContext";
import { useEventContext } from "@/context/EventContext";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
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

interface Organizer {
  id?: string;
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
  const { user, followingIds, setFollowingIds } = useAuth();
  const { savedEventIds, setSavedEventIds } = useEventContext();
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  const navigate = useNavigate();

  const isSaved = savedEventIds.includes(eventId!);

  const notMyProfile = user?._id !== event?.createdBy;

  const isFollowing =
    event && event.createdBy ? followingIds.includes(event.createdBy) : false;

  const toggleSave = async () => {
    const save = !isSaved;

    const res = api.post(`/api/events/${eventId}/save`, { save });
    toast.success((await res).data.message);

    if (save) {
      setSavedEventIds((prev) => [...prev, eventId!]);
    } else {
      setSavedEventIds((prev) => prev.filter((eid) => eid !== eventId!));
    }
  };

  const toggleFollow = async () => {
    const follow = !isFollowing;

    const res = api.post(`/api/users/${event?.createdBy}/follow`, { follow });
    toast.success((await res).data.message);

    if (follow) {
      setFollowingIds((prev) => [...prev, event!.createdBy!]);
    } else {
      setFollowingIds((prev) => prev.filter((id) => id !== event!.createdBy!));
    }
  };

  const handleViewOrganizerProfile = () => {
    navigate(`/organizers/${event?.createdBy}`);
  };

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

  useEffect(() => {
    const fetchOrganizer = async () => {
      if (!event?.createdBy) return;
      try {
        const response = await api.get(`/api/users/${event.createdBy}`);
        setOrganizer(response.data);
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    };

    fetchOrganizer();
  }, [event?.createdBy]);

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-5 w-full lg:max-w-[60%] mx-auto lg:mt-10 mt-5">
      <img
        src={`http://localhost:5000${event.eventCoverImage}`}
        alt="event cover"
        className="w-full rounded-lg h-[40vh] object-cover"
      />
      <div className="relative w-full h-8">
        <button
          className="absolute bottom-0 right-0 cursor-pointer"
          onClick={toggleSave}
        >
          {isSaved ? (
            <FaBookmark className="w-5 h-5" />
          ) : (
            <FaRegBookmark className="w-5 h-5" />
          )}
        </button>
      </div>
      <h3 className="font-normal lg:text-lg text-sm mt-10">{formattedDate}</h3>
      <h1 className="font-semibold lg:text-[48px]/18 text-stone-900 text-4xl">
        {event.eventTitle}
      </h1>
      <h2 className="font-normal lg:text-xl text-stone-900 mb-10 text-md">
        {event.eventSubtitle}
      </h2>
      <div className="font-semibold lg:text-2xl text-lg">By</div>
      <div className="flex flex-row p-5 items-center bg-stone-100 w-fit rounded-xl my-5">
        <img
          src={`http://localhost:5000${organizer?.profileImage}`}
          alt=""
          className="lg:w-10 lg:h-10 w-8 h-8 object-cover rounded-full"
        />
        <h1
          className="font-semibold lg:text-xl text-md px-5 hover:underline cursor-pointer"
          onClick={handleViewOrganizerProfile}
        >
          {organizer?.name}
        </h1>
        {notMyProfile && (
          <button
            className="text-stone-900 font-medium cursor-pointer bg-yellow-300 py-2 px-3 rounded"
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>
      <div className="font-semibold lg:text-2xl text-lg">Date & Time</div>
      <div className="font-normal lg:text-lg text-md mt-2 mb-10">
        {formattedDate} <br /> {event.eventStartTime} to {event.eventEndTime}
      </div>
      <div className="font-semibold lg:text-2xl text-lg">Location</div>
      <div className="font-normal lg:text-lg text-sm mt-2 mb-10">
        {event.eventLocation}
      </div>
      <div className="font-semibold lg:text-2xl text-lg">About this event</div>
      <div className="font-normal text-lg mt-3 mb-10">
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded text-sm lg:text-lg">
          {event.eventDescription || "No description available."}
        </pre>
      </div>
      <div className="p-5 border-2 rounded w-fit flex flex-col items-center justify-center my-20">
        <h1 className="font-normal lg:text-2xl text-lg mb-5">
          {event.eventPrice === "0" ? "Free" : event.eventPrice + "  BDT"}
        </h1>
        <button className="px-15 text-stone-900 font-medium cursor-pointer bg-yellow-300 py-2 rounded">
          Get Ticket
        </button>
      </div>
    </div>
  );
}

export default EventPage;
