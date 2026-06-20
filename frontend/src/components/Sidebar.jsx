import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate()
    return (
        <div className='bg-[rgb(255,255,255)]'>
            <div className='pb-5'>
                <div className='flex justify-between items-center'>

                    <img src={assets.logo} alt="logo" className='max-w-40'/>

                    <div className='relative py-2 group'>

                        <HiOutlineDotsVertical
                            size={22}
                            className="cursor-pointer text-black mr-5"
                        />

                        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md border border-gray-600 text-gray-100 hidden group-hover:block bg-[#1a1a1a]'>

                            <p className='cursor-pointer text-sm' onClick={() => navigate('/profile')}>Edit profile</p>

                            <hr className='my-2 border-t border-gray-500' />

                            <p className='cursor-pointer text-sm'>Logout</p>

                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 border-gray-300 hover:border-gray-700 border-2 mx-3">
                    <HiOutlineSearch
                        size={20}
                        className="text-gray-800 cursor-pointer"
                    />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-800"
                    />
                </div>
            </div>
            <div className='flex flex-col'>
                {userDummyData.map((user,index)=>(
                    <div onClick={()=>{setSelectedUser(user)}} key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-gray-300'}`}>
                        <img src={user?.profilePic || assets.avatar_icon} alt="userpic" 
                        className='w-8.75 aspect-square rounded-full'/>
                        <div className='flex flex-col leading-5'>
                            <p>{user.fullName}</p>
                            {
                                index<3
                                ? <span className=' text-green-400 text-xs'>Online</span>
                                :<span className='text-gray-400 text-xs'>Offline</span>
                            }
                        </div>
                        {index>2 && <p className='absolute top-4 right-4 text-xs w-5 h-5 flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Sidebar
