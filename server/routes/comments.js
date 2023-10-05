
import express from "express";
import  {comments ,addComment, deleteComment, getComment }from "../controllers/comments.js";
import { verifyToken } from "../verifyToken.js";

const commentsRouter = express.Router()

commentsRouter.post( '/', verifyToken, addComment)
commentsRouter.delete('/:id',verifyToken,deleteComment)
commentsRouter.get('/:videoId',getComment)

export default commentsRouter;