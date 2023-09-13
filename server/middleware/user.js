import jwt from "jsonwebtoken";
import dev from "../config/index.js";
import User from "../models/user.js"

export const isLoggedIn = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            return res.status(404).json({message: "no token found"});
        }
        const token = req.headers.authorization;
        const {_id} = jwt.verify(token, dev.app.jwtSecretKey);
        req.userId = id;
        next()
    }catch(err){
        return res.status(401).json({message: err.message})
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const existingUser = await User.findById({_id: req.userId});
        if(!existingUser){
            return res.status(404).json({message: "no user found. please login"});
        }
        if(!existingUser.isAdmin){
            return res.status(404).json({message: "User is not authorized..."});
        }
        next()
    }catch(err){
        return res.status(401).json({message: err.message})
    }
}