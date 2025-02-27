const mongoose=require("mongoose")
require("dotenv").config()

const ConnectedToDB=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB.")
   }catch(error){
    console.log("error occured while connecting to database.",error)
   }
}


module.exports={ConnectedToDB}