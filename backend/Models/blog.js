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
    coverImage: String,

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

    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });