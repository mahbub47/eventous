import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
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
      enum: ['attendee', 'organizer'],
    },
    picture: {
      type: String,
    },
}, {timestamps: true});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);