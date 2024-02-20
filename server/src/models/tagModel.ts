import { InferSchemaType,Schema , model } from 'mongoose';
export const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nazwa tagu jest pusta"],
        minlength: [3, "Tag musi posiadać przynajmniej 3 znaki"],
        maxlength: [12, "Tag może posiadać maksimum 12 naków"], 

    }
})

export type TTag = InferSchemaType<typeof tagSchema>;
export const tagModel = model<TTag>('Tags', tagSchema)