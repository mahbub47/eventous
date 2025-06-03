import EventCard from "@/components/EventCard";
import HeroImage from "../assets/hero-image.jpg";

function LandingPage() {
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
        <h1 className="text-xl mb-3">Events in Dhaka</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>

      <div className="w-8/12 mx-auto mt-10 md:mb-50 mb-10">
        <h1 className="text-xl mb-3">Upcoming workshops</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <EventCard
            title="Music Fest 2025"
            date="June 10, 2025"
            location="Dhaka, Bangladesh"
            imageUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
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
        <button className="mt-5 ms-[20%] text-lg font-semibold py-2.5 px-10 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors">
          Create event
        </button>
      </div>
    </>
  );
}

export default LandingPage;
