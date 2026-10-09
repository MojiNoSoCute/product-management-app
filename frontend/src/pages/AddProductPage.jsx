import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/productService";
import { showSuccess, showError } from "../services/alertService";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

/**
 * หน้าสำหรับเพิ่มสินค้าใหม่เข้าสู่ระบบ (Add Product Page)
 * จัดการ State ของฟอร์ม, การตรวจสอบข้อมูล (Validation) และการส่งข้อมูลไปยัง API
 */
const AddProductPage = () => {
  // Hook สำหรับเปลี่ยนหน้า (Navigation) ใน React Router
  const navigate = useNavigate();

  // State สำหรับเก็บข้อมูลในฟอร์ม
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  // State ป้องกันการกด Submit ซ้ำขณะกำลังบันทึก
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ฟังก์ชันจัดการเมื่อผู้ใช้กดส่งแบบฟอร์ม (Submit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบความถูกต้องของชื่อสินค้า
    if (!name.trim()) {
      showError("กรุณากรอกชื่อสินค้า");
      return;
    }

    // ตรวจสอบความถูกต้องของราคาสินค้า (ต้องเป็นตัวเลขและไม่ติดลบ)
    if (price === "" || isNaN(Number(price)) || Number(price) < 0) {
      showError("กรุณากรอกราคาที่ถูกต้องและไม่ติดลบ");
      return;
    }

    setIsSubmitting(true);
    try {
      // เรียก API เพิ่มสินค้า
      await createProduct({
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
      });

      // แสดง Popup แจ้งเตือนสำเร็จ
      await showSuccess("เพิ่มสินค้าเรียบร้อยแล้ว", `เพิ่ม "${name.trim()}" สำเร็จ`);
      // ย้ายหน้ากลับไปยังหน้ารายการสินค้า (/product)
      navigate("/product");
    } catch (error) {
      showError(error, "ไม่สามารถเพิ่มสินค้าได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ฟังก์ชันกดยกเลิก: พากลับไปหน้ารายการสินค้า
  const handleCancel = () => {
    navigate("/product");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb: แถบระบุตำแหน่งหน้า */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to="/product" className="gap-1.5 text-base-content/70 hover:text-primary">
                  <Home className="size-4" />
                  หน้าแรก
                </Link>
              </li>
              <li className="text-primary font-medium">
                <ChevronRight className="size-4 text-base-content/40" />
                เพิ่มสินค้าใหม่
              </li>
            </ul>
          </div>
          <Link
            to="/product"
            className="btn btn-ghost btn-sm gap-1.5 self-start sm:self-auto text-base-content/70 hover:text-base-content"
          >
            <ArrowLeft className="size-4" />
            กลับไปหน้ารายการ
          </Link>
        </div>

        {/* ฟอร์มกรอกข้อมูลสินค้าและ Live Preview */}
        <ProductForm
          name={name}
          price={price}
          description={description}
          image={image}
          isSubmitting={isSubmitting}
          onNameChange={setName}
          onPriceChange={setPrice}
          onDescriptionChange={setDescription}
          onImageChange={setImage}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
};

export default AddProductPage;