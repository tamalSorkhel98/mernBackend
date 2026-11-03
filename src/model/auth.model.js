import mongoose from "mongoose";

const authSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    role:{
        type:String,
        default:"user",
        enum:["seller","user"]
    },
    hashPassword:{
        type:String,
        required:true,
        minLength:5
    },
    refreshToken:{
        type:String
    }
})

export const authModel=mongoose.model('users',authSchema)

