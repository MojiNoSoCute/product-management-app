import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AddProductPage from "./pages/AddProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

/**
 * Root Component สำหรับจัดการ Routing ของแอปพลิเคชัน
 * ใช้ React Router ในการสลับหน้าตาม URL Path
 */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้าแรก (/) : Redirect อัตโนมัติไปยังหน้ารายการสินค้า (/product) */}
        <Route path="/" element={<Navigate to="/product" replace />} />

        {/* หน้ารายการสินค้าหลัก (Product Catalog): แสดงสินค้าทั้งหมด, ค้นหา, กรอง และลบ */}
        <Route path="/product" element={<ProductPage />} />

        {/* หน้าเพิ่มสินค้าใหม่ (Add Product): มีฟอร์มกรอกและ Live Preview */}
        <Route path="/product/new" element={<AddProductPage />} />

        {/* หน้าแก้ไขสินค้า (Edit Product): ดึงข้อมูลตาม :id มาแก้ไขผ่านฟอร์ม */}
        <Route path="/product/:id/edit" element={<EditProductPage />} />

        {/* ดักจับกรณีเข้า URL ที่ไม่มีในระบบ (Fallback 404): Redirect กลับไปหน้ารายการสินค้า */}
        <Route path="*" element={<Navigate to="/product" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;