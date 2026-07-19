import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {

  const { messages, selectedUser, setSelectedUser, sendMessages, getMessages,setActiveView } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)

  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const scrollEnd = useRef();

  const handleSendMessage = async (e) => {
  e.preventDefault()

  if (sending) return

  const message = input.trim()

  if (!message) return

  try {
    setSending(true)

    await sendMessages({ text: message })

    setInput("")
  } catch (error) {
    console.log(error)
  } finally {
    setSending(false)
  }
}

  // ---------------function to handle send image ------------------------------------------------------
  const handleSendImage = async (e) => {
  if (sending) return

  const file = e.target.files[0]

  if (!file || !file.type.startsWith("image/")) {
    toast.error("select an image file")
    return
  }

  const reader = new FileReader()

  reader.onloadend = async () => {
    try {
      setSending(true)

      await sendMessages({ image: reader.result })

      e.target.value = ""
    } finally {
      setSending(false)
    }
  }

  reader.readAsDataURL(file)
}

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    setTimeout(() => {
      if (scrollEnd.current && messages) {
        scrollEnd.current?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 0);
  }, [selectedUser, messages]);

  return selectedUser ? (
    <div className='h-full flex flex-col overflow-hidden backdrop-blur-lg'>

      {/* header */}
      <div className='flex items-center py-3 gap-3 mx-4 border-b border-stone-500'>
        {selectedUser.profilePic ? (
          <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-10 aspect-square rounded-full' />
        ):(
          <div className="w-10 aspect-square rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-[20px]">
            {selectedUser?.fullName? selectedUser.fullName.charAt(0).toUpperCase() : "A"}
          </div>
        )}

        <p className='flex-1 text-lg flex items-center gap-2 text-gray-800'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 bg-green-500 rounded-full'></span>}

        </p>

        <img onClick={() => {
          setSelectedUser(null)
          setActiveView("users")
        }} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />

        <HiOutlineInformationCircle
          size={22}
          className="cursor-pointer text-black"
        />
      </div>

      {/* chatting area */}
      <div className='flex-1 flex flex-col overflow-y-auto p-3'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end justify-end gap-2 ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            {
              msg.image ? (
                <img src={msg.image} alt="" className='max-w-57.5 border border-gray-700 rounded-lg overflow-hidden mb-8' />
              ) : (
                <p className={`p-2 max-w-50 md:text-sm font-light rounded-lg mb-8 break-all bg-linear-to-r from-violet-500 to-violet-600 text-white ${msg.senderId !== authUser._id ? 'rounded-bl-none' : 'rounded-br-none'}`}>{msg.text}</p>
              )}

            <div className='text-center text-xs'>
              {msg.senderId === authUser._id ? (
                authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt=""
                    className="w-7 aspect-square rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 aspect-square rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-sm">
                    {authUser?.fullName
                      ? authUser.fullName.charAt(0).toUpperCase()
                      : "A"}
                  </div>
                )
              ) : selectedUser?.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt=""
                  className="w-7 aspect-square rounded-full object-cover"
                />
              ) : (
                <div className="w-7 aspect-square rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-sm">
                  {selectedUser?.fullName
                    ? selectedUser.fullName.charAt(0).toUpperCase()
                    : "A"}
                </div>
              )}
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/*--------------------------------- Bottom Area------------------------------------------------------  */}

      <div className='flex items-center gap-2 px-2 py-2 border-t border-gray-300 shrink-0'>

        <div className='flex-1 min-w-0 flex items-center px-3 rounded-full bg-gray-300'>

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
            type="text"
            placeholder='Message'
            className='flex-1 min-w-0 text-sm py-2 px-1 bg-transparent outline-none text-gray-900 placeholder-gray-700'
          />

          <input
            onChange={handleSendImage}
            type='file'
            id='image'
            accept='image/png,image/jpeg,image/jpg'
            hidden
          />

          <label htmlFor="image" className='shrink-0 cursor-pointer'>
            <HiOutlinePhotograph
              size={18}
              className="text-black"
            />
          </label>
        </div>

        <img
          onClick={!sending ? handleSendMessage : undefined}
          src={assets.send_button}
          alt=""
          className={`w-6 h-6 shrink-0 ${sending
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer'
            }`}
        />
      </div>
    </div>
  ) : (
    // user not selected not rendering chat area just showing chat logo 
    <div className='h-full flex flex-col items-center justify-center gap-2 text-gray-500 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-gray-800' >Chat anytime,anywhere</p>
    </div>
  )
}

export default ChatContainer
