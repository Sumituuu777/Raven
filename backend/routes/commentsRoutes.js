import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { addComment, deleteComment, getComments, updateComment } from "../controllers/commentsController.js";

const commentsrouter= express.Router();

commentsrouter.post("/addcomment/:blogId",addComment)
commentsrouter.post("/getcomments/:blogId",getComments)
commentsrouter.put("/updatecomment/:commentId",updateComment)
commentsrouter.delete("/deletecomment/:commentId",deleteComment)

export default commentsrouter