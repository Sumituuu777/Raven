import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { addComment, deleteComment, getComments } from "../controllers/commentsController.js";

const commentsrouter= express.Router();

commentsrouter.post("/comment/:blogId",addComment)
commentsrouter.post("/comment/:blogId",getComments)
commentsrouter.put("/comment/:commentId",getComments)
commentsrouter.delete("/comment/:commentId",deleteComment)

export default commentsrouter