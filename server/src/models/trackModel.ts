import mongoose, {  InferSchemaType, Query, QueryWithHelpers, Schema, UpdateQuery, model} from "mongoose";
import { NextFunction } from "express";
import AppError from "../utils/appError.js";
import { deleteFile } from "../utils/deleteFile.js";
import { waypointSchema } from "./waypointsModel.js";


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
        minlength: [5, "Opis trasy musi mieć przynajmniej 5 znaków"],
        maxlength: [500, `Opis przekroczył maksymalny ilośc znaków. (500)}`],
    },
    thumbnail: {
        type:String,
        default: process.env.TRACK_DEFAULT_THUMBNAIL!
    },
    waypoints: {
        type: [waypointSchema]
    
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: "Tags",
        unique: [true, "Tasa posiada dwa takie same tagi"]
        
    },
    isActive: {
        type: Boolean,
        default: false,    
    },
}, {timestamps: true})




type TTrack = InferSchemaType<typeof trackSchema>

// TODO: when delete track delete thumbnail if not default
// trackSchema.pre("findOneAndDelete", async function(next){
    
//     next()
// });
// trackSchema.pre("save", async function(this, next){

//     if(this.waypoints.length === 0 || this.tags.length === 0)
//     {
//         this.isActive = false;
//     }
//     next();
// })

// ///

trackSchema.pre("save", function(this, next){

    if(this.getChanges().$set.isActive === true)
    {   
         try {
            const mess = "Trasa nie moze zostac aktywowana poniewaz nie ma dodanych";
            if(this.waypoints.length === 0)
                throw new Error(`${mess} puntów na mapie`)
            if(this.tags.length === 0)
                throw new Error(`${mess} tagów`)
        } catch (error) {
            if( error instanceof Error)
                next(new AppError(error.message, 400))
        }
    }
    next();
})

const trackModel = model<TTrack>('Tracks', trackSchema);
export default trackModel; 