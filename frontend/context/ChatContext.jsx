import { createContext, useContext, useState} from "react";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast";

export const ChatContext=createContext()

export const chatProvider=({children})=>{

    const [users,setUsers]=useState([])
    const [message,setMessage]=useState([])
    const [selectedUser,setSelectedUser]=useState(null)
    const [unseenMessages,setUnseenMessages]=useState({})

    const {socket,axios} =useContext(AuthContext)

    // function to get all the users for sidebar--------------------------------------------------
    const getUsers=async ()=>{
        try {
            const {data}= await axios.get("/api/messages/users")

            if(data.success){
                setUsers(data.users)
                setUnSeenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast(error.message)
        }
    }

    // function to get messages for selected users-----------------------------------------------------
    const getMessages=async(userId)=>{
        try {
            const {data } =await axios.get(`/api/messages/${userId}`)

            if(data.success){
                setMessage(data.messages)
            }
        } catch (error) {
            toast(error.message)
        }
    }

    // function to send messages ----------------------------------------------------------------------------
    const sedMessages=async(messageData)=>{
        try{
            const {data } =await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
            if(data.success){
                setMessage((prevMessages)=>[...prevMessages, data.messages])
            }else{
                toast(data.message)
            }
        }catch(error){
            toast(error.message)
        }
    }
    

    const value={

    }

    return (<ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>)
}