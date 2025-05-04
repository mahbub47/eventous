import HeroImage from "../../assets/hero-image.jpg";

function HeroTitle() {
  return (
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
  );
}

export default HeroTitle;
