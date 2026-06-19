import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  return (
    <div className='border w-full h-screen sm:px-[10%] sm:py-[3%]'>
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full   grid grid-cols-1 relative md:grid-cols-[2fr_3fr]">
        <Sidebar/>
        <ChatContainer/>
      </div>
    </div>
  )
}

export default HomePage
