const express=require("express");
const { UserModel } = require("../model/user.model");
require("dotenv").config()

const adminRoute=express.Router()



adminRoute.get("/all-user", async (req, res) => {
    try {
        const data = UserModel.find()
        res.status(200).json({ msg: "user data:", data })
    } catch (error) {
        res.status(404).json({ msg: "error occured while accessing the user data", error })
    }
})

adminRoute.get("/user/:id", async (req, res) => {
    try {
        id=req.params.id;
        const data = UserModel.findById({_id:id})
        res.status(200).json({ msg: `${id} user data:`, data })
    } catch (error) {
        res.status(404).json({ msg: `error occured while accessing the ${id} user data:`, error })
    }
})

adminRoute.post("/add-user", async (req, res) => {
    try {
        
        const data = UserModel.create(req.body)
        res.status(200).json({ msg: `Ticket bookin of ${id} user is successful...`, data })
    } catch (error) {
        res.status(404).json({ msg: `error occured while booking Ticket`, error })
    }
})


adminRoute.patch("/user/:id", async (req, res) => {
    try {
        id=req.params.id;
        const body=req.body;
        const data = UserModel.findByIdAndUpdate({id,body})
        res.status(200).json({ msg: `${id} user data:`, data })
    } catch (error) {
        res.status(404).json({ msg: `error occured while updating the ${id} user ticket:`, error })
    }
})

adminRoute.delete("/user/:id", async (req, res) => {
    try {
        id=req.params.id;
        const body=req.body;
        const data = UserModel.findByIdAndDelete({id})
        res.status(200).json({ msg: "your ticket cancelled successfully!" })
    } catch (error) {
        res.status(404).json({ msg: `error occured while cancelling the ${id} user ticket:`, error })
    }
})


module.exports={adminRoute}