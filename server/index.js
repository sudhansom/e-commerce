import express from "express";
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import dev from "./config/index.js"
import userRoute from "./routes/user.js";
import categoryRoute from "./routes/category.js";

const port = dev.app.serverPort;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send('api is working fine...');
})
app.use("/api/user",userRoute);
app.use("/api/categories",categoryRoute);

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