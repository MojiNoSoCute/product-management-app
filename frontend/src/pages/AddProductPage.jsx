import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/productService";
import { showSuccess, showError } from "../services/alertService";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showError("กรุณากรอกชื่อสินค้า");
      return;
    }
    if (price === "" || isNaN(Number(price)) || Number(price) < 0) {
      showError("กรุณากรอกราคาที่ถูกต้องและไม่ติดลบ");
      return;
    }

    setIsSubmitting(true);
    try {
      await createProduct({
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
      });
      await showSuccess("เพิ่มสินค้าเรียบร้อยแล้ว", `เพิ่ม "${name.trim()}" สำเร็จ`);
      navigate("/product");
    } catch (error) {
      showError(error, "ไม่สามารถเพิ่มสินค้าได้");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Form and Live Preview */}
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