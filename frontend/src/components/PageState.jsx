/**
 * PageState Component (Wrapper สำหรับจัดการ State ของหน้าเว็บ)
 * ทำหน้าที่สลับหน้าจอตามสถานะ:
 * 1. ถ้า loading = true -> แสดง Spinner กำลังโหลดข้อมูล
 * 2. ถ้า error มีค่า -> แสดงกล่องข้อความแจ้งเตือน Error พร้อมปุ่ม 'ลองใหม่' (onRetry)
 * 3. ถ้าปกติ -> แสดง children (เนื้อหาข้างในตามปกติ)
 */
const PageState = ({ loading, error, onRetry, children }) => {
  // สถานะ 1: กำลังโหลดข้อมูล
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/70">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  // สถานะ 2: เกิดข้อผิดพลาด
  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{typeof error === "string" ? error : error?.message || "เกิดข้อผิดพลาด"}</span>
        {onRetry && (
          <button className="btn btn-sm btn-outline ml-auto" onClick={onRetry}>
            ลองใหม่
          </button>
        )}
      </div>
    );
  }

  // สถานะ 3: โหลดข้อมูลสำเร็จ แสดงเนื้อหาภายใน
  return children || null;
};

export default PageState;

