import express from "express";
import chalk from "chalk";

const port = 3001;
const app = express();

app.listen(port, ()=>{
    console.log(chalk.blueBright(`server running at http://localhost:${port}`));
})