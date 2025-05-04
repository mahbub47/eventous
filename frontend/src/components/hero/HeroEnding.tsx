function HeroEnding() {
  return (
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
  );
}

export default HeroEnding;
