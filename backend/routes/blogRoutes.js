import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { getCreateBlog, getUpdateBlog, postCreateBlog, postUpdateBlog } from "../controllers/blogController.js";

const blogrouter= express.Router();

blogrouter.get("/createBlog",protectRoute,getCreateBlog)
blogrouter.post("/createBlog",protectRoute,postCreateBlog)
blogrouter.get("/updateBlog/:blogId",protectRoute,getUpdateBlog)
blogrouter.post("/updateBlog/:blogId",protectRoute,postUpdateBlog)
blogrouter.get("/deleteBlog/:blogId",protectRoute,getCreateBlog)

export default blogrouter