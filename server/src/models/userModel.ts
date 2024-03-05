import mongoose, { HydratedDocument, InferSchemaType, ObjectId, Schema, model} from "mongoose";
export const userSchema = new Schema({ 
   
    providerId: {
        type: String,
        required: [true, "GoogleId musi byc okreslone"],
    },

    provider: {
        type: String,
        enum: "google",
    },
    name: {
        type: String,
        
    },
    picture: {
        type: String
    }
       
}, {_id: true})
//TODO: 

export type TUser = HydratedDocument<InferSchemaType<typeof userSchema>> 
const userModel = model('Users', userSchema);
export default userModel; 