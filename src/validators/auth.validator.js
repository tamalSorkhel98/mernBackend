import {body,validationResult} from 'express-validator'


const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


export const registerValidator=[
    body("email")
        .exists().withMessage("email must be exist").bail()
        .isEmail().withMessage("email must be a valid").bail()
        .isString().withMessage("email must be a string").bail()
        .matches(emailPattern).withMessage("invalid email format"),

    body("name")
        .exists().withMessage("name must be exist").bail()
        .isString().withMessage("name must be string").bail()
        .trim()
        .isLength({min:3,max:30}).withMessage("minimum 3 to max 30 char required"),

    body("password")
        .exists().withMessage("password must be exist").bail()
        .isString().withMessage("password must be string").bail()
        .trim()
        .isLength({min:5,max:50}).withMessage("minimum 5 to max 50 char required"),

    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }


]

export const loginValidator=[
    body("email")
        .exists().withMessage("email must be exist").bail()
        .isString().withMessage("email must be string").bail()
        .trim()
        .isEmail().withMessage("email must be valid email"),

    body("password")
        .exists().withMessage("password must be exist").bail()
        .isString().withMessage("password must be a string").bail()
        .trim()
        .isLength({min:5,max:50}).withMessage("password must be within 5 to 50 character"),

    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty){
            return res.status(400).json({
                message:"invalid request "
            })
        }
        next()
    }
]