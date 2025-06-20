import { CgProfile } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  profileImage: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image is required",
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    })
    .optional(),
  username: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+88)?01[3-9]\d{8}$/.test(val),
      "Enter a valid phone number"
    ),
  jobTitle: z.string().optional(),
  organization: z.string().optional(),
  website: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Enter a valid URL",
    }),
  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  zipCode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), "Enter a valid ZIP code"),
});

type FormFields = z.infer<typeof schema>;

function AccountSettingPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      username: user?.name || "",
      phone: user?.phone || "",
      jobTitle: user?.jobTitle || "",
      organization: user?.organization || "",
      website: user?.website || "",
      address: user?.address || "",
      address2: user?.address2 || "",
      city: user?.city || "",
      zipCode: user?.zip || "",
    },
    resolver: zodResolver(schema),
  });

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const {
      profileImage,
      username,
      phone,
      jobTitle,
      organization,
      website,
      address,
      address2,
      city,
      zipCode,
    } = data;
    try {
      const res = await api.patch(
        `/api/users/${user?._id}`,
        {
          profileImage,
          username,
          phone,
          jobTitle,
          organization,
          website,
          address,
          address2,
          city,
          zipCode,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(res.data.message);
      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError("root", {
        message: "Server is busy, Please try again after some time.",
      });
      toast.error(error.response.data?.error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", file, { shouldValidate: true });
      console.log("Selected file:", file);
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="min-h-screen text-stone-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-10 lg:mx-[25%] md:mx-[10%] md:mt-30 mt-10"
      >
        <div>
          <h1 className="md:text-[48px] text-3xl font-semibold mb-5">
            Account Information
          </h1>
          <hr />
          <p className="text-sm font-normal text-gray-400">
            Eventous account since {formattedDate}
          </p>
          <div className="mt-10">
            {user?.profileImage ? (
              <>
                <input
                  {...register("profileImage")}
                  name="profile"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <img
                  onClick={handleButtonClick}
                  src={previewImage ? previewImage : `http://localhost:5000${user.profileImage}`}
                  alt="Profile Image"
                  className="w-35 h-35 object-cover rounded-full mt-4"
                />
              </>
            ) : (
              <>
                <div>
                  {/* Hidden input */}
                  <input
                    {...register("profileImage")}
                    name="profile"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Styled upload button */}
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="flex-col justify-center items-center gap-2 px-5 py-2 border-dashed border-2 border-gray-400 rounded-md text-black font-medium hover:border-dashed hover:border-blue-500 hover:border-2 transition"
                  >
                    <CgProfile className="mt-3 text-3xl justify-self-center text-blue-500" />
                    <div className="text-blue-500 mt-2 text-xl">
                      Upload an image
                    </div>
                    <div className="text-gray-400 mt-2 text-sm mb-3 ">
                      Choose a file to upload
                    </div>
                  </button>
                  {previewImage && (
                    <>
                      <img
                        src={previewImage}
                        alt="Selected preview"
                        className="w-32 h-32 object-cover rounded-full mt-4"
                      />
                      <div className="text-sm mt-2">Preview</div>
                    </>
                  )}
                </div>
              </>
            )}

            {errors.profileImage && (
              <p className="text-red-500 text-sm">
                {errors.profileImage.message}
              </p>
            )}
          </div>
          <div className="mt-15">
            <h2 className="md:text-[32px] text-2xl font-semibold">
              Contact Information
            </h2>
            <input
              {...register("username")}
              type="text"
              name="username"
              placeholder="Full name"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
            <input
              {...register("phone")}
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
            <input
              {...register("jobTitle")}
              type="text"
              name="jobTitle"
              placeholder="Job title (optional)"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
            )}
            <input
              {...register("organization")}
              type="text"
              name="organization"
              placeholder="Organization/company"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.organization && (
              <p className="text-red-500 text-sm">
                {errors.organization.message}
              </p>
            )}
            <input
              {...register("website")}
              type="link"
              name="website"
              placeholder="Website"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website.message}</p>
            )}
          </div>
          <div className="mt-15">
            <h2 className="md:text-[32px] text-2xl font-semibold">
              Work Address
            </h2>
            <input
              {...register("address")}
              type="text"
              name="address"
              placeholder="Address"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
            <input
              {...register("address2")}
              type="text"
              name="address2"
              placeholder="Address 2 (optional)"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.address2 && (
              <p className="text-red-500 text-sm">{errors.address2.message}</p>
            )}
            <input
              {...register("city")}
              type="text"
              name="city"
              placeholder="City"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
            <input
              {...register("zipCode")}
              type="text"
              name="zipCode"
              placeholder="Zip code"
              className="w-full border-2 my-3 border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-10 mb-30 text-lg font-semibold py-2.5 px-10 bg-yellow-300 rounded-sm cursor-pointer hover:bg-amber-400 transition-colors"
          >
            Save
          </button>
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default AccountSettingPage;
