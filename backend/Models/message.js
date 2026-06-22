import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{required:true, type:mongoose.Schema.Types.ObjectId, ref:"User"},
    receveirId:{required:true, type:mongoose.Schema.Types.ObjectId, ref:"User"},
    text:{type:String},
    image:{type:String},
    seen:{type:Boolean, default:false},
    
},{timestamps:true})

const Message=mongoose.model('Message',messageSchema)
export default Message;