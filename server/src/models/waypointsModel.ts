import mongoose, { InferSchemaType, ObjectId, Schema, model} from "mongoose";
export const waypointSchema = new Schema({ 
    name: {
        type: String,
        required: [true, "Nazwa punkty musi zostać określona"],
        min: [5, "Nazwa punktu musi mieć przynajmniej 5 znaków"],
        max: [500, `Opis przekroczył maksymalna ilośc znaków. (500)}`],
    },
    type:{
        type: String,
        enum: ["Text", "Graphic"],
        required: [true, "Trasa musi mieć swój typ"],
        immutable: true
    },
    coords: {
        label: {
            type: String,
            required: [true, `Punkt nie posiada etykiety`]
        },
        long: {
           type: Number,
           required: [true, "Punkt nie posiada szerokości geograficznej"] ,
           min: [0, "Szerokość geograficzna nie może wynosić poniżej 0 stopni"],
           max: [360, "Szerokość geogrficzna nie moze wynosić więcej niz 360 stopni"]
        },
        latt: {
            type: Number,
            required: [true, `Punkt nie posiada długość geograficznej`] ,
            min: [-90,"Długość geograficzna nie może mieć mniej niż -90 stopni"],
            max: [90, "Długość geograficzna nie może miec wiecej niz 90 stopni"]
            
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
        max: [500, `Wyjasnienie  przekroczyło maksymalna ilośc znaków. (500)}`],
    },    
})
//TODO: 
// waypointSchema.post("validate", async (doc)=>{
//     const query =  await WaypointModel.find({trackId: doc.trackId })
//     if(query.length >= 5)
//         doc.errors = new mongoose.Error.ValidationError()
// })
export type TWaypoint = InferSchemaType<typeof waypointSchema>
const waypointModel = model('Waypoints', waypointSchema);
export default waypointModel; 