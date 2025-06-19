import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
type FormFields = {
  username: string;
  email: string;
  message: string;
};
function ContactUs() {
  const { user } = useAuth();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      username: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const username = data.username;
    const email = data.email;
    const message = data.message;
    try {
      const res = await api.post("/api/contact/send", {
        username,
        email,
        message,
      });
      toast.success(res.data.message);
      data.username = "";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Something went wrong, ", error);
      toast.success(error.data.message);
    }
  };
  return (
    <div className="w-full px-6 md:px-[20%] py-10 md:py-20 bg-white text-stone-900">
      <h1 className="text-3xl md:text-6xl font-normal mb-6 bg-yellow-300 lg:text-[94px]/24 text-stone-900">
        Contact Us
      </h1>
      <p className="text-sm md:text-lg mb-10">
        Got questions, feedback, or want to work with us? We’d love to hear from
        you! Fill out the form below or reach out through email.
      </p>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="block mb-1 font-semibold">
            Your Name
          </label>
          <input
            {...register("username", { required: "Please enter your name" })}
            type="text"
            id="username"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Your Email
          </label>
          <input
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email",
              },
            })}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold">
            Message
          </label>
          <textarea
            {...register("message", { required: "Please enter your message" })}
            id="message"
            placeholder="Write your message here"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-yellow-300 hover:bg-yellow-400 transition-colors text-stone-900 font-semibold py-2.5 px-10 rounded-sm cursor-pointer"
        >
          {isSubmitting ? "Loading" : "Send Message"}
        </button>
      </form>

      <div className="mt-10 text-sm text-gray-600">
        You can also email us directly at{" "}
        <a
          href="mailto:eventous.team@example.com"
          className="text-yellow-400 underline"
        >
          eventous.help@gmail.com
        </a>
      </div>
    </div>
  );
}

export default ContactUs;
