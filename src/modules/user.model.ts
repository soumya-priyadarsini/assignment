import mongoose, {Schema} from "mongoose";

const UserSchema: Schema = new Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    image: {
        data: Buffer,
        contentType: String
    },
})
export default mongoose.model('user',UserSchema)
