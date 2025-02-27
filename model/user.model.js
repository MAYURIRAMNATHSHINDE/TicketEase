const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema(
    {
        name: {type:String},
        email: {type:String,unique:true},
        password: {type:String},
        mobileNumber: {type:String},
        gender: {type:String},
        role: {type:String,enum:["admin","customer"]}
    }
)


const UserModel=mongoose.model("user",UserSchema)



module.exports={UserModel}