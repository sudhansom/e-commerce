import nodemailer from "nodemailer";
import dev from "../config/index.js";

export const sendEmailWithNodeMailer = async (emailData) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: dev.app.smtpUsername, // generated ethereal user
                pass: dev.app.smtpPassword, // generated ethereal password
            },
        });

        const mailOptions = {
            from: dev.app.smtpUsername, //sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // subject line
            html: email.html, // html body
        };

        //send email with defined transport object
        await transporter.sendMain(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
            }else {
                console.log("Message send: %s", info.response);
            }
        });
    }catch(error){
        console.log("Problem sending Email: ", error);

    }
}