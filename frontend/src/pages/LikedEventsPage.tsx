import EventCard from "@/components/EventCard";
import { useEventContext } from "@/context/EventContext";

function LikedEventsPage() {
  const { savedEvents } = useEventContext();
  return (
    <div className="w-full min-h-screen ">
      <div className="w-8/12 mx-auto mt-30 md:mb-50 mb-10">
        <h1 className="text-4xl font-semibold mb-3">Saved</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          {savedEvents.map((event) => (
            <EventCard
              id={event._id}
              key={event._id}
              title={event.eventTitle}
              date={event.eventDate}
              location={event.eventLocation}
              totalTickets={event.totalTickets}
              totalSoldTickets={event.totalSoldTickets}
              imageUrl={`http://localhost:5000${event.eventCoverImage}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikedEventsPage;
