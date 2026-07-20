import Comments from "../Models/comment.js"


//-----------------------------add or  create comment-------------------------------------------

export const addComment = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const user = req.user._id;
        const { text } = req.body;
        if (!text) {
            return res.json({
                success: false,
                message: "Text is required."
            });
        }
        const newComment = await Comments.create({ text, user, blog: blogId })
        await Blogs.findByIdAndUpdate(blogId, {
            $inc: { commentsCount: 1 }
        });
        return res.json({ success: true, comment: newComment })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
//-----------------------------get  comment-------------------------------------------

export const getComments = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const comments = await Comments.find({ blog: blogId })
            .populate("user", "fullName profilePic")
            .sort({ createdAt: -1 })

        return res.json({ success: true, comments })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
//-----------------------------get update comment-------------------------------------------

export const updateComment = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
//----------------------------- delete Comment (by comment owner only)-------------------------------------------

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comments.findById(commentId);

        if (!comment) {
            return res.json({
                success: false,
                message: "comment not found."
            });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized to delete comment"
            });
        }
        await Blogs.findByIdAndUpdate(comment.blog, {
            $inc: { commentsCount: -1 }
        });
        await comment.deleteOne();

        return res.json({
            success: true,
            message: "comment deleted successfully"
        });
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
