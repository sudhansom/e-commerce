import express from "express";
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import dev from "./config/index.js"

const port = dev.app.serverPort;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send('api is working fine...');
})

app.use((req, res, next)=>{
    return res.status(404).json({
        success: false,
        message: 'Route not found.'
    })
})
app.use((err, req, res, next)=> {
    console.error(err.stack);
    return res.status(500).json({
        success: false,
        message: err.message,
    });
})

app.listen(port, async()=>{
    console.log(chalk.blueBright(`server running at http://localhost:${port}`));
    await connectDB();
})

app.use(morgan("dev"));