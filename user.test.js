const request = require('supertest');
const express = require('express');
const app=require("./server")

beforeAll(async ()=>{
    await mongoose.connect(process.env.MONGO_URI);
    
})

afetrAll(async()=>{
    await mongoose.connection.close();
})

describe("User test routes",(=>{
    test("Signup Test Route",()=>{
        const res=await request(app).post("/customer/signup").send({name:"Mayuri",email:"mayuri36@gmail.com"});
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("user ctrated successfully")
    })
});
// describe("User test routes",(=>{
//     test("Signup Test Route",()=>{
//         const res=await request(app).post("/customer/signup").send({name:"Mayuri",email:"mayuri36@gmail.com"});
//         expect(res.statusCode).toBe(201);
//         expect(res.body.message).toBe("user ctrated successfully")
//     })
// });