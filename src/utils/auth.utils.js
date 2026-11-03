import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const generateToken = ({id,role})=>{
    const accessToken=jwt.sign({id,role},config.ACCESS_TOKEN,{expiresIn:"30m"})

    const refreshToken = jwt.sign({id,role},config.REFRESH_TOKEN,{expiresIn:"7d"})

    return {
        accessToken,refreshToken
    }
}

export const verifyRefreshToken=(token)=>{
    return jwt.verify(token,config.REFRESH_TOKEN)
}

export const verifyAccessToken=(token)=>{
    return jwt.verify(token,config.ACCESS_TOKEN)
}