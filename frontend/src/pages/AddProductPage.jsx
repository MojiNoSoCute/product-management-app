import { useState } from "react";
import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import ProductHeader from "../components/ProductHeader";
import { createProduct } from "../services/productService";
import { showSuccess, showError } from "../services/alertService";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      showError("กรุณากรอกชื่อสินค้าและราคาให้ครบถ้วน");
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
      await showSuccess("เพิ่มสินค้าเรียบร้อยแล้ว");
      navigate("/product");
    } catch (error) {
      showError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/product");
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ProductHeader />
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
      </div>
    </main>
  );
};

export default AddProductPage;