import { Schema, model, InferSchemaType} from "mongoose";


const TagSchema = new Schema({
    name: {
        type: String,
        require: [true, "Jeden z tagów jest pusty"],
        max: [25, "Maksymalna ilość znaków tagu może wynieśc maksimum 25 znaków"]
        
    }
})
export type Tag = InferSchemaType<typeof TagSchema>;
export default TagSchema; 