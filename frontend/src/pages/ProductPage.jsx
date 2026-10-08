import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import PageState from "../components/PageState";
import { deleteProduct, getProducts } from "../services/productService";
import { confirmDelete, showError, showSuccess } from "../services/alertService";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!(await confirmDelete())) return;
    try {
      await deleteProduct(id);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );
      showSuccess("ลบสินค้าเรียบร้อยแล้ว");
    } catch (err) {
      showError(err);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ProductHeader />
        <div className="flex justify-end">
          <Link className="btn btn-primary" to="/product/new">
            เพิ่มสินค้า
          </Link>
        </div>
        <PageState loading={loading} error={error} onRetry={loadProducts}>
          <ProductList
            products={products}
            onEdit={(product) => navigate(`/product/${product.id}/edit`)}
            onDelete={handleDelete}
          />
        </PageState>
      </div>
    </main>
  );
};

export default ProductPage;
