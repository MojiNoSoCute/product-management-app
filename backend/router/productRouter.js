import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controller/productController.js";

// สร้าง Router Instance สำหรับจัดการ Routing ของ Product
const productRouter = Router();

// POST /api/products -> เพิ่มสินค้าใหม่เข้าสู่ระบบ (Create)
productRouter.post("/", createProduct);

// GET /api/products -> ดึงรายการสินค้าทั้งหมด (Read All)
productRouter.get("/", getAllProduct);

// GET /api/products/:id -> ดึงข้อมูลสินค้าเฉพาะรายการตาม id (Read One)
productRouter.get("/:id", getProductById);

// PUT /api/products/:id -> แก้ไข/อัปเดตข้อมูลสินค้าตาม id (Update)
productRouter.put("/:id", updateProduct);

// DELETE /api/products/:id -> ลบข้อมูลสินค้าตาม id (Delete)
productRouter.delete("/:id", deleteProduct);

export default productRouter;