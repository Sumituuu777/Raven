import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineEye, HiOutlineHeart, HiHeart } from "react-icons/hi";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/authContext";
import { BlogContext } from "../../context/blogContext";

const BlogList = () => {
    const { activeView, setActiveView } = useContext(ChatContext);
    const { authUser } = useContext(AuthContext);

    const { blogs, getBlogs, setCreateBlogState,toggleLike } = useContext(BlogContext);
    const [editingBlog, setEditingBlog] = useState(null);

    useEffect(() => {
        getBlogs();
    }, []);

    // formatting date of blogs 
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="h-full flex flex-col backdrop-blur-lg">

            {/* Header */}
            <div className="flex items-center py-3 gap-3 mx-4 border-b border-stone-500 shrink-0">
                {/* Back button (mobile only) */}
                <img
                    onClick={() => setActiveView("users")}
                    src={assets.arrow_icon}
                    alt=""
                    className="md:hidden max-w-7 cursor-pointer"
                />

                {/* Title */}
                <h2 className="flex-1 text-xl font-semibold text-gray-800">
                    Blogs
                </h2>

                {/* Write button */}
                <button
                    onClick={() => setCreateBlogState("createblog")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-violet-500 to-violet-600 text-white hover:opacity-90 transition cursor-pointer"
                >
                    <HiOutlinePencilAlt size={18} />
                    <span className="max-sm:hidden">Write</span>
                </button>
            </div>

            {/* Blog List Layout container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {/* Checking for empty states */}
                {blogs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No blogs published yet. Be the first to share your story!
                    </div>
                ) : (

                    blogs.map((blog) => (

                        <div
                            key={blog._id}
                            className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition gap-4"
                        >

                            {blog.coverImage?.url && (
                                <div className="w-full h-68 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                    <img
                                        src={blog.coverImage.url}
                                        alt={blog.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}

                            <div className="flex-1 flex flex-col justify-between space-y-2">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-600 mt-2 text-sm whitespace-pre-line wrap-break-word leading-relaxed">
                                        {blog.content}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-xs font-medium">
                                    {/* Left Side: Author Info */}
                                    <span className="flex items-center gap-2 text-gray-500">
                                        {blog.author?.profilePic ? (
                                            <img
                                                src={blog.author.profilePic}
                                                className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200"
                                                alt=""
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-[15px]">
                                                {blog.author?.fullName ? blog.author.fullName.charAt(0).toUpperCase() : "A"}
                                            </div>
                                        )}
                                        <span className="text-gray-700 font-semibold">
                                            {blog.author?.fullName || "Anonymous Author"}
                                        </span>
                                    </span>

                                    {/* Right Side: Views & Likes */}
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <div
                                            className="flex items-center gap-1.5 "
                                        >
                                            <HiOutlineEye className="w-5 h-5" />
                                            <span>{blog.views}</span>
                                        </div>
                                        {/* Clickable Likes Button */}
                                        <button onClick={()=>toggleLike(blog._id)}
                                            className={`flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer font-semibold ${blog.likes.includes(authUser._id) ? 'text-violet-500 hover:text-violet-600' : 'hover:text-violet-500'
                                                }`}
                                        >
                                            {blog.likes.includes(authUser._id) ? (
                                                <HiHeart className="w-5 h-5 text-violet-500 animate-heartBeat" />
                                            ) : (
                                                <HiOutlineHeart className="w-5 h-5" />
                                            )}
                                            <span>{blog.likes.length}</span>
                                        </button>
                                        <span>{formatDate(blog.createdAt)}</span>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default BlogList;