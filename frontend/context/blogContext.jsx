import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {

    const [blogs, setBlogs] = useState([]);
    const [createBlogState, setCreateBlogState] = useState("notCreate");
    const { socket, axios } = useContext(AuthContext)

    const getBlogs = async () => {
        try {
            const { data } = await axios.get("/api/blogs/getAllBlogs")

            if (data.success) {
                setMessages(data.messages)
                setBlogs(data.blogs)
            }
        } catch (error) {
            toast(error.message)
        }
    }

    const createBlog = async () => {
        try {
            await axios.post("/api/blogs/createBlog", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            toast(error.message)
        }
    }

    const value = { blogs, setBlogs, getBlogs, createBlog, createBlogState, setCreateBlogState};
    return (<BlogContext.Provider value={value}>
        {children}
    </BlogContext.Provider>)
}