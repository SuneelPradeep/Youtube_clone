import mongoose from "mongoose"
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    }
    ,
    email:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
    },
    img : {
        type:String
    },
    subscribers: {
        type: Number,
        default:0
    },
    fromGoogle : {
       type : Boolean,
       default : false
    },
    subUsers : {
        type: [String],

    },},
    {timeStamps : true}
)

export default mongoose.model("User",UserSchema);


