import Comment from "../models/Comment.js";
import Video from '../models/Video.js'
import { createError } from "../error.js";

export const comments = (req,res)=>{
    res.send('hey there test done')
    //console.log('test successful for comments');
}
export const addComment = async(req,res,next)=>{
    try{
         const newComment = await Comment({ userId : req.user.id, ...req.query})
         const savedComm = await newComment.save()
         res.status(200).json(savedComm);  
    }catch(err){
        next(err)
    }
} 

// export const addComment = async(req,res,next)=>{
//     try{
         
//          res.status(200).send("hey");
//     }catch(err){
//         next(err)
//     }
// }

// export const addComment = async(req,res,next)=>{
//     try{
         
//          res.status(200).send("hey");
//     }catch(err){
//         next(err)
//     }
// }

export const getComment = async(req,res,next)=>{
    //console.log('the videoid',req.params.videoId);
    try{
         const comments = await Comment.find({videoId : req.params.videoId })  // this videoId from params in router see
         res.status(200).json(comments)   
    }catch(err){
        next(err)
    }
}

export const deleteComment = async(req,res,next)=>{
    // //console.log('the params andquery',req.params, req.query);
    try{
         const comment = await Comment.findById(req.params.id)
         const video = await Video.findById(req.params.id)
         if(req.user.id === comment.userId || req.user.id === video.userId)
         {
             await Comment.findByIdandDelete(req.params.id)
             res.status(200).json("deleted successfully");
         }
         else{
            return next(createError(403,"You can delete only your comment"))
         }
         //if(!comment) return next(createError(403,"Couldn't find the comment"))
         
    }catch(err){
        next(err)
    }
}
 