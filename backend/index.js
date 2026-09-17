import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { Product, connectDB } from "./db.js";

// .env อยู่ข้างนอก
dotenv.config()

const PORT = process.env.BACKEND_PORT

const app = express(); 
app.use(cors());
app.use(express.json())

// connect database
connectDB();


app.get("/", (req, res)=>{
    return res.status(200).send("<h>Hello </h>")
});

app.listen(PORT, ()=> {
    console.log(`Server is running on: http://localhost:${PORT}`)
})