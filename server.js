const express=require("express");
const { ConnectedToDB } = require("./config/mongo.config");
const { userRoute } = require("./route/user.route");
const { adminRoute } = require("./route/admin.route");
const { loggerMiddleware } = require("./middleware/auth");


if(process.env.NODE_ENV==="test"){
    require("dotenv").config({path:".env.testing"});
}else{
    require("dotenv").config()
}
const app=express()

app.use(express.json())
app.use("/customer",userRoute)
app.use("/admin",adminRoute)
app.use(loggerMiddleware)

PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    ConnectedToDB()
    console.log("server started...")
})