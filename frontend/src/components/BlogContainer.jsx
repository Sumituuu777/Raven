import React, { useContext } from "react";
import { BlogContext } from "../../context/blogContext";
import BlogList from "./Bloglist";
import AddBlog from "./addBlog";


const BlogContainer = () => {

    const { setCreateBlogState, createBlogState } = useContext(BlogContext)  

    return (
        <>
            {createBlogState==="blogList" && <BlogList/>}

            {createBlogState==="createblog" && <AddBlog/>}
        </>
    )
        
};

export default BlogContainer;