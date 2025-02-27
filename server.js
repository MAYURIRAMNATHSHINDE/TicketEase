const express=require("express");
const { ConnectedToDB } = require("./config/mongo.config");
require("dotenv").config()


const app=express()
PORT=process.env.PORT || 3000;



app.listen(PORT,()=>{
    ConnectedToDB()
    console.log("server started...")
})