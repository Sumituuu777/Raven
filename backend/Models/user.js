import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{required:true, type:String, unique:true},
    fullName:{required:true, type:String},
    password:{required:true, type:String, minlength:6},
    profilePic:{ type:String, default:""},
    bio:{ type:String},
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User;