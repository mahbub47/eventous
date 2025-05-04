function AboutUs() {
  return (
    <div className="w-full px-6 md:px-[20%] py-10 md:py-30 bg-white text-black ">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-400">
        About Eventous
      </h1>
      <p className="text-base md:text-lg leading-relaxed mb-6">
        Eventous is your go-to platform for discovering and organizing events
        with ease. Whether you're hosting a small community meetup or a
        large-scale conference, Eventous makes it simple to plan, manage, and
        connect with your audience.
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-6">
        Our mission is to empower individuals and communities by making event
        creation seamless and accessible. With tools to customize, promote, and
        manage your events, Eventous puts everything you need in one place.
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-10">
        Built using the modern MERN stack and crafted with attention to detail,
        Eventous is designed to deliver a smooth and enjoyable experience for
        both event organizers and attendees.
      </p>

      <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-yellow-400">
        Meet the Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
          <h3 className="text-lg font-bold">Mahbub Ahmed Ashik</h3>
          <p className="text-sm text-gray-600">
            Team Lead & Full-Stack Developer
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
          <h3 className="text-lg font-bold">Anik Mollik</h3>
          <p className="text-sm text-gray-600">Frontend Developer</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
          <h3 className="text-lg font-bold">Jihan Khan</h3>
          <p className="text-sm text-gray-600">Backend & Database Engineer</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
