import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'
import BlogContainer from '../components/BlogContainer'

const HomePage = () => {

  const { selectedUser, activeView } = useContext(ChatContext)

  return (
    <div className='h-screen flex items-center justify-center p-2 sm:px-[10%] sm:py-[3%] overflow-hidden'>

      <div className='backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[95dvh] w-full md:h-full'>

        {/* Mobile */}
        <div className="md:hidden h-full">

          {activeView === "users" && <Sidebar />}

          {activeView === "chat" && <ChatContainer />}

          {activeView === "blogs" && <BlogContainer />}

        </div>

        {/* Desktop */}
        <div className="hidden md:flex md:h-full md:col-span-2">
          <div className="w-2/5 min-h-0 border-r border-gray-300">
            <Sidebar />
          </div>

          <div className="w-3/5 min-h-0">
            {activeView === "chat" ? (
              <ChatContainer />
            ) : (
              <BlogContainer />
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default HomePage
