import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='pb-5'>
                <div className='flex justify-between items-center'>

                    <img src={assets.logo} alt="logo" className='max-w-40' />

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
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border-gray-800 border-2 mr-5">
                    <HiOutlineSearch
                        size={20}
                        className="text-gray-800"
                    />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="bg-transparent outline-none text-gray-800 placeholder-gray-800"
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
