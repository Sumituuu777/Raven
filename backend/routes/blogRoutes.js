import express from "express"
import { protectRoute } from "../middleware/auth.js";
import {CreateBlog,updateBlog, deleteBlog, getallBlogs } from "../controllers/blogController.js";

const blogrouter= express.Router();

blogrouter.post("/createBlog",protectRoute,CreateBlog)
blogrouter.get("/getAllBlogs/",protectRoute,getallBlogs)
blogrouter.put("/updateBlog/:blogId",protectRoute,updateBlog)
blogrouter.delete("/deleteBlog/:blogId",protectRoute,deleteBlog)

export default blogrouter