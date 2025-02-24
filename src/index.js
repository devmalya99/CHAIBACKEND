
import { app } from "./app.js";
import dotenv from "dotenv";  // ✅ Use import instead of require
dotenv.config({
    path: "./.env",
});

import connectDB from "./db/index.js";




connectDB()
.then(() => 
{
    app.listen(process.env.PORT || 8000, () => console.log(`Hello dev Server running on port ${process.env.PORT }`));  
})
.catch((err) => console.log("MongoDB connection failed",err));