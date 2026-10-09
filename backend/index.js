import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";

// โหลด Environment Variables จากไฟล์ .env
dotenv.config();

// กำหนดพอร์ตสำหรับ Backend Server (ค่าเริ่มต้น 5000)
const PORT = process.env.BACKEND_PORT || 5000;

// สร้าง Express Application Instance
const app = express();

// Middleware: เปิดใช้งาน CORS เพื่อให้ Frontend (เช่น พอร์ต 5173) สามารถเรียก API ข้ามโดเมนได้
app.use(cors());

// Middleware: แปลง Request Body ที่เป็น JSON ให้อยู่ในรูป JavaScript Object อัตโนมัติ (req.body)
app.use(express.json());

// เชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน Sequelize
connectDB();

// Route ทดสอบการทำงานเบื้องต้นของเซิร์ฟเวอร์ (Health Check)
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Backend API is running successfully!</h1>");
});

// กำหนด Endpoint พื้นฐานสำหรับจัดการข้อมูลสินค้า ให้วิ่งไปที่ productRouter
// เส้นทาง: /api/products
app.use("/api/products", productRouter);

// เริ่มรัน Server ตามพอร์ตที่กำหนด
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});