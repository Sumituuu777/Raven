import express from "express"
import { protectRoute } from "../middleware/auth";
import { getMessages, getUsersForSidebar, markMessageSeen } from "../controllers/messageController";

const messagerouter= express.Router();

messagerouter.get("/users",protectRoute,getUsersForSidebar)
messagerouter.get("/:id",protectRoute,getMessages)
messagerouter.put("/mark/:id",protectRoute,markMessageSeen)

export default messagerouter