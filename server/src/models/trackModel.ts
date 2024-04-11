import mongoose, {  InferSchemaType, Schema, model} from "mongoose";;
import AppError from "../utils/appError.js";
import { waypointSchema } from "./waypointsModel.js";
import scoreboardModel from "./scoreboardModel.js";
import { unlink } from "fs";


export const trackSchema = new Schema({
    name:{
        type: String,
        required: [true, "Trasa musi posiadać swoją nazwę"],
        trim: true,
        maxLength: [75, "Maksymalna dlugosc nazwy trasy wynosi 75 znakow"],
        minLength: [5, "Minimalna długość nazwy trasy wynosi 10 znaków"]

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
        type: [String]        
    },
    isActive: {
        type: Boolean,
        default: false,    
    },
    userId: {
        type:mongoose.Types.ObjectId,
        ref: "Users",
        required: [true, "Brakuje informacji o uzytkowniku"]
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}})

export type TTrack = InferSchemaType<typeof trackSchema>

trackSchema.pre("findOneAndDelete", async function(next) {
    const doc = await trackModel.findById(this.getQuery()._id);
    if(!doc)
        return next();
    await scoreboardModel.deleteMany({trackId: doc._id});
    if(!doc.thumbnail.includes(process.env.TRACK_DEFAULT_THUMBNAIL!))
        await unlink(`public${doc.thumbnail}`, err=>{});
    next();
});

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
trackSchema.pre("save", async function(this,next){
    const doc = await scoreboardModel.find({trackId: this._id});
    if(doc.length > 0)
        next(new AppError("Nie mozna edytować trasy która ma wyniki", 400))
    next();
})
trackSchema.virtual("replays", {
    ref: 'Scoreboard',
    localField: '_id',
    foreignField: 'trackId',
    count: true
});
const trackModel = model<TTrack>('Tracks', trackSchema);
export default trackModel; 