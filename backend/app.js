//core modules
const http=require('http');
const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
require('dotenv').config();
import { Server } from 'socket.io';

//local modules
const userRouter= require('./routes/userRoutes');
const { default: messagerouter } = require('./routes/messageRoutes');


const app=express();

const url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@airbnb.c30s2fi.mongodb.net/airbnb`
const PORT=process.env.PORT || 3050;

mongoose.connect(url)
.then(()=>{
    console.log("connected to mongodb");
    const server=http.createServer(app);

    server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}/`);
    })
})
.catch((err)=>{
    console.log("error while connecting to mongodb",err)
})


export const io=new Server(server,{
    cors:{origin:"*"}
})

export const userSocketMap={}; // userId : socketId

// socket io handler
io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId
    console.log("user connection",userId);
    
    if(userId) userSocketMap[userId]=socket.id

    // show online to all connected user
    io.emit("getOnlineUser",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("User disconnected",userId)
        delete userSocketMap[userId]
    })
})


// MiddleWare
app.use(express.json({limit:"4mb"}))
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors())

app.use('/api/status',(req,res)=> res.send("Server is live"))

// Routes setup
app.use("/api/auth",userRouter)
app.use("/api/message",messagerouter)
