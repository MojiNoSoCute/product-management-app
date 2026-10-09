/**
 * ไฟล์ Entry Point หลักของฝั่ง Frontend (React Application)
 * ทำหน้าที่เมานต์ (Mount) Root Component เข้าสู่ DOM จริงใน index.html
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // สไตล์ชีตหลักรวมถึงการตั้งค่า DaisyUI / Tailwind
import App from './App.jsx' // Component หลักที่บรรจุ Routing และ Layout ทั้งหมด

// ค้นหา element ที่มี id เป็น 'root' จาก index.html แล้ว render React App ลงไป
createRoot(document.getElementById('root')).render(
  // StrictMode ช่วยตรวจสอบและแจ้งเตือนข้อผิดพลาดหรือ Lifecycle ที่ไม่ปลอดภัยในระหว่าง Development
  <StrictMode>
    <App />
  </StrictMode>,
)

