import mongoose from "mongoose"
const VideoSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,       
}
    ,
   title: {
    type:String,
    required:true,
   },
   descr : {
    type: String
   },
   imgUrl : {
    type : String
   },
   videoUrl : {
    type:String,
    required:true
   },
   views : {
    type:Number,
    default:0
   },
   tags:{
    type:[String],
    default : []
   },
   likes:{
    type:[String],
    default : []
   },
   dislikes:{
    type:[String],
    default : []
   },
   createdAt : {
    type: String,
    
   }
},
    {timeStamps : true}
)

export default mongoose.model("Video",VideoSchema);


