import dotenv from "dotenv";

dotenv.config();

export const dev = {
    app: {
        serverPort: Number(process.env.SERVER_PORT) || 3002
    },
    db: {
        mongoUrl: process.env.MONGO_URL || "mongodb+srv://mtU1p265AJ28Kjoc:mtU1p265AJ28Kjoc@cluster0.3wccq.mongodb.net/ecommerce"
    }
}

export default dev;