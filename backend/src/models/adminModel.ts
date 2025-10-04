import { Schema, model, InferSchemaType } from "mongoose";

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

type adminType = InferSchemaType<typeof adminSchema>;

export default model<adminType>("Admin", adminSchema);