import Swal from "sweetalert2";

/**
 * ฟังก์ชันดึงสีของ Modal ให้ตรงกับ Theme ปัจจุบัน (Dark / Light)
 * โดยตรวจสอบจาก attribute data-theme บนแท็ก <html>
 */
const getThemeStyles = () => {
  const isDark = document.documentElement.getAttribute("data-theme") !== "light";
  return {
    background: isDark ? "#1f2937" : "#ffffff",
    color: isDark ? "#f3f4f6" : "#1f2937",
  };
};

/**
 * 1. กล่องข้อความแจ้งเตือนยืนยันการลบสินค้า (Confirm Delete Dialog)
 * แสดงปุ่มยืนยันสีแดง และปุ่มยกเลิก คืนค่า true หากผู้ใช้กดยืนยัน
 */
export const confirmDelete = async (
  productName = "สินค้านี้",
  title = "ยืนยันการลบสินค้า"
) => {
  const styles = getThemeStyles();
  const result = await Swal.fire({
    title,
    html: `คุณแน่ใจหรือไม่ว่าต้องการลบ <b>"${productName}"</b>?<br/><span class="text-sm opacity-70">การกระทำนี้ไม่สามารถย้อนกลับได้</span>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "ลบสินค้านี้",
    cancelButtonText: "ยกเลิก",
    background: styles.background,
    color: styles.color,
    reverseButtons: true,
    focusCancel: true,
  });
  return result.isConfirmed;
};

/**
 * 2. การแจ้งเตือนทำงานสำเร็จ (Toast Notification)
 * แสดงข้อความมุมขวาบน ปิดเองอัตโนมัติภายใน 1.6 วินาที
 */
export const showSuccess = (title = "สำเร็จ", text = "") => {
  const styles = getThemeStyles();
  return Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1600,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
    background: styles.background,
    color: styles.color,
  });
};

/**
 * 3. กล่องข้อความแจ้งเตือนข้อผิดพลาด (Error Modal)
 * รองรับทั้ง Error Object และ String ทั่วไป
 */
export const showError = (error, title = "เกิดข้อผิดพลาด") => {
  const styles = getThemeStyles();
  const message =
    typeof error === "string" ? error : error?.message || "เกิดข้อผิดพลาดในการดำเนินการ";
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: "เข้าใจแล้ว",
    confirmButtonColor: "#3b82f6",
    background: styles.background,
    color: styles.color,
  });
};

export default {
  confirmDelete,
  showSuccess,
  showError,
};


