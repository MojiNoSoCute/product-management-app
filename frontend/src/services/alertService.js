import Swal from "sweetalert2";

export const confirmDelete = async (
  title = "ยืนยันการลบ",
  text = "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?"
) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "ลบข้อมูล",
    cancelButtonText: "ยกเลิก",
  });
  return result.isConfirmed;
};

export const showSuccess = (title = "สำเร็จ", text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const showError = (error, title = "เกิดข้อผิดพลาด") => {
  const message =
    typeof error === "string" ? error : error?.message || "เกิดข้อผิดพลาดในการดำเนินการ";
  return Swal.fire({
    icon: "error",
    title,
    text: message,
  });
};

export default {
  confirmDelete,
  showSuccess,
  showError,
};
