import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { deleteMessage, getMessages, getUsersForSidebar, markMessageSeen, sendMessage } from "../controllers/messageController.js";

const messagerouter= express.Router();

messagerouter.get("/users",protectRoute,getUsersForSidebar)
messagerouter.get("/:id",protectRoute,getMessages)
messagerouter.put("/mark/:id",protectRoute,markMessageSeen)
messagerouter.post("/send/:id",protectRoute,sendMessage)
messagerouter.delete("/delete/:msgId",protectRoute,deleteMessage)

export default messagerouter