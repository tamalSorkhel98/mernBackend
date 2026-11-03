import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:5,
        maxLength:50
    },
    description:{
        type:String,
        required:true,
        minLength:10,
        maxLength:200
    },
    images:{
        type:[
            {
                type:String
            }
        ],
        validate:{
            validator:images=>images.length<=5,
            message:"maximum 5 images at a time"
        }
    },
    sizes:[
        {
            size:{
                type:String,
                required:true,
                enum:["S","M","L","XL","XXL"]
            },
            stock:{
                type:Number,
                required:true,
                min:1
            }
        }
    ],
    // minimum price is 300 
    price:{
        amount:{
            type:Number,
            required:true,
            min:300
        },
        currency:{
            type:String,
            required:true,
            enum:["USD","INR"],
            default:"INR"
        }
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId
    }
})

const productModel=mongoose.model('products',productSchema)

export default productModel