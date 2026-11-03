import {Router} from 'express'
import { createProductValidator } from '../validators/product.validators.js'
import { createProductController, deleteById, getAllProduct, getProductById, updateById } from '../controller/product.controller.js'
import { authenticate, authenticateSeller } from '../middleware/auth.middleware.js'
import multer from 'multer'

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        files:5,
        fileSize:5*1024*1024
    }
})


const router = Router()

// create a product
router.post('/',upload.array('images'),authenticate,authenticateSeller,(req,res,next)=>{

    req.body.sizes=JSON.parse(req.body.sizes)
    req.body.price=JSON.parse(req.body.price)

    next()
    
},createProductValidator,createProductController)

router.get('/getAll',authenticate,getAllProduct)

router.get('/get/:id',authenticate,getProductById)

router.put('/update/:id',upload.array('images'),authenticate,authenticateSeller,(req,res,next)=>{
    if (req.body?.sizes) {
        req.body.sizes=JSON.parse(req.body.sizes)
    }
    if (req.body?.price) {
        req.body.price=JSON.parse(req.body.price)
    }
    next()
},updateById)

router.delete('/delete/:id',authenticate,authenticateSeller,deleteById)

export default router
