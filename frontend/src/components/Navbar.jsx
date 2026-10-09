import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Boxes, Plus, Sun, Moon } from "lucide-react";

/**
 * Navigation Bar Component
 * แสดงโลโก้, ชื่อระบบ, ปุ่มสลับธีม (Light/Dark Mode) ที่จำค่าผ่าน localStorage
 * และปุ่มเพิ่มสินค้าใหม่ (จะซ่อนอัตโนมัติหากอยู่ในหน้า /product/new อยู่แล้ว)
 */
const Navbar = () => {
  // ดึงตำแหน่ง URL ปัจจุบัน
  const location = useLocation();

  // State จัดการธีม โดยอ่านค่าเริ่มต้นจาก localStorage (ถ้าไม่มีจะใช้ธีม "dark")
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "dark";
  });

  // อัปเดต attribute บนแท็ก <html> และบันทึกลง localStorage เมื่อธีมเปลี่ยน
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  // สลับธีมระหว่าง dark และ light
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-base-300 bg-base-100/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* โลโก้และชื่อแบรนด์ ProductHub */}
        <Link
          to="/product"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-tr from-primary to-accent text-primary-content shadow-md shadow-primary/25">
            <Boxes className="size-5 transition-transform group-hover:rotate-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight">ProductHub</span>
              <span className="badge badge-primary badge-xs font-semibold">CRUD</span>
            </div>
            <p className="text-xs text-base-content/60">ระบบจัดการสต็อกสินค้า</p>
          </div>
        </Link>

        {/* ปุ่มควบคุมฝั่งขวา */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ปุ่มสลับโหมดสว่าง/โหมดมืด (Theme Toggle Button) */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md"
            title={theme === "dark" ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
            aria-label="สลับธีม"
          >
            {theme === "dark" ? (
              <Sun className="size-5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="size-5 text-indigo-500 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* ปุ่มเพิ่มสินค้าใหม่ (แสดงเฉพาะเมื่อไม่ได้อยู่ในหน้าเพิ่มสินค้า) */}
          {location.pathname !== "/product/new" && (
            <Link
              to="/product/new"
              className="btn btn-primary btn-sm sm:btn-md gap-1.5 shadow-md shadow-primary/20"
            >
              <Plus className="size-4" />
              <span>เพิ่มสินค้า</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

