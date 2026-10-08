import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import ProductHeader from "../components/ProductHeader";
import PageState from "../components/PageState";
import { getProduct, updateProduct } from "../services/productService";
import { showSuccess, showError } from "../services/alertService";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || price === "") {
      showError("กรุณากรอกชื่อสินค้าและราคาให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProduct(id, {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
      });
      await showSuccess("บันทึกการแก้ไขเรียบร้อยแล้ว");
      navigate("/product");
    } catch (err) {
      showError(err);
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
      </div>
    </main>
  );
};

export default EditProductPage;