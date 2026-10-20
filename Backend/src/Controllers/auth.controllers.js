import userModel from "../models/user.model.js";
import jsonwebtoken from 'jsonwebtoken';
import cookieParser from 'cookie-parser'
import { sendEmail } from "../services/mail.service.js";
import bcrypt from 'bcryptjs'



const jwt = jsonwebtoken;


export async function registerController(req,res){
    const {username,email,password}=req.body;
    const existinguser= await userModel.findOne({$or:[{email},{username}]});

    if(existinguser){
      return res.status(409).json({
            message:'user already exists',
            success:false,
            err:'user already exists'
        })
    }

    const user = await userModel.create({username,email,password});

    const emailverificationToken = jwt.sign({
        email:user.email,

    },process.env.JWT_SECRETKEY)

    await sendEmail({
        to:email,
        subject:"welcome to perplexity",
        html:`
            <p>Hi ${username}</p>
            <p>ThankYou for registering at <strong>Perplexity</strong></p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${emailverificationToken}">Verify</a>
            <p>Best regards The Perplexity</p>
        `
    })

    res.status(201).json({
        message:'user registered successfully',
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
    
    // const jwt = jsonwebtoken.sign({
    //         userid:user._id
            
    //     },
    // 'jsonwebtoken')

    
}


export async function verifyemailController(req,res){
    const {token}=req.query;
    const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);

    const user = await userModel.findOne({email:decoded.email});
    if(!user){
        return res.status(400).json({
            message:'invalid token',
            success:false,
            err:"user not found"
        })
    }

    user.verified=true;

    await user.save();
    

    const html =`
        <h1>Email verified successfully</h1>
        <p> You can now login to your account</p>
        <a href="http://localhost:3000/api/auth/login"> Login </a>
    `
    res.send(html)
}


export async function deleteController(req,res){
    const {email}=req.body;
    const deleteuser = await userModel.findOneAndDelete({email});
    res.status(201).json({
        message:'user deleted successfully'
    })
}

export async function checkuserController(req,res){
    const {email}=req.body;

    const user = await userModel.findOne({email:email});
    res.status(201).json({
        user:user
    })

}

export async function loginController(req,res){
    const {email,password}=req.body;

    const isUserExist = await userModel.findOne({email:email});

    if(!isUserExist){
        return res.status(401).json({
            message:'Invalid Credentials'
        })
    }

    const isPasswordMatch=await isUserExist.comparePassword(password);
    
    if(!isPasswordMatch){
        return res.status(400).json({
            message:'Invalid email or password',
            success:false,
            err:"Incorrect password"
        })
    }
    
    if(!isUserExist.verified){
            return res.status(400).json({
                message:'User is not verified '
            })
        }else{
            await isUserExist.save();
            const token = jwt.sign({
                id:isUserExist._id,
                email:isUserExist.email
            },process.env.JWT_SECRETKEY,{
                expiresIn:'3d'
            })
            res.cookie("token",token);

            res.status(200).json({
                message:"user logged in successfully",
                success:true,
                user:{
                    id:isUserExist._id,
                    username:isUserExist.username,
                    email:isUserExist.email,
                    date:new Date().toLocaleTimeString()
                }
            })
        }
    }

    export async function getmeController(req,res){
        const userId = req.user.id;

        const user = await userModel.findById(userId).select('-password')

        if(!user){
            return res.status(401).json({
                message:'user not found'
                ,success:false,
                err:'user not found'
            })
        }
        res.status(201).json({
            message:'user details fetched successfully'
            ,success:true,user
        })


    }


    