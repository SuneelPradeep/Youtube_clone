import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js"

export const addVideo = async(req,res,next)=>{
    const newVideo = new Video({userId : req.user.id, ...req.query})
    //console.log('the new video is',newVideo);
    try{
          const savedVideo =await newVideo.save()
          res.status(200).send(savedVideo)
    }catch(err){
        next(err)
    }
}

export const updateVideo = async(req,res,next)=>{
    try{
        const findvideo =await Video.findById(req.params.id)
        if(!findvideo) return next(createError(404,'Video not found'))
        if(req.user.id === videoRouter.userId){
             const updateduser = await Video.findByIdAndUpdate(req.params.id, {
                $set : req.query
             },{new: true})
             res.status(200).json(updateduser)
        }
       
  }catch(err){
    return next(createError(403,'you can only update your video'))
  }
}
export const deleteVideo = async(req,res,next)=>{
    try{
        const findvideo =await Video.findById(req.params.id)
        if(!findvideo) return next(createError(404,'Video not found'))
        if(req.user.id === videoRouter.userId){
             const updateduser = await Video.findByIdAndDelete(req.params.id)               
             res.status(200).json('video has been deleted')
        }
       
  }catch(err){
    return next(err)
  }
}
export const getVideo = async(req,res,next)=>{
    try{
        const findvideo =await Video.findById(req.params.id)
        if(!findvideo) return next(createError(404,'Video not found'))
        res.status(200).json(findvideo)
        
       
  }catch(err){
    return next(err)
  }
}
export const addView = async(req,res,next)=>{
    try{
        const findvideo =await Video.findById(req.params.id)
        if(!findvideo) return next(createError(404,'Video not found'))
        const updatedview = await Video.findByIdAndUpdate(req.params.id, {
            $inc : {views :1}
        })
        res.status(200).json(updatedview)
        
       
  }catch(err){ 
    return next(err)
  }
}
export const random = async(req,res,next)=>{
    try{
      console.log('cookie in server is',req.cookie);
        const randvid = await Video.aggregate([{ $sample : {size: 40}}])
        res.status(200).send(randvid)
       
  }catch(err){
    return next(err)
  }
}

export const trend = async(req,res,next)=>{
    try{
        const videos =await Video.find().sort({views : -1})   // if 1 means less vided vidoes and if -1 means more viewed vidoeds
         res.status(200).json(videos)
        
       
  }catch(err){
    return next(err)
  }
}

export const subscribe= async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id)
        const subchannels = user.subUsers;
                     // promised loop so it finds every video of channels
        const list = await Promise.all(
            subchannels.map((chnlId)=>{
                 return Video.find({userId: chnlId})}
        )) 
        res.status(200).send(list.flat().sort((a,b)=> b.createdAt - a.createdAt))   
       
  }catch(err){
    return next(err)
  } 

}

export const getByTags= async(req,res,next)=>{
  const tags = req.query.tags.split(',');
  ////console.log('the tags are',tags); 
  try{
    const videos = await Video.find({tags : {$in :tags}}).limit(20)  // in checks inside arrays if its in or not
    res.status(200).json(videos) 
    }catch(err){ 
return next(err) 
} 
}
export const search= async(req,res,next)=>{
  const query = req.query.q
  try{
    const videos =await Video.find({title : {$regex : query , $options : "i"}})  // i shows no lower upper case and regex searches everythig in title
     res.status(200).json(videos)
    
   
}catch(err){
return next(err)
}

}