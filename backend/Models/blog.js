import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    tags: [String],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    commentsCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Blogs = mongoose.model('Blogs', blogSchema)
export default Blogs;