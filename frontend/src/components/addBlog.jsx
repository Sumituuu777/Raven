import React, { useState, useContext ,useEffect} from "react";
import assets from "../assets/assets";
import { BlogContext } from "../../context/blogContext";

const AddBlog = () => {
    // FIX: Destructure createBlog here
    const {createBlog,updateBlog,editingBlog, setEditingBlog, setCreateBlogState} = useContext(BlogContext);

    const [title, setTitle] = useState(editingBlog?.title || "");
    const [content, setContent] = useState(editingBlog?.content || "");
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState(
        editingBlog?.coverImage?.url || ""
    );
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editingBlog) {
            setTitle(editingBlog.title);
            setContent(editingBlog.content);
            setPreview(editingBlog.coverImage?.url || "");
            setCoverImage(null);
        }
    }, [editingBlog]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }

        // Turn loading indicator on and prevent double-clicks
        setIsLoading(true);

        const blogPayload = {
            title,
            content,
            coverImage: null
        };

        try {
            const saveBlog = async () => {
                if (editingBlog) {
                    await updateBlog(editingBlog._id, blogPayload);
                } else {
                    await createBlog(blogPayload);
                }

                setEditingBlog(null);
                setCreateBlogState("blogList");
            };

            if (coverImage) {
                const reader = new FileReader();

                reader.readAsDataURL(coverImage);

                reader.onloadend = async () => {
                    blogPayload.coverImage = reader.result;

                    try {
                        await saveBlog();
                    } finally {
                        setIsLoading(false);
                    }
                };
            } else {

                await saveBlog();
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-200">
            {/* Header */}
            <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
                <img
                    src={assets.arrow_icon}
                    onClick={() => setCreateBlogState("blogList")}
                    className="w-7 cursor-pointer"
                    alt="Back"
                />
                <h2 className="text-xl font-semibold flex-1">{editingBlog ? "Edit Blog" : "Write Blog"}</h2>
            </div>

            <form onSubmit={submitHandler} className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Image Picker */}
                <div className="flex flex-col gap-2 max-w-md">
                    <span className="font-semibold text-gray-700 text-sm">Cover Image</span>
                    <label className="relative flex flex-col items-center justify-center w-full min-h-52 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-violet-500 transition-colors group overflow-hidden">
                        {preview ? (
                            <img src={preview} className="absolute inset-0 h-full w-full object-cover rounded-xl" alt="Preview" />
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                <svg className="w-10 h-10 mb-3 text-gray-400 group-hover:text-violet-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <p className="mb-1 text-sm text-gray-500"><span className="font-semibold text-violet-500">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-400">PNG, JPG, or JPEG up to 10MB</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setCoverImage(file);
                                setPreview(URL.createObjectURL(file));
                            }}
                        />
                    </label>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-gray-700 text-sm">Title</label>
                    <input
                        type="text"
                        placeholder="Give your blog a catchy title..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white placeholder-gray-400 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-gray-700 text-sm">Content</label>
                    <textarea
                        rows={12}
                        placeholder="Write your story here..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white placeholder-gray-400 resize-none outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                {/* Submit */}
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-sm transition-all text-center focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
                    ${isLoading
                            ? 'bg-violet-400 cursor-not-allowed opacity-80'
                            : 'bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 active:bg-violet-700 cursor-pointer'
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            {/* Simple Inline SVG Spinner */}
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {editingBlog ? "Updating..." : "Publishing..."}
                        </span>
                    ) : (
                        editingBlog ? "Update Blog" : "Publish Blog"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddBlog;