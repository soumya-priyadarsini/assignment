import mongoose, {Schema} from "mongoose";

const PostSchema: Schema = new Schema({
    title:String,
    description:String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      }
    
}) 
export default mongoose.model('post',PostSchema)