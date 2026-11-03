import productModel from "../model/product.model.js";
import imagekit from "../services/imagekit.js";

export const createProductController=async(req,res)=>{
    
    try {
        const {title,description,price,sizes}=req.body;

        const uploadImage=await Promise.all(
            req.files.map(async(file)=>{
                const res = await imagekit.upload({
                    file:file.buffer,
                    fileName:file.originalname
                })
                return res.url
            })
        )
        
       const product = await productModel.create({
        title,
        description,
        price,
        sizes,
        images:uploadImage,
        seller:req.user._id
       })
    res.status(201).json({
        message:"product created successfully",
        data:{
            product
        }
    })

    } catch (error) {
        console.log('error in create product controller',error);
        
    }
    

}

export const getAllProduct=async(req,res)=>{
    try {
        
        const products = await productModel.find()

        return res.status(200).json({
            message:"all products fetched successfully",
            data:products
        })

    } catch (error) {
        console.log('error in get all product api',error);
        
    }
}

export const getProductById=async(req,res)=>{
    try {
        const {id} =req.params
        const product =await productModel.findById(id) 

        res.status(200).json({
            message:"product fetched successfully",
            data:product
        })
    } catch (error) {
        console.log('error in get product by id api',error);
        
    }
}

export const updateById=async(req,res)=>{
   try {
    
     const {id}=req.params
     
    const updateData=req.body

    const product = await productModel.findByIdAndUpdate(id,
        {$set:updateData},{
            returnDocument:'after',
            runValidators:true
        }
    )

    if(!product){
        return res.status(400).json({
            message:"product not found"
        })
    }

    res.status(200).json({
        message:"product updated successfully",
        data:product
    })

   } catch (error) {
    console.log('error in updateby id api',error);
    
   }
    
}

export const deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const product =await productModel.findByIdAndDelete(id)
        
        res.status(200).json({
            message:"product deleted successfully",
            data:product
        })
    } catch (error) {
        console.log('error in delete product api',error);
        
    }
}