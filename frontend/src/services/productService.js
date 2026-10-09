// ดึง Base URL ของ Backend API จาก Vite Environment Variable (เช่น http://localhost:5000)
const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

/**
 * ฟังก์ชันกลาง (Helper) สำหรับยิง HTTP Request ผ่าน Fetch API
 * พร้อมระบบจัดการและดักจับข้อความ Error จาก Server อัตโนมัติ
 */
const request = async (url, option) => {
  const response = await fetch(url, option);

  // หาก HTTP Status ไม่อยู่ในช่วง 200-299 ให้ประมวลผลข้อความ Error
  if (!response.ok) {
    let message = "เกิดข้อผิดพลาดในการเชื่อมต่อ";
    try {
      const errorJson = await response.json();
      message = errorJson.message || message;
    } catch {
      const text = await response.text();
      if (text) message = text;
    }
    throw new Error(message);
  }

  // แปลงผลลัพธ์ที่ได้ให้อยู่ในรูป JSON
  return response.json();
};

/**
 * 1. ดึงรายการสินค้าทั้งหมด (GET /api/products)
 */
const getProducts = () => request(API_URL);

/**
 * 2. ดึงข้อมูลสินค้าเฉพาะชิ้นตาม id (GET /api/products/:id)
 */
const getProduct = (id) => request(`${API_URL}/${id}`);

/**
 * 3. ส่งข้อมูลเพื่อสร้างสินค้าใหม่ (POST /api/products)
 */
const createProduct = (product) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

/**
 * 4. ส่งข้อมูลเพื่ออัปเดตสินค้าตาม id (PUT /api/products/:id)
 */
const updateProduct = (id, product) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

/**
 * 5. สั่งลบสินค้าออกจากระบบตาม id (DELETE /api/products/:id)
 */
const deleteProduct = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };