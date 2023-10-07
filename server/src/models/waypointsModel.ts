import { NextFunction } from 'express';
import mongoose, { ObjectId, Schema, Types, model} from "mongoose";
import { waypointType } from "../types/waypointsDiff.js";
import { Waypoint } from "../interfaces/IWaypoint.js";
import TrackModel from "./trackModel.js";



export const waypointSchema = new Schema({ 
    name: {
        type: String,
        required: [true, "Nazwa punkty musi zostać określona"],
        min: [5, "Nazwa punktu musi mieć przynajmniej 5 znaków"],
        max: [500, `Opis przekroczył maksymalna ilośc znaków. (500)}`],
    },
    type:{
        type: String,
        enum: waypointType,
        default: waypointType.text
    },
    coords: {
        label: {
            type: String,
            required: [true, `Punkt nie posiada etykiety`]
        },
        lat: {
           type: Number,
           required: [true, "Punkt nie posiada szerokości geograficznej"] 
        },
        att: {
            type: Number,
            required: [true, `Punkt nie posiada wysokości geograficznej`] ,
            
         },
         radius: {
            type: Number,
            max: [10000, `Zasięg punktu może wynosić maksymalnie 10km.`],
            min: [1, `Zasięg punktu musi wynosic przynajmniej 1m`],
            default: 5000
        },
        
    },
    payload: {
        type: String,
        required: [true, "Nie załadowano kontentu zagadki"]
    },
    explenation: {
        type: String,
        required: [true, "Nie podano wyjaśnienia zagadki"],
        select: false,
        max: [500, `Wyjasnienie  przekroczyło maksymalna ilośc znaków. (500)}`],
    },
    trackId: {
        type: mongoose.Types.ObjectId,
        ref: "Tracks",
        required: [true,"Nie podano id ścieżki do której chcesz dodać punkt"],
        immutable: [true, "Nie można zmienić id ścieżki przy edycji punktu"],
        validate: {
            validator: async function(v:ObjectId){
                const doc = await TrackModel.findById(v);
                if(!doc)
                    return false
            },
            message: "Podana trasa nie istnieje"
        }, 
    }    
})
// waypointSchema.path("trackId", function(v:ObjectId){

// })

const WaypointModel = model('Waypoints', waypointSchema);
export default WaypointModel; 