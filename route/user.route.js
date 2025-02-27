const express = require("express");
require("dotenv").config()
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { transporter } = require("../../mailTransporter");
const { authMiddleware } = require("../middleware/auth");
const { TicketModel } = require("../model/ticket.model");
const userRoute = express.Router()

SALT_ROUND = Number(process.env.SALT_ROUND)


userRoute.get("/all-user", loggerMiddleware(),async (req, res) => {
    try {
        const data = UserModel.find()
        res.status(200).json({ msg: "user data:", data })
    } catch (error) {
        res.status(404).json({ msg: "error occured while accessing the user data", error })
    }
})

userRoute.get("/user/:id", loggerMiddleware(),async (req, res) => {
    try {
        id = req.params.id;
        const data = UserModel.findById({ _id: id })
        res.status(200).json({ msg: `${id} user data:`, data })
    } catch (error) {
        res.status(404).json({ msg: `error occured while accessing the ${id} user data:`, error })
    }
})
//////////////////////////***********  Signup  **********///////////////////////////
userRoute.post("/signup", loggerMiddleware(),async (req, res) => {
    try {
        const myPlaintextPassword = req.body.password;

        bcrypt.hash(myPlaintextPassword, SALT_ROUND, async function (err, hash) {
            if (err) {
                res.status(404).json({ msg: `error occured while password hashing...`, error })
            } else {
                const data = UserModel.create({ ...req.body, password: hash });
                res.status(200).json({ msg: `user ctrated successfully`, Userdata: data });

            }
        });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `error occured while booking Ticket`, error })
    }
})

//////////////////////////***********  Login  **********///////////////////////////

userRoute.post("/login", loggerMiddleware(),async (req, res) => {
    try {
      const user=await UserModel.findOne({email:req.body.email})
      if(!user){
        res.status(404).json({ msg: "User Not Found,Please SignUp..."})
      }else{
        const MyPassword = req.body.password;
        let hash=user.password;
        bcrypt.compare(MyPassword,hash).then(function(result){
            if(result){
                var token=JsonWebTokenError.sign({userId:user._id,role:user.role},SECRET_KEY,{expiresIn:"15min"})
                res.json({msg:"Login Success!"});

            }else{
                res.json({msg:"Wrong Password."});
            }
        })
      }     
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `Unauthorized User`, error })
    }
})


//////////////////////////***********  Book Ticket  **********///////////////////////////

userRoute.post("/book-ticket", loggerMiddleware(),authMiddleware("customer"),async (req, res) => {
    try {
        userId=req.body.userId;
        const data = await TicketModel.create({...req.body,time:Date.now()});
        const info = await transporter.sendMail({
            from: '"Ticket Booking" <mayurishinde24304@gmail.com>',
            to: "venugopal.burli@masaischool.com ",
            subject: "✔ Ticket Booking",
            html: "<b>Your Ticket Booking is Successfull...</b>",
        });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `error occured while booking Ticket`, error })
        
    }
})

//////////////////////////***********  Update Ticket  **********///////////////////////////
userRoute.patch("/ticket/:userId", loggerMiddleware(),authMiddleware("customer"),async (req, res) => {
    try {
        userId = req.params.userId;
        const body = req.body;
        const data = TicketModel.findByIdAndUpdate({ userId, body })
        res.status(200).json({ msg: `${userId} user data updated successfully.:`, data })
    } catch (error) {
        res.status(404).json({ msg: `error occured while updating the ${id} user ticket data:`, error })
    }
})
//////////////////////////***********  Delete Ticket within 24 hr  **********///////////////////////////
userRoute.delete("/ticket/:userId",authMiddleware("customer"), loggerMiddleware(),async (req, res) => {
    try {
        userId = req.params.userId;
        const body = req.body;
        const user=await TicketModel.findOne(userId)
        const time=user.time;
        const timeAfterOneDay = time + 24 * 60 * 60 * 1000;
        if (Date.now() < timeAfterOneDay) {
        const data = TicketModel.findByIdAndDelete(userId)
        res.status(200).json({ msg: "your ticket cancelled successfully!"})
       }else{
        res.status(200).json({ msg: "you can not delete ticket..."})
       }
       
    } catch (error) {
        res.status(404).json({ msg: `error occured while cancelling the ${id} user ticket:`, error })
    }
})




module.exports = { userRoute }