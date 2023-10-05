
import express from "express";
import  {addVideo , getVideo, updateVideo, deleteVideo, trend, subscribe,
     addView, random, getByTags, search } from "../controllers/video.js";
import {verifyToken} from '../verifyToken.js'
const videoRouter = express.Router()

videoRouter.post('/',verifyToken, addVideo)
videoRouter.put('/:id',verifyToken,updateVideo)
videoRouter.delete('/:id', verifyToken, deleteVideo)
videoRouter.get('/find/:id', getVideo)
videoRouter.put('/view/:id',addView)
videoRouter.get('/trends', trend)
videoRouter.get('/random',random)
videoRouter.get('/subscriptions',verifyToken,subscribe)
videoRouter.get('/tags', getByTags)
videoRouter.get('/search', search )


export default videoRouter;