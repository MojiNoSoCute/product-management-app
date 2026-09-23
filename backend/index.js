import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";

// .env อยู่ข้างนอก
dotenv.config()

const PORT = process.env.BACKEND_PORT

const app = express(); 
app.use(cors());
app.use(express.json())

connectDB();
app.get("/", (req, res)=>{
    return res.status(200).send("<h>Hello 555</h>")
});

app.use("/api/products", productRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on: http://localhost:${PORT}`)
})