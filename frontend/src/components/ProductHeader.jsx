import { Package, TrendingUp, DollarSign, Sparkles } from "lucide-react";

/**
 * ส่วนหัวของหน้าสินค้า (Product Header Component)
 * แสดง Hero Banner ต้อนรับ และการ์ดสรุปสถิติมูลค่าสินค้าแบบเรียลไทม์
 */
const ProductHeader = ({ products = [] }) => {
  // คำนวณจำนวนสินค้าทั้งหมด
  const totalCount = products.length;

  // คำนวณมูลค่าสินค้ารวมทั้งหมดในคลัง (นำราคาทุกชิ้นมารวมกัน)
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

  // คำนวณราคาเฉลี่ยต่อชิ้น
  const avgPrice = totalCount > 0 ? Math.round(totalValue / totalCount) : 0;

  return (
    <header className="space-y-4">
      {/* ส่วน Banner หลักพร้อมเอฟเฟกต์ Gradient */}
      <div className="hero-gradient relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 size-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm ring-1 ring-white/20 mb-3">
            <Sparkles className="size-3.5 text-amber-300" />
            <span>ระบบบริหารจัดการสินค้าคงคลัง</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl text-white">
            Product Management System
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/80 sm:text-base">
            จัดการรายการสินค้า ราคา และรายละเอียดได้อย่างรวดเร็วในที่เดียว
          </p>
        </div>
      </div>

      {/* แถบการ์ดสรุปสถิติ (Stats Cards) - จะแสดงเมื่อมีสินค้าในระบบอย่างน้อย 1 รายการ */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* การ์ด 1: จำนวนสินค้าทั้งหมด */}
          <div className="card border border-base-300 bg-base-100 shadow-sm transition-all hover:shadow-md">
            <div className="card-body p-4 flex flex-row items-center gap-4">
              <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Package className="size-6" />
              </div>
              <div>
                <p className="text-xs text-base-content/60 font-medium">สินค้าทั้งหมด</p>
                <p className="text-xl font-bold">
                  {totalCount.toLocaleString()} <span className="text-xs font-normal text-base-content/50">รายการ</span>
                </p>
              </div>
            </div>
          </div>

          {/* การ์ด 2: มูลค่าสินค้ารวมทั้งหมด */}
          <div className="card border border-base-300 bg-base-100 shadow-sm transition-all hover:shadow-md">
            <div className="card-body p-4 flex flex-row items-center gap-4">
              <div className="grid size-12 place-items-center rounded-xl bg-success/10 text-success">
                <DollarSign className="size-6" />
              </div>
              <div>
                <p className="text-xs text-base-content/60 font-medium">มูลค่าสินค้ารวม</p>
                <p className="text-xl font-bold text-success">
                  ฿{totalValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* การ์ด 3: ราคาเฉลี่ยต่อรายการ */}
          <div className="card border border-base-300 bg-base-100 shadow-sm transition-all hover:shadow-md">
            <div className="card-body p-4 flex flex-row items-center gap-4">
              <div className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
                <TrendingUp className="size-6" />
              </div>
              <div>
                <p className="text-xs text-base-content/60 font-medium">ราคาเฉลี่ยต่อชิ้น</p>
                <p className="text-xl font-bold text-accent">
                  ฿{avgPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default ProductHeader;

