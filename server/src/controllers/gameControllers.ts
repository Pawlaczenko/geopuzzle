import mongoose from "mongoose";
import trackModel from "../models/trackModel.js";

export const getTrackDetails = async (id:string )=> {
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new Error("Id nie jest typu ObjectId")
    let doc = await trackModel.findById(id).populate("waypoints");
    if(!doc)
        throw new Error(`Trasa od id ${id} nie istnieje`);
    return doc.toObject({virtuals: true});
}