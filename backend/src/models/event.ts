import { InferSchemaType, model, Schema } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true},
    subtitle: {type: String, required: false},
    date: {type: Date, require: false},
    time: {type: String, required: false},
    location: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
}, {timestamps: true});

type Event = InferSchemaType<typeof eventSchema>;

export default model<Event>("Event", eventSchema);