import { createContext, useContext, useEffect, useState} from "react";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast";

export const ChatContext=createContext()

export const ChatProvider=({children})=>{

    const [users,setUsers]=useState([])
    const [messages,setMessages]=useState([])
    const [selectedUser,setSelectedUser]=useState(null)
    const [activeView, setActiveView] = useState("users");
    const [unseenMessages,setUnseenMessages]=useState({})

    const {socket,axios} =useContext(AuthContext)

    // function to get all the users for sidebar--------------------------------------------------
    const getUsers=async ()=>{
        try {
            const {data}= await axios.get("/api/messages/users")

            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
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
                setMessages(data.messages)
            }
        } catch (error) {
            toast(error.message)
        }
    }

    // function to send messages ----------------------------------------------------------------------------
    const sendMessages=async(messageData)=>{
        try{
            const {data } =await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages, data.newMessage])
            }else{
                toast(data.message)
            }
        }catch(error){
            toast(error.message)
        }
    }

    // function to subscribe to get the message from selected user
    const sunbscribeToMessage=async()=>{
        if(!socket) return

        socket.on("newMessage",(newMessage)=>{

            if(selectedUser && newMessage.senderId===selectedUser._id){
                newMessage.seen=true
                setMessages((prevMessages)=>[...prevMessages, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`)
            }else{
                setUnseenMessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages,[newMessage.senderId] :
                    prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId]+1 : 1

                }))
            }
        })
    }

    // function to unsubscribe from messages --------------------------------------------------------------
    const unsubscribeFromMessages=async()=>{
        if(socket) socket.off("newMessage")
    }

    useEffect(()=>{
        sunbscribeToMessage()
        return ()=> unsubscribeFromMessages()
    },[socket,selectedUser])

    const value={
        messages,users,selectedUser,getUsers,setMessages,getMessages,sendMessages,setSelectedUser,unseenMessages,setUnseenMessages,activeView,setActiveView
    }

    return (
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
    )
}