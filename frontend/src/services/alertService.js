import Swal from "sweetalert2";

const getThemeStyles = () => {
  const isDark = document.documentElement.getAttribute("data-theme") !== "light";
  return {
    background: isDark ? "#1f2937" : "#ffffff",
    color: isDark ? "#f3f4f6" : "#1f2937",
  };
};

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

