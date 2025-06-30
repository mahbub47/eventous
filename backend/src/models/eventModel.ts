import { InferSchemaType, model, Schema } from "mongoose";

const eventSchema = new Schema({
    eventCoverImage: {type: String, required: true},
    eventTitle: { type: String, required: true},
    eventSubtitle: {type: String, required: false},
    eventDate: {type: String, require: true},
    eventStartTime: {type: String, required: false},
    eventEndTime: {type: String, required: false},
    eventLocation: {type: String, required: true},
    eventDescription: {type: String, required: true},
    eventPrice: {type: String, required: true},
    createdBy: {type: String, required: true}
}, {timestamps: true});

type Event = InferSchemaType<typeof eventSchema>;

export default model<Event>("Event", eventSchema);