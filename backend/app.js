//core modules
const http=require('http');
const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
require('dotenv').config();

//local modules

const app=express();
const server=http.createServer(app);
const PORT=process.env.PORT || 3050;
server.listen(PORT,()=>{
console.log(`server running at http://localhost:${PORT}/`);
})
app.use(bodyparser.urlencoded({extended:true}));

