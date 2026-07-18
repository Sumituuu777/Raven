import React, { useContext } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";

const BlogContainer = () => {

    const { selectedUser, activeView, setActiveView } = useContext(ChatContext)
    // Temporary data
    const blogs = [
        {
            _id: 1,
            title: "Getting Started with Raven Blogs",
            excerpt:
                "Share your ideas, coding journey, tutorials and connect with other developers.",
            author: "Raven Team",
            date: "Today",
        },
        {
            _id: 2,
            title: "Why Real-time Apps are Awesome",
            excerpt:
                "Socket.IO makes it possible to build interactive applications with instant updates.",
            author: "John Doe",
            date: "Yesterday",
        },
        {
            _id: 3,
            title: "React Performance Tips",
            excerpt:
                "Learn simple tricks that make your React applications faster and smoother.",
            author: "Jane Smith",
            date: "2 days ago",
        },
        {
            _id: 4,
            title: "Tailwind CSS Best Practices",
            excerpt:
                "Organize your utility classes and build beautiful interfaces quickly.",
            author: "Alex",
            date: "3 days ago",
        },
    ];

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
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:opacity-90 transition"
                >
                    <HiOutlinePencilAlt size={18} />
                    <span className="max-sm:hidden">Write</span>
                </button>

            </div>

            {/* Blog List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">
                            {blog.title}
                        </h3>

                        <p className="text-gray-600 mt-2 line-clamp-2">
                            {blog.excerpt}
                        </p>

                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                            <span>{blog.author}</span>
                            <span>{blog.date}</span>
                        </div>
                    </div>
                ))}

            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 px-5 py-3 shrink-0 bg-white">
                <button className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600 transition">
                    Explore More Blogs
                </button>
            </div>

        </div>
    );
};

export default BlogContainer;