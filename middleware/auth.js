const express=require("express")
const fs=require("fs")
const jwt=require("jsonwebtoken");
require("dotenv").config()

const authMiddleware=(allowedRole)=>{
    return (req,res,next)=>{
        let token=req.headers.authorization.split(" ")[1];
        console.log(token)
        if(!token){
            res.status(403).json({msg:"User Not LoggedIn"})
        }else{
            //verify token
            var decoded=jwt.verify(token,process.env.SECRET_KEY);
            if(decoded){
                req.body.userId=decoded.userId;
                req.body.role=decoded.role;
                next()

            }
            else{
                res.status(403).json({msg:"Unauthorized User"})
            }
        }
    }

}

const loggerMiddleware=(req,res,next)=>{
   let reqData=`${req.method},${req.url}\n`
   fs.appendFileSync("log.txt",reqData);
   next()
}
module.exports={authMiddleware,loggerMiddleware}