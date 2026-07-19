import express from "express"
import { protectRoute } from "../middleware/auth.js";
import {CreateBlog,updateBlog, deleteBlog, getallBlogs, toggleLikeBlog } from "../controllers/blogController.js";

const blogrouter= express.Router();

blogrouter.post("/createBlog",protectRoute,CreateBlog)
blogrouter.get("/getAllBlogs",protectRoute,getallBlogs)
blogrouter.put("/updateBlog/:blogId",protectRoute,updateBlog)
blogrouter.put("/toggleLike/:blogId",protectRoute,toggleLikeBlog)
blogrouter.delete("/deleteBlog/:blogId",protectRoute,deleteBlog)

export default blogrouter