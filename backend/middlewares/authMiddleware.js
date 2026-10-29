import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from '../models/User.js';

const authMiddleware = async (req,res,next) => {
    try
    {
        const token = req.cookies.token;
        
        if(!token)
        {
            return res.status(401).json({
                message:"Unauthorized"
            });
        }

        const decodedJWT = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById(decodedJWT.id);

        if(!user)
        {
            return res.status(401).json({
                message:"User Not Found"
            })
        }

        req.user = user._id;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            message:"Unauthorized: Invalid Token"
        })
    }
}

export default authMiddleware;