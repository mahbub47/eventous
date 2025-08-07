import EventCard from "@/components/EventCard";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
};

function AllEventsPage() {
  const [ events, setEvents ] = useState<Event[]>([]);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";


  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get("/api/events/query", {
        params: {
          search: searchQuery,
        },
      });
      setEvents(res.data);
    };

    fetchEvents();
  }, [searchQuery]);
  return (
    <div className=" min-h-screen">
      <div className="w-8/12 mx-auto mt-20 ">
        <h1 className="text-[32px] font-medium mb-4">{searchQuery ? searchQuery : "All"} Events</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          {events.map((event) => (
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
  );
}

export default AllEventsPage;
