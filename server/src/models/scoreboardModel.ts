import mongoose, { InferSchemaType, Schema, model, ObjectId } from "mongoose";

const scoreboardSchema = new Schema({
    trackId: {
        type: mongoose.Types.ObjectId,
        ref: "Tracks",
        required: [true, "Potrzebne dane o trasie"]
    },
    score: {
        type: Number,
        required: [true, "Wpis musi mieć wynik"]
    },
    timeMs : {
        type: Number,
        required: [true, "Wpis musi posiadać wynik czasowy punktowy"]
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    }
}, {timestamps: {updatedAt: false}});
export type TScroboeard = InferSchemaType<typeof scoreboardSchema>;
const scoreboardModel = model<TScroboeard>("Scoreboard",scoreboardSchema);
export default scoreboardModel;