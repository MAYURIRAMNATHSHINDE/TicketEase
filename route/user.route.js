const express = require("express");
require("dotenv").config()
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
const userRoute = express.Router()

SALT_ROUND=Number(process.env.SALT_ROUND)


userRoute.get("/all-user", async (req, res) => {
    try {
        const data = UserModel.find()
        res.status(200).json({ msg: "user data:", data })
    } catch (error) {
        res.status(404).json({ msg: "error occured while accessing the user data", error })
    }
})

userRoute.get("/user/:id", async (req, res) => {
    try {
        id=req.params.id;
        const data = UserModel.findById({_id:id})
        res.status(200).json({ msg: `${id} user data:`, data })
    } catch (error) {
        res.status(404).json({ msg: `error occured while accessing the ${id} user data:`, error })
    }
})

userRoute.post("/add-user", async (req, res) => {
    try {
        const myPlaintextPassword=req.body.password;

         bcrypt.hash(myPlaintextPassword, SALT_ROUND, function(err, hash) {
        if(err){
            res.status(404).json({ msg: `error occured while password hashing...`, error })
        }else{
            const data = UserModel.create({...req.body,password:hash});
            res.status(200).json({ msg: `Ticket booking is successful...`, Userdata:data })
        }
    });
} catch (error) {
        console.log(error)
        res.status(404).json({ msg: `error occured while booking Ticket`, error })
    }
})


userRoute.patch("/user/:id", async (req, res) => {
    try {
        id=req.params.id;
        const body=req.body;
        const data = UserModel.findByIdAndUpdate({id,body})
        res.status(200).json({ msg: `${id} user data:`, data })
    } catch (error) {
        res.status(404).json({ msg: `error occured while updating the ${id} user ticket:`, error })
    }
})

userRoute.delete("/user/:id", async (req, res) => {
    try {
        id=req.params.id;
        const body=req.body;
        const data = UserModel.findByIdAndDelete({id})
        res.status(200).json({ msg: "your ticket cancelled successfully!" })
    } catch (error) {
        res.status(404).json({ msg: `error occured while cancelling the ${id} user ticket:`, error })
    }
})



    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    // });

    // var jwt = require('jsonwebtoken');
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

































    module.exports = { userRoute }