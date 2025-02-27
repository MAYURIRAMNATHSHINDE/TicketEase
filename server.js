const express=require("express");
const { ConnectedToDB } = require("./config/mongo.config");
const { userRoute } = require("./route/user.route");
require("dotenv").config()


const app=express()

app.use(express.json())
app.use("/user",userRoute)




PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    ConnectedToDB()
    console.log("server started...")
})