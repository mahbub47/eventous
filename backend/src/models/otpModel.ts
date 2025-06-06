import { Schema, model, InferSchemaType } from "mongoose";

const otpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

type OtpType = InferSchemaType<typeof otpSchema>;

export default model<OtpType>("Otp", otpSchema);