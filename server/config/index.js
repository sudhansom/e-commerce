import dotenv from "dotenv";

dotenv.config();

export const dev = {
    app: {
        serverPort: Number(process.env.SERVER_PORT) || 3002
    },
    db: {

    }
}

export default dev;