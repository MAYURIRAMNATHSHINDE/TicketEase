const express=require("express");
const { ConnectedToDB } = require("./config/mongo.config");
const { userRoute } = require("./route/user.route");
require("dotenv").config()


const app=express()

app.use(express.json())
app.use("/customer",userRoute)
app.use("/admin",adminRoute)
app.use(loggerMiddleware())

PORT=process.env.PORT || 3000;
// app.listen(PORT,()=>{
//     ConnectedToDB()
//     console.log("server started...")
// })