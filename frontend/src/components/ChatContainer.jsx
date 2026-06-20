import React from 'react'
import assets from '../assets/assets'

const ChatContainer = ({selectedUser,setSelectedUser}) => {
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>

      {/* header */}
      <div className='flex items-center py-3 gap-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="" className='w-8 rounded-full' />
        <p className='flex-1 text-lg flex items-center gap-2 text-gray-800'>
          Martin Jhonson
          <span className='w-2 h-2 bg-green-500 rounded-full'></span>
        </p>
        <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-w-5'/>
      </div>

      {/* chatting area */}

    </div>
  ):(
    // user not selected not rendering chat area just showing chat logo 
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-gray-800' >Chat anytime,anywhere</p>
    </div>
  )
}

export default ChatContainer
