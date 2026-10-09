import { useState, useMemo } from "react";
import {
  Package,
  Pencil,
  Trash2,
  Search,
  ArrowUpDown,
  LayoutGrid,
  List,
  X,
  ImageOff,
  Plus,
} from "lucide-react";
import { Link } from "react-router";

/**
 * ImageCard Component: แสดงรูปภาพสินค้า พร้อมระบบ Fallback
 * หาก URL ผิดพลาด โหลดไม่ขึ้น หรือไม่มี URL จะแสดง Icon รูปภาพว่างแทนอัตโนมัติ
 */
const ImageCard = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  // กรณีไม่มี URL รูป หรือรูปภาพโหลดไม่สำเร็จ (Error)
  if (!src || hasError) {
    return (
      <div className="grid h-full w-full place-items-center bg-base-200 text-base-content/30">
        <div className="flex flex-col items-center gap-1">
          <ImageOff className="size-8" />
          <span className="text-xs font-medium">ไม่มีรูปภาพ</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
  );
};

/**
 * ProductList Component: แสดงรายการสินค้าทั้งหมด
 * รองรับการค้นหา (Search), การเรียงลำดับ (Sorting), และสลับมุมมองแบบการ์ด (Grid) หรือตาราง (Table)
 */
const ProductList = ({ products, onEdit, onDelete }) => {
  // State คำค้นหา
  const [searchTerm, setSearchTerm] = useState("");
  // State รูปแบบการเรียงลำดับ เช่น id-asc, price-desc
  const [sortBy, setSortBy] = useState("id-asc");
  // State มุมมองการแสดงผล: 'grid' (การ์ด) หรือ 'table' (ตาราง)
  const [viewMode, setViewMode] = useState("grid");

  // กรองและเรียงลำดับสินค้าด้วย useMemo เพื่อประสิทธิภาพ (คำนวณใหม่เฉพาะเมื่อ dependencies เปลี่ยน)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. ระบบค้นหา (กรองตามชื่อ, รายละเอียด หรือรหัส ID)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.id?.toString().includes(term)
      );
    }

    // 2. ระบบเรียงลำดับ (Sorting)
    result.sort((a, b) => {
      switch (sortBy) {
        case "id-desc":
          return b.id - a.id;
        case "price-asc":
          return Number(a.price) - Number(b.price);
        case "price-desc":
          return Number(b.price) - Number(a.price);
        case "name-asc":
          return a.name.localeCompare(b.name, "th");
        case "name-desc":
          return b.name.localeCompare(a.name, "th");
        case "id-asc":
        default:
          return a.id - b.id;
      }
    });

    return result;
  }, [products, searchTerm, sortBy]);

  // กรณีในระบบยังไม่มีสินค้าเลย (Empty State)
  if (products.length === 0) {
    return (
      <div className="card border-2 border-dashed border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center py-16 text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Package className="size-9" />
          </div>
          <h2 className="card-title mt-4 text-xl font-bold">ยังไม่มีข้อมูลสินค้าในระบบ</h2>
          <p className="max-w-md text-sm text-base-content/60">
            ระบบยังว่างอยู่ เริ่มต้นเพิ่มรายการสินค้าชิ้นแรกเพื่อเริ่มจัดการสต็อกและราคาได้เลย
          </p>
          <div className="mt-4">
            <Link to="/product/new" className="btn btn-primary gap-2 shadow-md shadow-primary/20">
              <Plus className="size-4" />
              เพิ่มสินค้าชิ้นแรก
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <section className="space-y-4">
      {/* แถบเครื่องมือ: ค้นหา, เรียงลำดับ และสลับมุมมอง (Search & Controls Toolbar) */}
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* ช่องค้นหาสินค้า (Search Input) */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาชื่อสินค้า, รายละเอียด หรือรหัส #ID..."
                className="input input-bordered input-sm sm:input-md w-full pl-9 pr-8"
              />
              {/* ปุ่มล้างคำค้นหา (Clear button) */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn btn-ghost btn-circle btn-xs absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  aria-label="ล้างการค้นหา"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* ส่วนควบคุมการเรียงลำดับและมุมมอง */}
            <div className="flex items-center gap-2">
              {/* Dropdown เลือกรูปแบบการจัดเรียง (Sort Selector) */}
              <div className="relative flex items-center">
                <ArrowUpDown className="pointer-events-none absolute left-3 size-4 text-base-content/50" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered select-sm sm:select-md pl-9 text-xs sm:text-sm font-medium"
                >
                  <option value="id-asc">รหัสสินค้า (น้อย → มาก)</option>
                  <option value="id-desc">รหัสสินค้า (มาก → น้อย)</option>
                  <option value="price-asc">ราคา (ต่ำสุด → สูงสุด)</option>
                  <option value="price-desc">ราคา (สูงสุด → ต่ำสุด)</option>
                  <option value="name-asc">ชื่อสินค้า (ก - ฮ)</option>
                  <option value="name-desc">ชื่อสินค้า (ฮ - ก)</option>
                </select>
              </div>

              {/* ปุ่มสลับมุมมองระหว่าง Grid (การ์ด) กับ Table (ตาราง) */}
              <div className="join border border-base-300">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`btn btn-sm join-item ${
                    viewMode === "grid" ? "btn-primary" : "btn-ghost"
                  }`}
                  title="มุมมองการ์ด (Grid)"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`btn btn-sm join-item ${
                    viewMode === "table" ? "btn-primary" : "btn-ghost"
                  }`}
                  title="มุมมองตาราง (Table)"
                  aria-label="Table view"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* แถบแสดงจำนวนรายการที่ค้นพบ */}
          <div className="mt-2 flex items-center justify-between text-xs text-base-content/60">
            <span>
              แสดง <b>{filteredProducts.length}</b> จากทั้งหมด {products.length} รายการ
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="link link-hover text-primary font-medium"
              >
                ล้างคำค้นหาทั้งหมด
              </button>
            )}
          </div>
        </div>
      </div>

      {/* กรณีค้นหาแล้วไม่พบสินค้าที่ตรงกัน */}
      {filteredProducts.length === 0 && (
        <div className="card border border-base-300 bg-base-100 shadow-sm py-12 text-center">
          <div className="card-body items-center">
            <Search className="size-10 text-base-content/30 mb-2" />
            <h3 className="text-lg font-bold">ไม่พบสินค้าที่ตรงกับคำค้นหา</h3>
            <p className="text-sm text-base-content/60">
              ไม่มีสินค้าที่ตรงกับ &ldquo;{searchTerm}&rdquo; ลองตรวจสอบตัวสะกดหรือค้นหาคำอื่น
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="btn btn-outline btn-sm mt-3"
            >
              ล้างการค้นหา
            </button>
          </div>
        </div>
      )}

      {/* 1. มุมมองแบบการ์ด (Grid View) */}
      {viewMode === "grid" && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group card card-hover-effect overflow-hidden border border-base-300 bg-base-100 shadow-sm hover:border-primary/40"
            >

              {/* Product Image */}
              <figure className="relative aspect-[16/10] bg-base-200 overflow-hidden">
                <ImageCard src={product.image} alt={product.name} />
                {/* Badges Overlay */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="badge badge-neutral badge-sm font-mono font-semibold shadow-sm backdrop-blur-md">
                    #{product.id}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="badge badge-success badge-lg font-bold shadow-md text-white">
                    ฿{Number(product.price).toLocaleString()}
                  </span>
                </div>
              </figure>

              {/* Card Body */}
              <div className="card-body gap-2.5 p-5">
                <div>
                  <h3
                    className="truncate text-lg font-bold text-base-content group-hover:text-primary transition-colors"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-base-content/70">
                    {product.description || "ไม่มีรายละเอียดเพิ่มเติมสำหรับสินค้านี้"}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="card-actions justify-end border-t border-base-200 pt-3 mt-1">
                  <button
                    onClick={() => onEdit(product)}
                    className="btn btn-sm btn-ghost text-primary hover:bg-primary/10 gap-1.5"
                    aria-label={`แก้ไขสินค้า ${product.name}`}
                  >
                    <Pencil className="size-3.5" />
                    <span>แก้ไข</span>
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="btn btn-sm btn-ghost text-error hover:bg-error/10 gap-1.5"
                    aria-label={`ลบสินค้า ${product.name}`}
                  >
                    <Trash2 className="size-3.5" />
                    <span>ลบ</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 2. มุมมองแบบตาราง (Table View) */}
      {viewMode === "table" && filteredProducts.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <table className="table table-zebra table-sm sm:table-md">
            <thead>
              <tr className="bg-base-200/60 text-base-content/70 text-xs font-semibold uppercase tracking-wider">
                <th className="w-16 text-center">#ID</th>
                <th className="w-20 text-center">รูปภาพ</th>
                <th>ชื่อสินค้า</th>
                <th className="hidden md:table-cell">รายละเอียด</th>
                <th className="text-right">ราคา</th>
                <th className="w-32 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover">
                  {/* รหัสสินค้า */}
                  <td className="text-center font-mono font-medium text-base-content/60">
                    #{product.id}
                  </td>
                  {/* รูปภาพขนาด Thumbnail */}
                  <td className="text-center">
                    <div className="avatar">
                      <div className="mask mask-squircle size-12 bg-base-200">
                        <ImageCard src={product.image} alt={product.name} />
                      </div>
                    </div>
                  </td>
                  {/* ชื่อสินค้า */}
                  <td>
                    <div className="font-bold text-base-content">{product.name}</div>
                    <div className="text-xs text-base-content/50 md:hidden line-clamp-1">
                      {product.description || "-"}
                    </div>
                  </td>
                  {/* รายละเอียดสินค้า */}
                  <td className="hidden md:table-cell max-w-xs truncate text-sm text-base-content/70">
                    {product.description || "-"}
                  </td>
                  {/* ราคาสินค้า */}
                  <td className="text-right font-bold text-success text-base whitespace-nowrap">
                    ฿{Number(product.price).toLocaleString()}
                  </td>
                  {/* ปุ่มแก้ไขและลบสินค้า */}
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onEdit(product)}
                        className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10"
                        title="แก้ไขสินค้า"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10"
                        title="ลบสินค้า"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </section>
  );
};

export default ProductList;
