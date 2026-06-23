import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='border w-full h-screen sm:px-[10%] sm:py-[3%]'>
      <div className='backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full relative md:grid md:grid-cols-[2fr_3fr]'>

        {/* Mobile View */}
        <div className='md:hidden h-full'>
          {selectedUser ? <ChatContainer /> : <Sidebar />}
        </div>

        {/* Desktop View */}
        <div className='hidden md:contents'>
          <Sidebar />
          <ChatContainer />
        </div>

      </div>
    </div>
  )
}

export default HomePage
