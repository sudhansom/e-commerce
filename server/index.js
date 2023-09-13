import express from "express";
import chalk from "chalk";
import morgan from "morgan";

import dev from "./config/index.js"

const port = dev.app.serverPort;
const app = express();

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

app.listen(port, ()=>{
    console.log(chalk.blueBright(`server running at http://localhost:${port}`));
})

app.use(morgan("dev"));