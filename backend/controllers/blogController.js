import { extractTags } from "../lib/utils.js";
import Blogs from "../Models/blog.js"
import cloudinary from "../lib/cloudinary.js"
import { io, userSocketMap } from "../app.js";


export const CreateBlog = async (req, res) => {
    try {
        const { title, content, coverImage } = req.body;
        const author = req.user._id;
        if (!title || !content) {
            return res.json({
                success: false,
                message: "Title and content are required."
            });
        }
        const tags = extractTags(content);

        let newBlog;
        if (!coverImage) {

            newBlog = await Blogs.create({ title, content, tags, author })

        } else {

            const upload = await cloudinary.uploader.upload(coverImage, {
                folder: "blog_covers",
                resource_type: "image",
            });

            newBlog = await Blogs.create({ title, content, tags, author, coverImage: { url: upload.secure_url, public_id: upload.public_id } })

        }
        for (const userId in userSocketMap) {
            if (userId !== author.toString()) {
                io.to(userSocketMap[userId]).emit("newBlogCreated");
            }
        }
        return res.json({ success: true, blog: newBlog })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
//-----------------------------get all blog-------------------------------------------

export const getallBlogs = async (req, res) => {
    try {
        const AllBlogs = await Blogs.find()
            .populate("author", "fullName profilePic")
            .sort({ createdAt: -1 });

        return res.json({ success: true, blogs: AllBlogs })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
//----------------------------- post update blog-------------------------------------------

export const updateBlog = async (req, res) => {
    try {

        const oldBlog = await Blogs.findById(blogId)
        if (!oldBlog) {
            return res.json({
                success: false,
                message: "original blog not found"
            })
        }

        // only authorized person should delete his blog
        if (oldBlog.author.toString() !== req.user._id.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized"
            });
        }

        const { title, content, coverImage } = req.body;
        const blogId = req.params.blogId;
        if (!title || !content) {
            return res.json({
                success: false,
                message: "Title and content are required."
            });
        }
        const tags = extractTags(content);

        let updatedBlog;
        if (!coverImage) {

            updatedBlog = await Blogs.findByIdAndUpdate(blogId, { title, content, tags }, { returnDocument: "after" })
            return res.json({ success: true, blog: updatedBlog })

        } else {

            const upload = await cloudinary.uploader.upload(coverImage, {
                folder: "blog_covers",
                resource_type: "image",
            });

            updatedBlog = await Blogs.findByIdAndUpdate(blogId, { title, content, tags, coverImage: { url: upload.secure_url, public_id: upload.public_id } }, { returnDocument: "after" })

            // after successfully uploading new image, deleting the old image, good thing to do.
            // deleting only if image existed, checked by ? operator.

            if (oldBlog.coverImage?.public_id) {
                await cloudinary.uploader.destroy(oldBlog.coverImage.public_id);
            }

            return res.json({ success: true, blog: updatedBlog })
        }

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
//-----------------------------delete blog-------------------------------------------

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blogs.findById(blogId);

        if (!blog) {
            return res.json({
                success: false,
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized to delete blog"
            });
        }

        await blog.deleteOne();

        return res.json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
//------------------------------toggle like blog ----------------------------------------------------------------------
export const toggleLikeBlog = async (req, res) => {
    try {
        const userId = req.user._id;
        const blogId = req.params.blogId;

        const blog = await Blogs.findById(blogId);

        if (!blog) {
            return res.json({
                success: false,
                message: "Blog not found"
            });
        }

        const alreadyLiked = blog.likes.some(id => id.equals(userId));

        const update = alreadyLiked
            ? { $pull: { likes: userId } }
            : { $addToSet: { likes: userId } };

        const updatedBlog = await Blogs.findByIdAndUpdate(
            blogId,
            update,
            { returnDocument:"after" }
        ).populate("author", "fullName profilePic");

        return res.json({
            success: true,
            blog: updatedBlog,
            message: alreadyLiked ? "Blog unliked" : "Blog liked"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};