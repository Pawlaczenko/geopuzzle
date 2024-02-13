import { InferSchemaType,Schema , model } from 'mongoose';
export const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, "Tag cannot be empty"],
        minlength: ["Tag has to have at least 3 characters"],
        maxlength: ["Tag can have maximum up to 12 characters"]

    }
},{_id: false})
export type TTag = InferSchemaType<typeof tagSchema>;
export const tagModel = model<TTag>('Tags', tagSchema)