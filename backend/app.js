// Core modules
import http from "http";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
 
// Local modules
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import cloudinary from "./lib/cloudinary.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@airbnb.c30s2fi.mongodb.net/airbnb`;

const PORT = process.env.PORT || 3050;

// Socket.Io
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export const userSocketMap = {}; // userId : socketId

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  console.log("User connected:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Send online users to everyone
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("Server is live");
});

// Routes
app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);


// Database Connection
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB:", err);
  });
