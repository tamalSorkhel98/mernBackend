import {Router}from 'express'
import { loginValidator, registerValidator } from '../validators/auth.validator.js'
import { getMeController, loginController, logOutController, refreshController, registerController } from '../controller/auth.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router=Router()

router.get('/',(req,res)=>{
    res.send("deployed")
})

router.post('/register',registerValidator,registerController)

router.post('/login',loginValidator,loginController)

router.post('/refresh',refreshController)

router.get('/getMe',authenticate ,getMeController)

router.post('/logout',authenticate,logOutController)

export default router