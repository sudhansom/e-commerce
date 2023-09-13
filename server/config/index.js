import dotenv from "dotenv";

dotenv.config();

export const dev = {
    app: {
        serverPort: Number(process.env.SERVER_PORT) || 3002,
        jwtSecretKey: String(process.env.JWT_SECRET_KEY) || "fkljsdfljdskljfksdljfklds343**",
        clientUrl: process.env.CLIENT_URL,
        smtpUsername: "process.env.SMTP_EMAIL",
        smtpPassword: "process.env.SMTP_PASSWORD",
    },
    db: {
        mongoUrl: process.env.MONGO_URL || "mongodb+srv://mtU1p265AJ28Kjoc:mtU1p265AJ28Kjoc@cluster0.3wccq.mongodb.net/ecommerce-full-stack"
    }
}

export default dev;