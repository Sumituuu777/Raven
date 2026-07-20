import { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./authContext";

export const CommentContext=createContext();

export const CommentProvider=({children})=>{
    const [allComments, setAllComments] = useState([]);
    const [openComments, setOpenComments] = useState(false);
    const { socket, axios } = useContext(AuthContext);

//---------------------------------------get Blogs ------------------------------------------------------

    const getComments = async (blogId) => {
        try {
            const { data } = await axios.get(`/api/comments/getcomments/${blogId}`);
            if (data.success) {
                setAllComments(data.comments);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

//-------------------------------------------------create Comment-------------------------------------------------------

    const createComment = async (commentData,blogId) => {
        try {
            const { data } = await axios.post(`/api/comments/addcomment/${blogId}`, commentData);
            
            if (data.success) {
                toast.success("Comment added successfully!");
                // For the comment creator, we fetch immediately to sync local state
                getComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

//--------------------------------------------delete Comment--------------------------------------------------------

    const deleteComment = async (commentId) => {
        try {
            const { data } = await axios.delete(`/api/comments/deletecomment/${commentId}`);

            if (!data.success) {
                return toast.error(data.message);
            }

            setAllComments(prev => prev.filter(comment => comment._id !== commentId));

            toast.success(data.message);

        } catch (error) {
            toast.error(error.message);
        }
    };
    const value={
        getComments,openComments,setOpenComments,deleteComment,createComment,allComments,setAllComments
    }
    return(
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    )
}