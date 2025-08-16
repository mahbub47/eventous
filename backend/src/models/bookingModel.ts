import { InferSchemaType, model, Schema } from "mongoose";

const bookingSchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    eventName: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: false},
    address: {type: String, required: false},
    note: { type: String, required: false },
    paidStatus: { type: Boolean, default: false },
    transactionId: { type: String, required: true },
    bookingStatus: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" }
}, {timestamps: true});

type Booking = InferSchemaType<typeof bookingSchema>;

export default model<Booking>("Booking", bookingSchema);