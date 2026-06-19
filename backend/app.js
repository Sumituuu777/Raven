//core modules
const http=require('http');
const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
require('dotenv').config();


//local modules

const app=express();
const server=http.createServer(app);

server.listen(3053,()=>{
console.log('server running at http://localhost:3050/');
})
app.use(bodyparser.urlencoded({extended:true}));
