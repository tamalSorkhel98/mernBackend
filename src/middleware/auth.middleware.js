import { authModel } from "../model/auth.model.js"
import { verifyAccessToken } from "../utils/auth.utils.js"

export const authenticate=async(req,res,next)=>{
    
    try {
        
        const token = req.headers.authorization.split(" ")[1]    

        if(!token){
            return res.status(400).json({
                message:"accessToken is not found"
            })
        }
        
        const decode = verifyAccessToken(token)
        

        const user = await authModel.findById(decode.id)
        if (!user) {
            return res.status(401).json({
                message:"user is unauthenticated"
            })
        }
        req.user=user

        next()
    } catch (error) {
        return res.status(401).json({
            message:"token not found"
        })
        
    }
}

export const authenticateSeller=async(req,res,next)=>{
    

    try {

        if (req.user.role!=='seller') {
            return res.status(403).json({
                message:"user is not authorized to create a product"
            })
        }

        next()
        
    } catch (error) {
        console.log('error in authenticate seller middleware',error);
        
    }

}