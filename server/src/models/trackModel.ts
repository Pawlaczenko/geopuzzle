import mongoose from "mongoose";
import {ITrack} from "../interfaces/ITrack.js";

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Maksymalna długość nazwy trasy wynosi 50 znaków"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Maksymalna długość opsisu trasy to 500 znaków"]
    },
    tags: {
        type: [String],
        validate: [(val:[String])=>val.length <= 2, "Nie można podać więcej niż 10 tagów"]
    },
    author: {
        //placeholder for users
        type: String,
        // required: true
    },
    timestamps:{
        createdAt: {
            type: Date,
            default: Date.now(),
            max: [Date.now(), 'Nie możesz podać daty z przyszłości'],
        }
    },
    difficulty: {
        type: String,
        default: null,
        enum: ['Łatwy', 'Średni', 'Wysoki']
    }
    
});

const Track = mongoose.model<ITrack>('Track', trackSchema);
export default Track; 
