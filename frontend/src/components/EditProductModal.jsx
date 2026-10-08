import { useState } from "react";
import { X, Pencil, DollarSign, Tag, Image, FileText, Sparkles, ImageOff } from "lucide-react";
import { updateProduct } from "../services/productService";
import { showSuccess, showError } from "../services/alertService";

const PRESET_IMAGES = [
  {
    name: "MacBook",
    url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Keyboard",
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Headphones",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
];

const EditProductModalContent = ({ product, onClose, onUpdated }) => {
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price ?? "");
  const [description, setDescription] = useState(product.description || "");
  const [image, setImage] = useState(product.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      const updated = await updateProduct(product.id, {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
      });
      await showSuccess("บันทึกการแก้ไขเรียบร้อยแล้ว", `อัปเดต "${name.trim()}" สำเร็จ`);
      if (onUpdated) onUpdated(updated);
      onClose();
    } catch (err) {
      showError(err, "ไม่สามารถบันทึกการแก้ไขได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box max-w-2xl border border-base-300 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="grid size-10 place-items-center rounded-xl bg-warning/15 text-warning">
              <Pencil className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-base-content">
                แก้ไขสินค้า <span className="font-mono text-base-content/50">#{product.id}</span>
              </h3>
              <p className="text-xs text-base-content/60">อัปเดตรายละเอียดและราคาของสินค้า</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm"
            disabled={isSubmitting}
            aria-label="ปิดหน้าต่าง"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Product Name */}
            <div className="form-control sm:col-span-2">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1.5 text-xs sm:text-sm">
                  <Tag className="size-3.5 text-primary" />
                  ชื่อสินค้า <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ระบุชื่อสินค้า..."
                className="input input-bordered input-sm sm:input-md w-full focus:input-primary"
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1.5 text-xs sm:text-sm">
                  <DollarSign className="size-3.5 text-success" />
                  ราคา (บาท) <span className="text-error">*</span>
                </span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-bold text-success text-sm">
                  ฿
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="input input-bordered input-sm sm:input-md w-full pl-8 focus:input-primary"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1.5 text-xs sm:text-sm">
                  <Image className="size-3.5 text-accent" />
                  URL รูปภาพ
                </span>
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => {
                  setImageError(false);
                  setImage(e.target.value);
                }}
                placeholder="https://..."
                className="input input-bordered input-sm sm:input-md w-full focus:input-primary text-xs"
              />
            </div>
          </div>

          {/* Quick preset images */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-base-content/50 flex items-center gap-1">
              <Sparkles className="size-3" /> ตัวอย่างรูป:
            </span>
            {PRESET_IMAGES.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setImageError(false);
                  setImage(preset.url);
                }}
                className="btn btn-xs btn-outline btn-ghost"
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium flex items-center gap-1.5 text-xs sm:text-sm">
                <FileText className="size-3.5 text-base-content/60" />
                รายละเอียดสินค้า
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ระบุรายละเอียดเพิ่มเติม..."
              rows="3"
              className="textarea textarea-bordered w-full text-sm focus:textarea-primary"
            />
          </div>

          {/* Image Thumbnail Preview in Modal */}
          {image && (
            <div className="rounded-xl border border-base-200 bg-base-200/50 p-2.5 flex items-center gap-3">
              <div className="size-14 rounded-lg overflow-hidden bg-base-300 shrink-0">
                {!imageError ? (
                  <img
                    src={image}
                    alt="Preview"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-base-content/40">
                    <ImageOff className="size-5" />
                  </div>
                )}
              </div>
              <div className="min-w-0 text-xs">
                <p className="font-semibold text-base-content truncate">{name || "ตัวอย่างรูปภาพ"}</p>
                <p className="text-success font-bold">฿{price ? Number(price).toLocaleString() : "0"}</p>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="modal-action border-t border-base-200 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn btn-ghost btn-sm sm:btn-md"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-warning btn-sm sm:btn-md gap-2 shadow-md"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Pencil className="size-4" />
                  บันทึกการแก้ไข
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop bg-black/60 backdrop-blur-xs" onClick={onClose} />
    </div>
  );
};

const EditProductModal = ({ product, isOpen, onClose, onUpdated }) => {
  if (!isOpen || !product) return null;

  return (
    <EditProductModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onUpdated={onUpdated}
    />
  );
};

export default EditProductModal;
