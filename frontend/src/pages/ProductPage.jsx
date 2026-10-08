import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import PageState from "../components/PageState";
import EditProductModal from "../components/EditProductModal";
import { deleteProduct, getProducts } from "../services/productService";
import { confirmDelete, showError, showSuccess } from "../services/alertService";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleDelete = async (product) => {
    const isConfirmed = await confirmDelete(product.name);
    if (!isConfirmed) return;

    try {
      await deleteProduct(product.id);
      setProducts((currentProducts) =>
        currentProducts.filter((p) => p.id !== product.id)
      );
      showSuccess("ลบสินค้าสำเร็จ", `นำ "${product.name}" ออกจากระบบแล้ว`);
    } catch (err) {
      showError(err, "ไม่สามารถลบสินค้าได้");
    }
  };

  const handleProductUpdated = (updated) => {
    setProducts((currentProducts) =>
      currentProducts.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <ProductHeader products={products} />

        <PageState loading={loading} error={error} onRetry={loadProducts}>
          <ProductList
            products={products}
            onEdit={(product) => setEditingProduct(product)}
            onDelete={handleDelete}
          />
        </PageState>
      </main>

      {/* Inline Edit Modal */}
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
