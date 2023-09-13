import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import dev from "../config/index.js";
import { sendEmailWithNodeMailer } from "../helper/email.js";

export const registerUser = async(req, res, next) => {
    try{
        const { name, email, password, address} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exists"})
        }
        // create an user:
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // store the user data temporarily inside json token
        const token = jwt.sign({name, email, hashPassword, address}, dev.app.jwtSecretKey, {
            expiresIn: "10m"
        })
        //prepare emil
        const emailData = {
            email,
            subject: "Account Activation Email",
            html: `
            <h2> Hello ${name}. </h2>
            <p> Please click here to <a href="${dev.app.clientUrl}/auth/acitvate/${token}"> activate your account</a> </p>
            `,
        };

        //sendEmailWithNodeMailer(emailData); ---- need to learn this

        // activation email
        // if the user activate the email , then only we store in database


        return res.status(200).json({
            message: `Please go to your email: ${email} to activate your account.`
        });
    }catch(error){
        return res.json({message: error.message})
    }
}

export const activateAccount = (req, res, next) => {
    return res.json({message: "activated..."});
}