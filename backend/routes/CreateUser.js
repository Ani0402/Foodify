import express from "express"
import User from "../models/user.model.js";
import {body,validationResult} from 'express-validator'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const router = express.Router();
const secretKey="AnimeshDwivediDubey"
router.post('/createUser', 
  body('email').isEmail(),
  body('password','too short password length').isLength({min:4})
,async function(req, res){

   const errors=validationResult(req);
   if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
   }
 
   try{
      const {name,location,email,password}=req.body;

      const salt=await bcrypt.genSalt(10);

      const hashedPassword=await bcrypt.hash(password, salt)

      const newUser=await User.create({
         name:name,
         location:location,
         email:email,
         password:hashedPassword
      })
      newUser.save();


     res.json({success:true})
   }
   catch(error){
     console.log("Error in createUser ",error)
   }
})

router.post('/login',
body('email').isEmail(),
body('password','too short password length').isLength({min:4})
,async(req,res)=>{

  const errors=validationResult(req);
   if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
   }

   try{
     const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const pwdCompare=await bcrypt.compare(password,user.password);

    if(!pwdCompare){
      return res.status(404).json({message: "Wrong Password"});
    }
    
    const payload={
      user:{
        id: user.id,
      }
    }
    
    const token=jwt.sign(payload,secretKey)

    res.status(200).json({message: "User successfully logged in",success:true,token})
   }
   catch(error){
    console.log("Error in login",error)
   }
})


export default router;