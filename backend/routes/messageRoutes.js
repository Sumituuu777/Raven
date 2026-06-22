import express from "express"
import { protectRoute } from "../middleware/auth";
import { getMessages, getUsersForSidebar, markMessageSeen, sendMessage } from "../controllers/messageController";

const messagerouter= express.Router();

messagerouter.get("/users",protectRoute,getUsersForSidebar)
messagerouter.get("/:id",protectRoute,getMessages)
messagerouter.put("/mark/:id",protectRoute,markMessageSeen)
messagerouter.post("/send/:id",protectRoute,sendMessage)

export default messagerouter