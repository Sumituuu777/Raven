import React, { useEffect, useState, useContext } from "react";
import assets from "../assets/assets";
import { BlogContext } from "../../context/blogContext";

const AddBlog = () => {

    const { createBlogState, setCreateBlogState} = useContext(BlogContext)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("coverImage", coverImage);

        await createBlog(formData);
    };

    return (
        <div className="h-full flex flex-col">

            {/* Header */}

            <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">

                <img
                    src={assets.arrow_icon}
                    onClick={()=>setCreateBlogState("blogList")}
                    className="w-7 cursor-pointer"
                    alt=""
                />

                <h2 className="text-xl font-semibold flex-1">
                    Write Blog
                </h2>

            </div>

            <form
                onSubmit={submitHandler}
                className="flex-1 overflow-y-auto p-6 space-y-6"
            >

                {/* Image */}

                <div>

                    <label className="font-medium">
                        Cover Image
                    </label>

                    {preview && (
                        <img
                            src={preview}
                            className="h-52 w-full object-cover rounded-xl my-3"
                            alt=""
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {

                            const file = e.target.files[0];

                            if (!file) return;

                            setCoverImage(file);
                            setPreview(URL.createObjectURL(file));

                        }}
                    />

                </div>

                {/* Title */}

                <div>

                    <label className="font-medium">
                        Title
                    </label>

                    <input
                        type="text"
                        className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </div>

                {/* Content */}

                <div>

                    <label className="font-medium">
                        Content
                    </label>

                    <textarea
                        rows={15}
                        className="w-full mt-2 border rounded-lg px-4 py-3 resize-none outline-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                </div>

                <button
                    className="w-full py-3 rounded-lg bg-violet-600 text-white font-medium"
                >
                    Publish Blog
                </button>

            </form>

        </div>
    );
};

export default AddBlog;