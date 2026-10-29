import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import userModel from '../models/User.js';

const authRouter = express.Router();

authRouter.post("/register",async (req,res)=>{
    try
    {
        const {name,email,password} = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({
                message:"All Details are Rrequied"
            })
        }
        const userExists = await userModel.findOne({email:email.toLowerCase().trim()});
        if(userExists)
        {
            return res.status(409).json({
                message:"User Already Exists"
            })
        }

        const hashedPass = await bcrypt.hash(password,10);

        const user = await userModel.create({ name,email:email.toLowerCase().trim(), password: hashedPass});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: "2h"});

        res.cookie('token',token,{
            httpOnly: true,
            sameSite:"strict"
        })
        res.status(201).json({
            message:"User Created"
        });
    }
    catch(error)
    {
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
})


authRouter.post("/login", async (req,res)=>{
    try 
    {
        const {email,password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                message:"Enter Credentials"
            })
        }

        const user = await userModel.findOne({email:email.toLowerCase().trim()});

        if(!user)
        {
            return res.status(401).json({ 
                message:"User Doesnt Exist"
            })
        }

        if(await bcrypt.compare(password,user.password))
        {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: "2h"});

            res.cookie('token',token,{
                httpOnly: true,
                sameSite:"strict"
            });

            res.status(200).json({
                message:"Logged In"
            });
        }
        else 
        {
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }
    }
    catch(error)
    {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

export default authRouter;