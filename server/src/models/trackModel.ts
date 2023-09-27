import mongoose, {  Schema, model} from "mongoose";
import Track, { TrackDiff } from "../interfaces/ITrack.js";
import { NextFunction } from "express";
import WaypointModel, { waypointSchema } from "./waypointsModel.js";
import AppError from "../utils/appError.js";
import { deleteFile } from "../utils/deleteFile.js";


export const trackSchema = new Schema<Track>({
    name:{
        type: String,
        required: [true, "Trasa musi posiadać swoją nazwę"]
    },
    description: {
        type: String,
        required: [true, "Trasa musi posiadać swój opis"],
        min: [5, "Opis trasy musi mieć przynajmniej 5 znaków"],
        max: [500, `Opis przekroczył maksymalny ilośc znaków. (500)}`]
    },
    // tags: [TagSchema],
    thumbnail: {
        type:String,
        default: "/tracks/default.png"
    },
    waypoints: {
        type: [mongoose.Types.ObjectId],
        ref: "Waypoints",
    },
    difficulty: {
        type: String,
        lowercase: true,
        enum: {
            values: Object.values(TrackDiff),
            message: `Niepoprawna trudność trasy. Nieobsługiwana wartość {VALUE}`
        },
        default: TrackDiff.medium,
    },
    isActive: {
        type: Boolean,
        default: false
    }

})
//TODO: 
// flag cannot be set when no waypoints
// FIXME:
//  isActive is not saved
// trackSchema.pre("save", async function (next){
//     if(this.waypoints.length < 1 && this.isActive === true)
//     {
//         this.isActive = false;
//         return next(new AppError("Nie możesz ustawić widoczności trasy jeśli nie posiada punktów",400));
//     }
//     next();
// });
trackSchema.pre("save", function (next){
    if(this.waypoints.length > 5 )
        return next(new AppError("Trasa moze posiadać maksimum 5 punktów",400));
    
    next();
})


trackSchema.post('findOneAndDelete', async function(doc, next){
    if(doc.waypoints)
        await WaypointModel.deleteMany({_id: doc.waypoints});
    if(doc.thumbnail !== process.env.TRACK_DEFAULT_THUMBNAIL)
        await deleteFile(`public/${doc.thumbnail}`, next);
    console.log('test');
    next();
});

const TrackModel = model<Track>('Tracks', trackSchema);
export default TrackModel; 