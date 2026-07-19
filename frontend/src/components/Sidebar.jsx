import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
    const navigate = useNavigate()

    const {
        getUsers,
        selectedUser,
        setSelectedUser,
        users,
        unseenMessages,
        setUnseenMessages,
        setActiveView,
        activeView
    } = useContext(ChatContext)

    const { logout, onlineUsers } = useContext(AuthContext)

    const [input, setInput] = useState("")
    const [showMenu, setShowMenu] = useState(false)

    const filteredUsers = input
        ? users.filter((user) =>
            user.fullName?.toLowerCase().includes(input.toLowerCase())
        )
        : users

    useEffect(() => {
        getUsers()
    }, [onlineUsers])

    useEffect(() => {
        const handleClickOutside = () => {
            setShowMenu(false)
        }

        if (showMenu) {
            document.addEventListener("click", handleClickOutside)
        }

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [showMenu])

    return (
        <div className="bg-white h-full flex flex-col">

            {/* ================= HEADER (Fixed) ================= */}
            <div className="shrink-0">
                <div className='p-3 pb-4'>
                    <div className='flex justify-between items-center'>

                        <img
                            src={assets.logo}
                            alt="logo"
                            className='max-w-40'
                        />

                        <div className='relative py-2'>

                            <HiOutlineDotsVertical
                                size={22}
                                className="cursor-pointer text-black mr-5"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowMenu(prev => !prev)
                                }}
                            />

                            {showMenu && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className='absolute top-full right-0 z-20 w-32 p-4 rounded-md border border-gray-600 text-gray-100 bg-[#1a1a1a]'
                                >
                                    <p
                                        className='cursor-pointer text-sm'
                                        onClick={() => {
                                            setShowMenu(false)
                                            navigate('/profile')
                                        }}
                                    >
                                        Edit profile
                                    </p>

                                    <hr className='my-2 border-t border-gray-500' />

                                    <p
                                        onClick={() => {
                                            setShowMenu(false)
                                            logout()
                                        }}
                                        className='cursor-pointer text-sm'
                                    >
                                        Logout
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="flex items-center mt-2 gap-2 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 border-gray-300 hover:border-gray-700 border-2 mx-3">
                        <HiOutlineSearch
                            size={20}
                            className="text-gray-800 cursor-pointer"
                        />

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-800"
                        />
                    </div>
                </div>
            </div>

            {/* ================= USERS (Scrollable) ================= */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className='flex flex-col'>
                    {filteredUsers.map((user, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectedUser(user)
                                setActiveView("chat")
                                setUnseenMessages((prev) => ({
                                    ...prev,
                                    [user._id]: 0
                                }))
                            }}
                            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id
                                    ? 'bg-gray-300'
                                    : ''
                                }`}
                        >
                            {user?.profilePic ? (
                                <img
                                src={user?.profilePic || assets.avatar_icon}
                                alt="userpic"
                                className='w-8.75 aspect-square rounded-full'
                            />
                            ):(
                                <div className="w-8.75 aspect-square rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-[20px]">
                                    {user.fullName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            

                            <div className='flex flex-col leading-5'>
                                <p>{user.fullName}</p>

                                {onlineUsers.includes(user._id) ? (
                                    <span className='text-green-400 text-xs'>
                                        Online
                                    </span>
                                ) : (
                                    <span className='text-gray-400 text-xs'>
                                        Offline
                                    </span>
                                )}
                            </div>

                            {Number(unseenMessages?.[user._id]) > 0 && (
                                <p className='absolute top-4 right-4 text-xs w-5 h-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                                    {unseenMessages[user._id]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= BLOGS BUTTON (Fixed) ================= */}
            <div className="shrink-0 p-3 border-t border-gray-200 bg-white">
                <button
                    onClick={() =>{
                        setSelectedUser(null);
                        setActiveView("blogs");
                    }}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-violet-500 to-violet-600 text-white font-semibold shadow-lg hover:from-violet-600 hover:to-violet-700 transition-all duration-200"
                >
                    📖 Blogs
                </button>
            </div>

        </div>
    )
}

export default Sidebar
