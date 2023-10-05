import express from "express";
import  {signup ,signin,googlelogin} from "../controllers/auth.js";

const authRouter = express.Router()

authRouter.post('/signup',signup)
 authRouter.post('/signin',signin)
 authRouter.post('/google', googlelogin)
// authRouter.post('/google',auth)
export default authRouter;