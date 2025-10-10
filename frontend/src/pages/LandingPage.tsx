import EventCard from "@/components/EventCard";
import HeroImage from "../assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserDashboard from "./UserDashboard";
import { useEventContext } from "@/context/EventContext";
import LoadingPage from "./LoadingPage";
function LandingPage() {
  const { events, isLoading } = useEventContext();

  const eventsInDhaka = events
    .filter((event) => event.eventLocation.toLowerCase().includes("dhaka"))
    .slice(0, 4);

  const upcomingEvents = events
    .filter(
      (event) =>
        event.eventTitle.toLowerCase().includes("workshop") ||
        (event.eventSubtitle &&
          event.eventSubtitle.toLowerCase().includes("workshop"))
    )
    .slice(0, 8);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSeeAllEventsInDhaka = () => {
    const query = "dhaka";
    navigate(`/events?search=${encodeURIComponent(query.trim())}`);
  };

  const handleSeeAllWorkshopEvents = () => {
    const query = "workshop";
    navigate(`/events?search=${encodeURIComponent(query.trim())}`);
  };

  if (isAuthenticated) {
    return <UserDashboard />;
  }

  if (isLoading) return <LoadingPage />;

  return (
    <>
      {/* Hero Title */}
      <div className="w-full relative md:mt-10 mt-4 ">
        <div className="text-stone-900 w-full font-normal lg:text-[94px]/24 md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Create
        </div>
        <div className="text-stone-900 w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Discover
        </div>
        <div className="bg-yellow-300 text-stone-900 w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Attend
        </div>
        <div className="text-stone-900 font-light lg:text-3xl mt-2 md:text-xl sm:text-lg ps-[20%]">
          All in one place
        </div>
        <img
          src={HeroImage}
          alt="hero-image"
          className="w-64 absolute top-25 right-[20%] rounded-full border-24 border-yellow-300 lg:block hidden"
        />
        <div className="md:mt-10 mt-4 text-xs lg:text-[16px] ps-[20%] hidden sm:block text-stone-900">
          Eventous lets you effortlessly create, manage, and join events <br />—
          from concerts and seminars to workshops and meetups.
        </div>
      </div>

      {/* Feature Events */}
      <div className="w-8/12 mx-auto mt-18 md:mb-30 mb-10">
        <div className="w-full flex justify-between">
          <h1 className="text-xl mb-3">Events in Dhaka</h1>
          <h1 className="text-lg underline cursor-pointer mb-3" onClick={handleSeeAllEventsInDhaka}>See all</h1>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          {eventsInDhaka.map((event) => (
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

      <div className="w-8/12 mx-auto mt-10 md:mb-50 mb-10">
        <div className="w-full flex justify-between">
          <h1 className="text-xl mb-3">Upcoming Workshops</h1>
          <h1 className="text-lg underline cursor-pointer mb-3" onClick={handleSeeAllWorkshopEvents}>See all</h1>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          {upcomingEvents.map((event) => (
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

      {/* Hero ending */}
      <div className="w-full relative mt-4 md:mb-20 mb-10">
        <div className="bg-yellow-300 w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Organize
        </div>
        <div className="bg-white w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Event
        </div>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="mt-5 ms-[20%] text-lg font-semibold py-2.5 px-10 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors"
        >
          Create event
        </button>
      </div>
    </>
  );
}

export default LandingPage;
