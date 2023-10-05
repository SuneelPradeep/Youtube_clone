import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { createError } from "../error.js"
import jwt from "jsonwebtoken"


// const auth = (req,res)=>{
//     res.send('hey there test done')
//     //console.log('test successful for auth');
// }

const signup =  async (req,res,next)=>{
    try{
    //console.log('the req is ', req.query);
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.query.password,salt)
     const newUser = new User({...req.query, password : hash })
     await newUser.save()
     res.status(200).send('user has been created')
    }catch(err){
        next(err)
            //createError(404, "Not found sorry!"))
    }  
}
const signin =  async (req,res,next)=> {
  try {
    const user = await User.findOne({ name: req.query.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.query.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    const { password, ...others } = user._doc;

    res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
}

export const googlelogin = async(req,res,next) =>{
  try {
    const user = await User.findOne({ email: req.query.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.query,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
}

export {signup,signin}

