import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
        console.log("MongoDB URI:", `${process.env.MONGODB_URI}/${DB_NAME}`);

       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
        serverSelectionTimeoutMS: 5000,  // 5 seconds timeout
    });
    
       console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host} \n`) 

    } catch (error) {
    console.log("mongo error")
    process.exit(1)
    }

}

export default connectDB