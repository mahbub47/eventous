import EventImage from "../../assets/event.jpg";

function HeroEvents() {
  return (
    <>
      <div className="w-8/12 mx-auto mt-18 md:mb-50 mb-10">
        <h1 className="text-xl mb-3">Events in Dhaka</h1>
        <div className="bg-red-500 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-5">
          <div className="bg-blue-200 h-[300px] m-2 w-[100px] mx-auto">
            <img src={EventImage} alt="Event-Image" className=""/>
          </div>
          <div className="bg-blue-200 h-[300px] m-2 w-[100px] mx-auto"></div>
          <div className="bg-blue-200 h-[300px] m-2 w-[100px] mx-auto"></div>
          <div className="bg-blue-200 h-[300px] m-2 w-[100px] mx-auto"></div>
        </div>
      </div>
    </>
  );
}

export default HeroEvents;
