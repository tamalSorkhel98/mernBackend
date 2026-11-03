import {body, validationResult} from 'express-validator'

export const createProductValidator=[
    body("title")
        .exists().withMessage("title must be exist").bail()
        .isString().withMessage("title must be string").bail()
        .trim()
        .isLength({min:5,max:50}).withMessage("title must be within 5 to 50 chardescription"),

    body("description")
        .exists().withMessage("description must be exist").bail()
        .isString().withMessage("description must be string").bail()
        .trim()
        .isLength({min:10,max:200}).withMessage("description must be within 10 to 200 character"),

    body("sizes")
        .exists().withMessage("sizes must be exist").bail(),

    body("sizes.*.size")
        .exists().withMessage("size must be exist").bail()
        .isString().withMessage("size must be string").bail()
        .trim()
        .isIn(["S","M","L","XL","XXL"]).withMessage("size must be with in S,M,L,XL,XXL"),

    body("sizes.*.stock")
        .exists().withMessage("stock must be exist").bail()
        .isInt().withMessage("stock must be number").bail()
        .isLength({min:1}).withMessage("stock must be minimum 1"),

    body("price.amount")
        .exists().withMessage("amount must be exist").bail()
        .isFloat({min:300}).withMessage("amount must be float and minimum is 300"),

    body("price.currency")
        .exists().withMessage("currency must be exist").bail()
        .isString().withMessage("currency must be string").bail()
        .isIn(["USD","INR"]).withMessage("currency must be within USD,INR"),

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