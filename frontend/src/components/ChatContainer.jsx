import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {

  const {messages, selectedUser, setSelectedUser, sendMessages, getMessages }=useContext(ChatContext)
  const {authUser,onlineUsers }=useContext(AuthContext)

  const [input,setInput]=useState('')

  const scrollEnd = useRef();

  const handleSendMessage =async(e)=>{
    e.preventDefault()

    if(input.trim()==="") return null
    await sendMessages({text:input.trim()})
    setInput("")
  }

  // ---------------function to handle send image ------------------------------------------------------
  const handleSendImage=async(e)=>{
    const file = e.target.files[0]

    if(!file || !file.type.startsWith("image/")){
      toast.error("select an image file")
      return;
    }

    const reader =new FileReader()
    reader.onloadend=async()=>{
      await sendMessages({image : reader.result})
      e.target.value=""
    }

    reader.readAsDataURL(file)
  }

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  useEffect(() => {
  setTimeout(() => {
    if(scrollEnd.current && messages){
      scrollEnd.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, 0);
}, [selectedUser, messages]);

  return selectedUser ? (
    <div className='h-full relative overflow-scroll backdrop-blur-lg'>

      {/* header */}
      <div className='flex items-center py-3 gap-3 mx-4 border-b border-stone-500'>

        <img src={selectedUser.profilePic ||assets.avatar_icon} alt="" className='w-8 rounded-full' />

        <p className='flex-1 text-lg flex items-center gap-2 text-gray-800'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id)}
          <span className='w-2 h-2 bg-green-500 rounded-full'></span>
        </p>

        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        
        <HiOutlineInformationCircle
          size={22}
          className="cursor-pointer text-black"
        />
      </div>

      {/* chatting area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end justify-end gap-2 ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            {
              msg.image ? (
                <img src={msg.image} alt="" className='max-w-57.5 border border-gray-700 rounded-lg overflow-hidden mb-8' />
              ) : (
                <p className={`p-2 max-w-50 md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500 text-white ${msg.senderId !== authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
              )}

            <div className='text-center text-xs'>
              <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full' />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/*--------------------------------- Bottom Area------------------------------------------------------  */}

      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center px-3 rounded-full bg-gray-300'>
          <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={(e)=> e.key==="Enter" ? handleSendMessage(e) : null}
          type="text" placeholder='Message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-gray-900 placeholder-gray-700' />
          <input
          onChange={handleSendImage}
           type='file' id='image' accept='image/png, image/jpeg ,image/jpg' hidden />

          <label htmlFor="image">
            <HiOutlinePhotograph
              size={22}
              className="cursor-pointer text-black"
            />
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-7 cursor-pointer' />
      </div>
    </div>
  ) : (
    // user not selected not rendering chat area just showing chat logo 
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-gray-800' >Chat anytime,anywhere</p>
    </div>
  )
}

export default ChatContainer
