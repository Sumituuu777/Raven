import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='h-screen flex items-center justify-center p-2 sm:px-[10%] sm:py-[3%] overflow-hidden'>

  <div className='backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[85dvh] w-full md:h-full md:grid md:grid-cols-[2fr_3fr]'>

    {/* Mobile */}
    <div className='md:hidden h-full'>
      {selectedUser ? <ChatContainer /> : <Sidebar />}
    </div>

    {/* Desktop */}
    <div className='hidden md:contents'>
      <Sidebar />
      <ChatContainer />
    </div>

  </div>

</div>
  )
}

export default HomePage
