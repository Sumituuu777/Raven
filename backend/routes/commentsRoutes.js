import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { addComment, deleteComment, getComments, updateComment } from "../controllers/commentsController.js";

const commentsrouter= express.Router();

commentsrouter.post("/addcomment/:blogId", protectRoute, addComment)
commentsrouter.get("/getcomments/:blogId", protectRoute, getComments)
commentsrouter.put("/updatecomment/:commentId", protectRoute, updateComment)
commentsrouter.delete("/deletecomment/:commentId", protectRoute, deleteComment)

export default commentsrouter