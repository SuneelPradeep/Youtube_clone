
// export const users = (req,res)=>{
//     res.send('hey there test done')
//     //console.log('test successful for users');
// }
import User from "../models/User.js"
import { createError } from "../error.js"
import Video from "../models/Video.js"

export const allUsers = async (req,res,next)=>{
     try{
  const users = await User.find()
     res.status(200).send(users)
     }catch(err){
      next(err)
     }
}

 const UpdateReq = async (req,res,next)=>{
      if(req.params.id === req.user.id){
        //console.log('the data in update', req.params.id, req.user.id,res.body,req.query);
          try{
             let updateduser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.query
              },{new : true})
              res.status(200).json("user has been updated")
          }catch(err){
            next(err)
          }
      }
      else{
        return next(createError(403,'You can only update your account'))
      }
 }
 const GetReq = async(req,res,next)=>{
  try{
    //console.log('the get is',req.params.id);
     const user = await User.findById(req.params.id)
     res.status(200).json(user)
  }catch(err){
    next(err)
  }
 }
 const DeleteReq = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        //console.log('the data in delete', req.params.id, req.user.id,req.query);
          try{
              await User.findByIdAndDelete(req.params.id )
              res.status(200).json("user has been deleted")
          }catch(err){
            next(err)
          }
      }
      else{
        return next(createError(403,'You can only delete your account'))
      }
 
 }
 const SubReq = async (req,res,next)=>{
     try{
      await User.findByIdAndUpdate(req.user.id, { $push : {subUsers : req.params.id}})

      await User.findByIdAndUpdate(req.params.id , { $inc : {subscribers : 1}})
      res.status(200).json('Subscription done')
     }catch(err){
        next(err)
     }
 }
 const UnsubReq = async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id, { $push : {subUsers : req.params.id}})
  
        await User.findByIdAndUpdate(req.params.id , { $inc : {subscribers : -1}})
        res.status(200).json('UnSubscription done')
       }catch(err){
          next(err)
       }
 }
 const LikeReq = async (req,res,next)=>{
  console.log('the id and video in like is',req.user.id, req.params);
  const id = req.user.id;
  const videoId = req.params.videoId
  try{
      const user = await Video.findByIdAndUpdate(videoId, {
        $addToSet : {likes : id},     // not using push coz if i do when liked it creates duplicate so using addtoSet
        $pull : {dislikes : id}        // it pulls if its in likes now and removes from dislikes
      })
      res.status(200).json(user)
  }catch(err){
    next(err)
  }
 
 }
 const DislikeReq = async (req,res,next)=>{
  console.log('the id and video in dislike is',req.user.id, req.params);
  const id = req.user.id;
  const videoId = req.params.videoId
   try{
        const disliked = await Video.findByIdAndUpdate(videoId,{
          $addToSet : {dislikes : id},
          $pull : {likes : id}
        })
        res.status(200).json(disliked)
   }catch(err){
    next(err)
   }
 }
export {UpdateReq,DislikeReq,UnsubReq,LikeReq,SubReq ,GetReq ,DeleteReq  }