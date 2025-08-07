import EventCard from "@/components/EventCard";
import { useEventContext } from "@/context/EventContext";
import LoadingPage from "./LoadingPage";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const {events, isLoading} = useEventContext();

  const navigate = useNavigate();

  const handleUpcomingEvents = () => {
    const query = "";
    navigate(`/events?search=${encodeURIComponent(query.trim())}`);
  }

  if(isLoading) return <LoadingPage/>
  
  return (
    <div className="w-full min-h-screen ">
      <div className="w-full relative md:mt-30 mt-10 ">
        <div className="bg-yellow-300 text-stone-900 w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Explore
        </div>
        <div className="text-stone-900 w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Events
        </div>
      </div>
      <div className="w-8/12 mx-auto mt-30 md:mb-50 mb-10">
      <div className="w-full flex justify-between">
        <h1 className="text-xl mb-3">Upcoming events</h1>
        <h1 className="text-md underline cursor-pointer mb-3" onClick={handleUpcomingEvents}>See more</h1>
      </div>
        
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

export default UserDashboard;
