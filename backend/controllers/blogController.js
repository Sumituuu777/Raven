import { extractTags } from "../lib/utils";
import Blogs from "../Models/blog.js"


export const CreateBlog = async (req, res) => {
    try {
        const { title, content, coverImage } = req.body;
        const author = req.user._id;
        const tags = extractTags(content);

        let newblog;
        if (!coverImage) {

            newBlog = await Blogs.create({ title, content, tags, author })
            res.json({ success: true, blog: newBlog })
        } else {
            console.log("Profile pic starts with:", profilePic.substring(0, 50));
            const upload = await cloudinary.uploader.upload(coverImage, {
                folder: "blog_covers",
                resource_type: "image",
            });

            newBlog = await Blogs.create({ title, content, tags, author, coverImage: { url: upload.secure_url, public_id: upload.public_id } })
            res.json({ success: true, blog: newBlog })
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
//-----------------------------get update blog-------------------------------------------

export const getallBlogs = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
//----------------------------- post update blog-------------------------------------------

export const updateBlog = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
//-----------------------------delete blog-------------------------------------------

export const deleteBlog = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}