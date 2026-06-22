import Message from "../Models/message";
import User from "../Models/user"


// get all users except logged in user
export const getUsersForSidebar=async(req,res)=>{
    try {
        const userId=req.user._id;
        const filteredUser=await User.find({_id:{$ne:userId}}).select("-password")

        // count the no of message not seen 
        const unseenMessages={}
        const promises= filteredUser.map( async (user)=>{
            const message= await Message.find({senderId:user._id , receveirId:userId,seen:false})
            if(message>0){
                unseenMessages[user._id]=message.length
            }
        })
        await Promise.all(promises)
        res.json({success:true, users:filteredUser,unseenMessages})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}

// get all messages from selected users

export const getMessages=async (req,res)=>{
    try {
        const { id:selectedUserId}=req.params
        const myId =req.user._id

        const messages=await Message.find({
            $or:[
                {senderId:myId, receveirId:selectedUserId},
                {senderId:selectedUserId, receveirId:myId}
            ]
        })
        await Message.updateMany({senderId:selectedUserId,receveirId:myId},{seen:true})

        res.json({success:true, messages})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}
// Api to mark message as seen using message id 

export const markMessageSeen=async(req,res)=>{
    try {
        const {id}=req.params;
        await Message.findByIdAndUpdate(id, {seen:true})

        res.json({success:true})
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}