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
        // const token = jwt.sign({name, email, hashPassword, address}, dev.app.jwtSecretKey, {
        //     expiresIn: "10m"
        // })
        // console.log("token: ",token);
        // //prepare emil
        // const emailData = {
        //     email,
        //     subject: "Account Activation Email",
        //     html: `
        //     <h2> Hello ${name}. </h2>
        //     <p> Please click here to <a href="${dev.app.clientUrl}/auth/acitvate/${token}"> activate your account</a> </p>
        //     `,
        // };

        // sendEmailWithNodeMailer(emailData); ---- need to learn this

        // activation email
        // if the user activate the email , then only we store in database


        // return res.status(200).json({
        //     message: `Please go to your email: ${email} to activate your account.`
        // });

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            address
        })
        try{
            await newUser.save();
        }
        catch(err){
            return res.status(500).json({message: 'failed to create user', err})
        }
        return res.status(201).json({message: 'created user.'})

    }catch(error){
        return res.json({message: error.message})
    }
}

export const activateAccount = async (req, res, next) => {
    console.log("account activation:, ", req.body)
    try{
        const {token} = req.body;
        if(!token){
            return res.status(404).json({error: 'token not found'})
        }
        jwt.verify(token, dev.app.jwtSecretKey, (err, decoded)=>{
            if(err){
                return res.status(401).json({error: "link has expired. Please signup again."})
            }
            const {name, email, hashPassword, address} = decoded;
            const newUser = new User({
                name, 
                email, 
                password:hashPassword, 
                address
            });
            console.log(newUser);

        });
        return res.json({message: "activated..."});

        
    }catch(error){
        return res.json({
            error: error.message,
        })
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.find({ email });
        console.log(existingUser);
        if(!existingUser){
            return res.status(404).json({error: "user does not exist. Please register."});
        }
        // const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordMatched){
            return res.status(400).json({error: "Password does not exist."});
        }
        const token = jwt.sign(existingUser, dev.app.jwtSecretKey, {expiresIn: "10m"});
        return res.status(200).json({message: 'user signed in successfully.', user:{
            name: existingUser.name,
            email: existingUser.email,
            address: existingUser.address,
        }})

    }catch(err){
        return res.status(500).json({message: 'error in login...', error: err.message})
    }
}