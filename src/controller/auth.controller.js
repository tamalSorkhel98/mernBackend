import { authModel } from "../model/auth.model.js";
import bcrypt from 'bcryptjs'
import { generateToken, verifyAccessToken, verifyRefreshToken } from "../utils/auth.utils.js";


export const registerController=async(req,res)=>{
    try {
        const {name,email,password}=req.body

        const isExist = await authModel.findOne({email})
        if(isExist){
            return res.status(400).json({
                message:"duplicate email is not allwoed"
            })
        }

        const user =await authModel.create({
            name,
            email,
            hashPassword:await bcrypt.hash(password,12)
        })

        const {accessToken,refreshToken}=generateToken({id:user._id,role:user.role})
        
        await authModel.findByIdAndUpdate(user._id,{refreshToken:refreshToken})

        // res.cookie('refreshToken',refreshToken)

        res.status(201).json({
            message:"user registered successfully",
            data:{
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                accessToken
            }
        })

        
    } catch (error) {
        console.log('error in register controller',error);
        
    }
}

export const loginController=async(req,res)=>{
    const {email,password}=req.body

    const user = await authModel.findOne({email})
    
    if(!user){
        return res.status(401).json({
            message:"invalid email or password"
        })
    }
    
    if (!await bcrypt.compare(password,user.hashPassword)) {
        return res.status(401).json({
            message:"invalid email or password"
        })
    }

    const {accessToken,refreshToken}=generateToken({id:user._id,role:user.role})

    await authModel.findByIdAndUpdate(user._id,{
        refreshToken:refreshToken
    })

    res.cookie('refreshToken',refreshToken)
    
    res.status(200).json({
        message:"login successfully",
        data:{
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            accessToken
        }
    })

}

export const refreshController=async(req,res)=>{
    
    try {
        const token = req.cookies.refreshToken
    
        const decode = verifyRefreshToken(token)
       
        const user =await authModel.findById(decode.id)
        
        if(!user){
            return res.status(401).json({
                message:"invalid refresh token"
            })
        }

        if (user.refreshToken !==token) {
            await authModel.findByIdAndUpdate(user._id,{
                refreshToken:null
            })

            return res.status(401).json({
                message:"refresh token missmatch"
            })
        }
    
        const {accessToken,refreshToken}=generateToken({id:user._id,role:user.role})

        await authModel.findByIdAndUpdate(user._id,{
            refreshToken:refreshToken
        })

        res.cookie('refreshToken',refreshToken)

        res.status(200).json({
            message:"token refreshed successfully",
            data:{
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                accessToken
            }
        })
    
    
    } catch (error) {
        console.log('error in refresh controller',error);
        return res.status(401).json({
            message:"refresh token is not found"
        })
        
    }
    
}

export const getMeController=async(req,res)=>{
    try {
        
        const user = await authModel.findById(req.user._id)
        
        res.status(200).json({
            message:"successfully fetched user data",
            data:{
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                
            }
        })

    } catch (error) {
        console.log('error in get me api',error);
        
    }
}

export const logOutController=async(req,res)=>{
    try {
        
        const token = req.cookies.refreshToken
        if(!token){
            return res.status(401).json({
                message:"token not found"
            })
        }

        try {
            const decode = verifyRefreshToken(token)
            const user = await authModel.findByIdAndUpdate(decode.id,{
                refreshToken:null
            })
        
            res.clearCookie('refreshToken',{httpOnly:true})

            return res.status(200).json({
                message:"log out successFully"
            })
        
        } catch (error) {
            return res.status(401).json({
                message:"refresh token not found"
            })
        }

        
    } catch (error) {
        return res.status(400).json({
            message:"token error"
        })
    }

}