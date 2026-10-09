import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import PageState from "../components/PageState";
import { getProduct, updateProduct } from "../services/productService";
import { showSuccess, showError } from "../services/alertService";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

/**
 * หน้าสำหรับแก้ไขสินค้าตามรหัส ID (Edit Product Page)
 * ดึง id จาก URL Parameter ผ่าน useParams() และโหลดข้อมูลเดิมมาเติมในฟอร์ม
 */
const EditProductPage = () => {
  // ดึงพารามิเตอร์ :id จาก URL เช่น /product/5/edit -> id = 5
  const { id } = useParams();
  const navigate = useNavigate();

  // State สำหรับเก็บข้อมูลในแบบฟอร์ม
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // State ควบคุมการโหลดและการแจ้งเตือน Error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ฟังก์ชันดึงข้อมูลสินค้าจาก Backend ตาม ID เพื่อนำมาแสดงใน Form
  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProduct(id);
      setName(data.name || "");
      setPrice(data.price ?? "");
      setDescription(data.description || "");
      setImage(data.image || "");
    } catch (err) {
      setError(err.message || "ไม่สามารถดึงข้อมูลสินค้าได้");
    } finally {
      setLoading(false);
    }
  };

  // โหลดข้อมูลสินค้าเมื่อ Component ถูกเรนเดอร์หรือเมื่อค่า id มีการเปลี่ยนแปลง
  useEffect(() => {
    let ignore = false;
    getProduct(id)
      .then((data) => {
        if (!ignore) {
          setName(data.name || "");
          setPrice(data.price ?? "");
          setDescription(data.description || "");
          setImage(data.image || "");
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || "ไม่สามารถดึงข้อมูลสินค้าได้");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  // ฟังก์ชันบันทึกการแก้ไขข้อมูลสินค้า (Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบชื่อสินค้า
    if (!name.trim()) {
      showError("กรุณากรอกชื่อสินค้า");
      return;
    }

    // ตรวจสอบราคา
    if (price === "" || isNaN(Number(price)) || Number(price) < 0) {
      showError("กรุณากรอกราคาที่ถูกต้องและไม่ติดลบ");
      return;
    }

    setIsSubmitting(true);
    try {
      // เรียก API บันทึกการแก้ไข (PUT /api/products/:id)
      await updateProduct(id, {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
      });
      await showSuccess("บันทึกการแก้ไขเรียบร้อยแล้ว", `อัปเดต "${name.trim()}" สำเร็จ`);
      navigate("/product");
    } catch (err) {
      showError(err, "ไม่สามารถบันทึกการแก้ไขได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ฟังก์ชันกดยกเลิก
  const handleCancel = () => {
    navigate("/product");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to="/product" className="gap-1.5 text-base-content/70 hover:text-primary">
                  <Home className="size-4" />
                  หน้าแรก
                </Link>
              </li>
              <li className="text-warning font-medium">
                <ChevronRight className="size-4 text-base-content/40" />
                แก้ไขสินค้า #{id}
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

        {/* จัดการสถานะโหลดและแสดงแบบฟอร์ม */}
        <PageState loading={loading} error={error} onRetry={fetchProduct}>
          <ProductForm
            editingId={id}
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
        </PageState>
      </main>
    </div>
  );
};

export default EditProductPage;