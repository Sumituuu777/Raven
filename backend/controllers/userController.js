import { generateToken } from "../lib/utils.js";
import User from "../Models/user.js";
import bcrypt from "bcryptjs"


export const signUp=async (req,res)=>{
    const { fullName,email,password,bio}=req.body;
    try{

        if(!fullName || !email || !password || !bio){
            return res.json({success:false,message:"Missing details"})
        } 

        const user=await User.findOne({email})

        if(user){
            return res.json({success:false,message:"Account already exists for this email"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser= User.create({fullName,email,password:hashedPassword, bio})

        const token=generateToken(newUser._id)
        
        res.json({success:true,userData:newUser,token,message:"Account created successfully"})

    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export const login=async (req,res)=>{
    const { email,password}=req.body;
    try {
        const userData=await User.findOne({email})
        const isPasswordCorrect= await bcrypt.compare(password,userData.password)

        if(!isPasswordCorrect){
            res.json({success:false,message:"Invalid credentials"})
        }

        const token=generateToken(userData._id)
        
        res.json({success:true,userData,token,message:"Login successfull"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}