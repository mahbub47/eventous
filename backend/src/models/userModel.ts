import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["attendee", "organizer"],
    },
    profileImage: {
      type: String,
    },
    phone: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    organization: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
    savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
