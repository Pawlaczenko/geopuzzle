import mongoose, {  Schema, model} from "mongoose";
import Track, { TrackDiff } from "../interfaces/ITrack.js";
import { NextFunction } from "express";
import WaypointModel, { waypointSchema } from "./waypointsModel.js";
import AppError from "../utils/appError.js";
import { deleteFile } from "../utils/deleteFile.js";


export const trackSchema = new Schema({
    name:{
        type: String,
        required: [true, "Trasa musi posiadać swoją nazwę"],
        trim: true,
        maxLength: [75, "Maksymalna dlugosc nazwy trasy wynosi 75 znakow"]

    },
    description: {
        type: String,
        required: [true, "Trasa musi posiadać swój opis"],
        min: [5, "Opis trasy musi mieć przynajmniej 5 znaków"],
        max: [500, `Opis przekroczył maksymalny ilośc znaków. (500)}`],
    },
    thumbnail: {
        type:String,
        default: "/tracks/default.png"
    },
    isActive: {
        type: Boolean,
        default: false,
    },

})

trackSchema.virtual("waypoints", {
    ref: "Waypoints",
    localField: "_id",
    foreignField: "trackId"

    
})
//TODO: 
// flag cannot be set when no waypoints
// track cannot have more then 5 waupoints
// FIXME:



trackSchema.post('findOneAndDelete', async function(doc, next){
    
    // if(doc.waypoints)
    //     await WaypointModel.deleteMany({_id: doc.waypoints});
    if(doc.thumbnail !== process.env.TRACK_DEFAULT_THUMBNAIL)
        await deleteFile(`public/${doc.thumbnail}`, next);
    next();
});

const TrackModel = model('Tracks', trackSchema);
export default TrackModel; 