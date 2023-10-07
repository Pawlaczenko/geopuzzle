import { Document, Types } from "mongoose";
export enum TrackDiff {
    easy = "łatwy",
    medium = "średni",
    hard = "trudny",

}
interface Track extends Document {
    name: string,
    description: string,
    thumbnail: string,
    waypoints: [],
    difficulty: TrackDiff,
    isActive: boolean

}
export default Track