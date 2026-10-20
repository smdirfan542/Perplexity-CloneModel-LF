import {body, ExpressValidator,validationResult } from "express-validator";

const validator=(req,res,next)=>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }
    res.status(400).json({
        errors:errors.array()
    })
}
export const registerValidation = [

body('username').isString().withMessage('username must be string and unique')
.isLength({min:3,max:30}).withMessage('minimum length should be 3 and max length should be 30')
,

body('email').isEmail().withMessage('email should be valid email address')
.notEmpty().withMessage('email shouldnot be empty'),

body('password').isLength({min:6}).withMessage('password should be minimum of 6 length')
.notEmpty().withMessage('password shouldnot be empty'),

validator
]

export const loginValidator=[
    body('email').notEmpty().withMessage('email should not be empty')
    .isEmail().withMessage('email address should be valid address'),

    body('password').isLength({min:6}).withMessage('password should be minimum of 6 in length'),
    validator

]