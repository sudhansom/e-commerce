import mongoose from "mongoose";
import dev from "./index.js";


const connectDB = async () => {
    try{
        await mongoose.connect(dev.db.mongoUrl);
        console.log("connected to mongoDb.")
    }catch (err){
        console.log('unable to connect mongo db...');
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;