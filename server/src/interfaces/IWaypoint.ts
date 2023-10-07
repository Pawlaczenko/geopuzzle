import { waypointType } from "../types/waypointsDiff.js"
import mongoose from "mongoose"

export interface Waypoint{ 
    name: string,
    type: waypointType
    coords: {
        label: string,
        lat: number,
        att: number
        
    },
    radius?: number,
    payload: string
    explenation?: string,
    trackId: mongoose.Types.ObjectId
}