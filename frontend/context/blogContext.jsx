import { useState, useContext } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./authContext";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [createBlogState, setCreateBlogState] = useState("blogList");
    const { socket, axios } = useContext(AuthContext);

    const getBlogs = async () => {
        try {
            const { data } = await axios.get("/api/blogs/getAllBlogs");
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // FIX: Accept blogData parameter and drop multipart header headers
    const createBlog = async (blogData) => {
        try {
            const { data } = await axios.post("/api/blogs/createBlog", blogData);
            
            if (data.success) {
                toast.success("Blog published successfully!");
                // Refresh list and send user back
                getBlogs(); 
                setCreateBlogState("blogList");
            } else {
                toast.error(data.message || "Failed to create blog");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const value = { blogs, setBlogs, getBlogs, createBlog, createBlogState, setCreateBlogState };
    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};