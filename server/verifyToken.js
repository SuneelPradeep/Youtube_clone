import jwt from "jsonwebtoken";
import { createError  } from "./error.js";

export const verifyToken = (req,res,next)=>{
     console.log('the token is',req.params, req.body ,req.cookies);
     const token = req.cookies.access_token
     if(!token) return next(createError(401,'User not authenticated'))

     jwt.verify(token, process.env.JWT_KEY, (err,user)=>{
        if(err) return next.createError(403,'Token is not valid')
        req.user = user;
        next()        // this is middleware so this checks everything and tells to continue
      })
     //console.log('the res jwt is ',res);
}