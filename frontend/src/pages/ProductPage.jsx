import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import PageState from "../components/PageState";
import EditProductModal from "../components/EditProductModal";
import { deleteProduct, getProducts } from "../services/productService";
import { confirmDelete, showError, showSuccess } from "../services/alertService";

/**
 * หน้าแสดงรายการสินค้าหลัก (Product Catalog Page)
 * จัดการ State ของรายการสินค้าทั้งหมด, สถานะ Loading, Error และ Modal แก้ไขสินค้าแบบด่วน
 */
const ProductPage = () => {
  // State เก็บรายการสินค้าทั้งหมดที่ดึงมาจาก API
  const [products, setProducts] = useState([]);
  // State ควบคุมสถานะกำลังโหลดข้อมูล
  const [loading, setLoading] = useState(true);
  // State เก็บข้อความ Error เมื่อเกิดปัญหาในการดึงข้อมูล
  const [error, setError] = useState("");
  // State เก็บ Object สินค้าที่กำลังถูกเลือกเพื่อแก้ไขใน Modal (ถ้าเป็น null คือปิด Modal)
  const [editingProduct, setEditingProduct] = useState(null);

  // ฟังก์ชันโหลดข้อมูลสินค้าใหม่จาก Backend API (ใช้เมื่อเปิดหน้าแรก หรือกดปุ่ม 'ลองใหม่')
  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "ไม่สามารถโหลดข้อมูลสินค้าได้");
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลสินค้าอัตโนมัติเมื่อ Component mount พร้อมระบบป้องกัน Race Condition (ignore flag)
  useEffect(() => {
    let ignore = false;
    getProducts()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "ไม่สามารถโหลดข้อมูลสินค้าได้");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // ฟังก์ชันจัดการการลบสินค้า
  const handleDelete = async (product) => {
    // แสดงกล่องยืนยันก่อนลบ
    const isConfirmed = await confirmDelete(product.name);
    if (!isConfirmed) return;

    try {
      // เรียก API ลบสินค้า
      await deleteProduct(product.id);
      // อัปเดต State ในหน้าเว็บทันทีโดยคัดกรองตัวที่ถูกลบออก (ไม่ต้องโหลด API ใหม่ทั้งหมด)
      setProducts((currentProducts) =>
        currentProducts.filter((p) => p.id !== product.id)
      );
      showSuccess("ลบสินค้าสำเร็จ", `นำ "${product.name}" ออกจากระบบแล้ว`);
    } catch (err) {
      showError(err, "ไม่สามารถลบสินค้าได้");
    }
  };

  // ฟังก์ชัน Callback เมื่อแก้ไขสินค้าใน Modal สำเร็จ: อัปเดตรายการสินค้าใน State ทันที
  const handleProductUpdated = (updated) => {
    setProducts((currentProducts) =>
      currentProducts.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* แถบนำทางด้านบน */}
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* ส่วนหัวแสดง Banner และสถิติสรุป (จำนวนรวม, มูลค่ารวม, ราคาเฉลี่ย) */}
        <ProductHeader products={products} />

        {/* จัดการสถานะการแสดงผล: แสดง Spinner ขณะโหลด, แสดง Alert หาก Error หรือแสดง ProductList */}
        <PageState loading={loading} error={error} onRetry={loadProducts}>
          <ProductList
            products={products}
            onEdit={(product) => setEditingProduct(product)}
            onDelete={handleDelete}
          />
        </PageState>
      </main>

      {/* Modal หน้าต่างแก้ไขข้อมูลสินค้าแบบ Inline */}
      <EditProductModal
        product={editingProduct}
        isOpen={Boolean(editingProduct)}
        onClose={() => setEditingProduct(null)}
        onUpdated={handleProductUpdated}
      />
    </div>
  );
};

export default ProductPage;

