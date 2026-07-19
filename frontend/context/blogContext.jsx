import { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./authContext";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [createBlogState, setCreateBlogState] = useState("blogList");
    
    // Pull the active socket connection from your AuthContext
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

    // FIX: Listen for real-time updates from other users
    useEffect(() => {
        if (!socket) return;

        // When another user posts, the backend tells the socket loop to run this
        const handleNewBlog = () => {
            getBlogs(); // Pull the fresh database list (which has fully populated author fields!)
            toast("New blog post available!", { icon: "📝" });
        };

        socket.on("newBlogCreated", handleNewBlog);

        // Cleanup the listener when the component unmounts to prevent memory leaks
        return () => {
            socket.off("newBlogCreated", handleNewBlog);
        };
    }, [socket]); // Re-run if the socket instance changes (e.g., user logs out/in)

    const createBlog = async (blogData) => {
        try {
            const { data } = await axios.post("/api/blogs/createBlog", blogData);
            
            if (data.success) {
                toast.success("Blog published successfully!");
                // For the author, we fetch immediately to sync local state
                getBlogs(); 
                setCreateBlogState("blogList");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const value = { blogs, setBlogs, getBlogs, createBlog, createBlogState, setCreateBlogState };
    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};