import User from "../Models/user"


// get all users except logged in user
export const getUsersForSidebar=async(req,res)=>{
    try {
        const userId=req.user._id;
        const filteredUser=await User.find({_id:{$ne:userId}}).select("-password")
    } catch (error) {
        
    }
}