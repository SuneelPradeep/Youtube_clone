import mongoose from "mongoose"
const CommentSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    videoId : {
        type:String,
        required:true
    },
    descr :{
        type: String,
        required:true
    }  
},
    {timeStamps : true}
)

export default mongoose.model("Comment",CommentSchema);


