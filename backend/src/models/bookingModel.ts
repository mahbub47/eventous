import { InferSchemaType, model, Schema } from "mongoose";

const bookingSchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: false},
    address: {type: String, required: false},
    note: { type: String, required: false }
}, {timestamps: true});

type Booking = InferSchemaType<typeof bookingSchema>;

export default model<Booking>("Booking", bookingSchema);