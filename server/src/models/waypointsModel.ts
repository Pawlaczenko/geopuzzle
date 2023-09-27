import { Schema, model, InferSchemaType, Document, Model} from "mongoose";

export enum waypointType {
    text = "text",
    audio = "audio",
    graphic = "graphic"
}


export const waypointSchema = new Schema({ 
    name: {
        type: String,
        required: [true, "Nazwa punkty musi zostać określona"],
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
            required: [true, "Punkt nie posiada wysokości geograficznej"] 
         }
        
    },
    radius: {
        type: Number
    },
    explenation: String,
})
// export type Waypoint = 
const WaypointModel = model('Waypoints', waypointSchema);
export default WaypointModel; 