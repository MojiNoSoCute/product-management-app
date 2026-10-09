import { useState } from "react";
import {
  Pencil,
  PlusCircle,
  X,
  Image,
  Tag,
  DollarSign,
  FileText,
  ImageOff,
  Sparkles,
} from "lucide-react";

/**
 * รูปภาพตัวอย่างสำเร็จรูป (Preset Images) สำหรับกดเลือกทดสอบกรอกข้อมูลได้อย่างรวดเร็ว
 */
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
  {
    name: "Smartwatch",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Camera",
    url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
  },
];

/**
 * ProductForm Component
 * แบบฟอร์มเพิ่ม/แก้ไขสินค้า พร้อมช่องกรอกข้อมูลและหน้าจอแสดงตัวอย่างผลลัพธ์แบบเรียลไทม์ (Live Preview)
 */
function ProductForm({
  editingId,           // รหัสสินค้า (ถ้ามีค่า = กำลังแก้ไข, ถ้าไม่มี = กำลังเพิ่มใหม่)
  name,                // ชื่อสินค้า
  price,               // ราคาสินค้า
  description,         // รายละเอียด
  image,               // URL รูปภาพ
  isSubmitting,        // สถานะกำลังบันทึก (ปิดปุ่มเพื่อป้องกันกดซ้ำ)
  onNameChange,        // ฟังก์ชันเปลี่ยนชื่อ
  onPriceChange,       // ฟังก์ชันเปลี่ยนราคา
  onDescriptionChange, // ฟังก์ชันเปลี่ยนรายละเอียด
  onImageChange,       // ฟังก์ชันเปลี่ยนรูป
  onSubmit,            // ฟังก์ชัน Submit
  onCancel,            // ฟังก์ชันยกเลิก
}) {
  // State ตรวจจับข้อผิดพลาดในการโหลดรูปฝั่ง Live Preview
  const [imagePreviewError, setImagePreviewError] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* ฝั่งซ้าย: ส่วนแบบฟอร์มกรอกข้อมูล (กว้าง 2 คอลัมน์บนจอใหญ่) */}
      <section className="card border border-base-300 bg-base-100 shadow-sm lg:col-span-2">
        <div className="card-body p-5 sm:p-7">
          {/* ส่วนหัวของฟอร์ม */}
          <div className="mb-4 flex items-center gap-3 border-b border-base-200 pb-4">
            <div
              className={`grid size-12 place-items-center rounded-2xl ${
                editingId ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"
              }`}
            >
              {editingId ? <Pencil className="size-6" /> : <PlusCircle className="size-6" />}
            </div>
            <div>
              <h2 className="card-title text-xl font-bold">
                {editingId ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่เข้าสู่ระบบ"}
              </h2>
              <p className="text-xs text-base-content/60">
                {editingId
                  ? `กำลังแก้ไขสินค้ารหัส #${editingId}`
                  : "กรอกข้อมูลและระบุราคาสินค้าเพื่อจัดเก็บในคลัง"}
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* 1. ช่องกรอกชื่อสินค้า */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1.5">
                  <Tag className="size-4 text-primary" />
                  ชื่อสินค้า <span className="text-error">*</span>
                </span>
              </label>
              <input
                className="input input-bordered w-full focus:input-primary"
                type="text"
                required
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="เช่น คีย์บอร์ดไร้สาย หรือ MacBook Pro"
              />
            </div>

            {/* 2. ช่องกรอกราคาสินค้า */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1.5">
                  <DollarSign className="size-4 text-success" />
                  ราคา (บาท) <span className="text-error">*</span>
                </span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-bold text-success">
                  ฿
                </span>
                <input
                  className="input input-bordered w-full pl-8 focus:input-primary"
                  type="number"
                  step="any"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => onPriceChange(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* 3. ช่องกรอก URL รูปภาพ */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1.5">
                  <Image className="size-4 text-accent" />
                  URL รูปภาพ
                </span>
              </label>
              <input
                className="input input-bordered w-full focus:input-primary text-sm"
                type="url"
                value={image}
                onChange={(e) => {
                  setImagePreviewError(false);
                  onImageChange(e.target.value);
                }}
                placeholder="https://images.unsplash.com/..."
              />
              {/* ปุ่มเลือกภาพตัวอย่างสำเร็จรูป (Preset Buttons) */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-base-content/50 flex items-center gap-1 mr-1">
                  <Sparkles className="size-3" /> ตัวอย่าง:
                </span>
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setImagePreviewError(false);
                      onImageChange(preset.url);
                    }}
                    className="btn btn-xs btn-outline btn-ghost text-xs"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. ช่องกรอกรายละเอียดสินค้า */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1.5">
                  <FileText className="size-4 text-base-content/60" />
                  รายละเอียดสินค้า
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full focus:textarea-primary text-sm"
                value={description}
                onChange={(e) => onPriceChange && onDescriptionChange(e.target.value)}
                placeholder="ระบุรายละเอียดคุณสมบัติหรือสเปกสินค้า..."
                rows="3"
              />
            </div>

            {/* 5. ปุ่มแอ็กชันของฟอร์ม (ยกเลิก และ บันทึก) */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-4 border-t border-base-200">
              <button
                className="btn btn-ghost w-full sm:w-auto"
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                <X className="size-4" /> ยกเลิก
              </button>
              <button
                className={`btn ${
                  editingId ? "btn-warning" : "btn-primary"
                } w-full sm:w-auto shadow-md`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    กำลังบันทึก...
                  </>
                ) : editingId ? (
                  <>
                    <Pencil className="size-4" /> บันทึกการแก้ไข
                  </>
                ) : (
                  <>
                    <PlusCircle className="size-4" /> บันทึกสินค้า
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ฝั่งขวา: การ์ดแสดงผลลัพธ์ตัวอย่างแบบเรียลไทม์ (Live Preview) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
            ตัวอย่างการแสดงผลจริง (Live Preview)
          </span>
          <span className="badge badge-outline badge-xs text-base-content/50">Preview</span>
        </div>

        <article className="card overflow-hidden border border-base-300 bg-base-100 shadow-md">
          {/* รูปภาพพรีวิว */}
          <figure className="relative aspect-[16/10] bg-base-200 overflow-hidden">
            {image && !imagePreviewError ? (
              <img
                src={image}
                alt={name || "ตัวอย่างสินค้า"}
                onError={() => setImagePreviewError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-base-200 text-base-content/30">
                <div className="flex flex-col items-center gap-1">
                  <ImageOff className="size-10" />
                  <span className="text-xs font-medium">ไม่มีรูปภาพ</span>
                </div>
              </div>
            )}
            <div className="absolute top-2.5 left-2.5">
              <span className="badge badge-neutral badge-sm font-mono font-semibold shadow-sm">
                #{editingId || "NEW"}
              </span>
            </div>
            <div className="absolute bottom-2.5 right-2.5">
              <span className="badge badge-success badge-lg font-bold shadow-md text-white">
                ฿{price ? Number(price).toLocaleString() : "0"}
              </span>
            </div>
          </figure>

          {/* ข้อความและรายละเอียดพรีวิว */}
          <div className="card-body gap-2 p-5">
            <h3 className="truncate text-lg font-bold text-base-content">
              {name || "ชื่อสินค้าตัวอย่าง"}
            </h3>
            <p className="line-clamp-2 min-h-[2.5rem] text-sm text-base-content/70">
              {description || "รายละเอียดสินค้าจะแสดงที่นี่..."}
            </p>
            <div className="card-actions justify-end border-t border-base-200 pt-3">
              <span className="btn btn-sm btn-ghost btn-disabled text-xs">
                ปุ่มจัดการจะแสดงในหน้ารายการ
              </span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default ProductForm;

