import mongoose, { HydratedDocument, InferSchemaType, ObjectId, Schema, model} from "mongoose";
import trackModel from "./trackModel.js";
import scoreboardModel from "./scoreboardModel.js";
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
       
}, {_id: true, toJSON:{virtuals: true}})
userSchema.virtual("trackList").get(async function(){
    const docs : any = await trackModel.find({userId: this._id});
    return docs;
});
userSchema.virtual("scoreboard").get(async function(){
    const docs : any = await scoreboardModel.find({userId: this._id});
    return docs;
})

export type TUser = HydratedDocument<InferSchemaType<typeof userSchema>> 
const userModel = model('Users', userSchema);
export default userModel; 