
function ContactUs() {
  return (
    <div className="w-full px-6 md:px-[20%] py-10 md:py-20 bg-white text-black">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-300">Contact Us</h1>
      <p className="text-base md:text-lg leading-relaxed mb-10">
        Got questions, feedback, or want to work with us? We’d love to hear from you! Fill out the form below or reach out through email.
      </p>

      <form className="flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Write your message here"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-yellow-300 hover:bg-yellow-400 transition-colors text-black font-semibold py-2.5 px-10 rounded-sm cursor-pointer"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-sm text-gray-600">
        You can also email us directly at{" "}
        <a href="mailto:eventous.team@example.com" className="text-yellow-400 underline">
          eventous.team@example.com
        </a>
      </div>
    </div>
  )
}

export default ContactUs