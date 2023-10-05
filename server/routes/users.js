
import express from "express";
import  {allUsers,UpdateReq,GetReq,DeleteReq,SubReq,UnsubReq,LikeReq,DislikeReq  }from "../controllers/users.js";
import { verifyToken } from "../verifyToken.js";

const usersRouter = express.Router()
//update user

usersRouter.get('/',allUsers)

usersRouter.put("/:id", verifyToken ,UpdateReq)   

//get user
usersRouter.get('/find/:id',GetReq)


//delete user
usersRouter.delete('/:id', verifyToken , DeleteReq)

//sub user
usersRouter.put('/sub/:id',verifyToken ,  SubReq)

// unsub channel
usersRouter.put('/unsub/:id',verifyToken , UnsubReq)

//like and dislike
usersRouter.put('/like/:videoId',verifyToken ,  LikeReq)
usersRouter.put('/dislike/:videoId', verifyToken , DislikeReq)


export default usersRouter;