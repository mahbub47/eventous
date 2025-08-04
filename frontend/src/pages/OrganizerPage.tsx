import EventCard from "@/components/EventCard";
import { useEventContext } from "@/context/EventContext";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

function OrganizerPage() {
  const { userId } = useParams<{ userId: string }>();
  const [organizer, setOrganizer] = useState<Organizer | null>(null);

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const response = await api.get(`/api/users/${userId}`);
        console.log("Fetched User:", response.data);
        setOrganizer(response.data);
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    };
    fetchOrganizer();
  }, [userId]);

  const { events } = useEventContext();
  
    const myEvents = events
      .filter((event) => event.createdBy == userId);
  return (
    <>
      <div className="min-h-screen">
        <div className="p-10 mx-auto w-[40%] h-100 my-20 rounded-xl border-stone-200 border-2 flex flex-col items-center">
          <img
            src={`http://localhost:5000${organizer?.profileImage}`}
            alt="Profile image"
            className="w-24 h-24 object-cover rounded-full"
          />
          <h1 className="font-semibold text-2xl my-5">{organizer?.name}</h1>
          <div className="flex gap-5">
            <button className="text-stone-900 font-medium cursor-pointer bg-yellow-300 py-2 px-5 rounded">
              Follow
            </button>
            <button className="text-stone-900 font-medium cursor-pointer py-2 px-5 rounded">
              Contact
            </button>
          </div>
          <div className="flex gap-5 mt-5">
            <div className="flex items-center justify-center flex-col">200 <div>Followers</div></div>
            <div className="bg-stone-500 w-[1px] h-full"></div>
            <div className="flex items-center justify-center flex-col">19 <div>Events</div></div>
          </div>
        </div>
        <div className="w-8/12 mx-auto mt-30 md:mb-50 mb-10">
        <h1 className="text-xl mb-3">Events</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          {myEvents.map((event) => (
            <EventCard
              id={event._id}
              key={event._id}
              title={event.eventTitle}
              date={event.eventDate}
              location={event.eventLocation}
              imageUrl={`http://localhost:5000${event.eventCoverImage}`}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default OrganizerPage;
