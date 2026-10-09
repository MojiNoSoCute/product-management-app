# 📦 ระบบจัดการข้อมูลสินค้า (Product Management Application)

แอปพลิเคชันเว็บแบบ Full-stack สำหรับจัดการข้อมูลสินค้า (Product Management System) ครบวงจร ทั้งการดูรายการ, ค้นหา, เพิ่ม, แก้ไข และลบสินค้า (CRUD Operations) สร้างขึ้นด้วยสถาปัตยกรรมที่ทันสมัย รองรับการรันทั้งในรูปแบบ Local Development ปกติ และผ่าน Docker / Docker Compose

---

## 📑 สารบัญ
1. [เทคโนโลยีที่ใช้ (Tech Stack)](#-เทคโนโลยีที่ใช้-tech-stack)
2. [โครงสร้างของโปรเจกต์ (Project Structure)](#-โครงสร้างของโปรเจกต์-project-structure)
3. [คำอธิบายการทำงานของโค้ดแต่ละส่วน (Code Explanation)](#-คำอธิบายการทำงานของโค้ดแต่ละส่วน-code-explanation)
   - [Backend (Node.js & Express)](#1-ฝั่ง-backend-nodejs--express)
   - [Frontend (React & Vite)](#2-ฝั่ง-frontend-react--vite)
4. [วิธีการติดตั้งและรันโปรเจกต์ (Installation & Setup)](#-วิธีการติดตั้งและรันโปรเจกต์-installation--setup)
   - [วิธีที่ 1: รันด้วย Docker Compose (แนะนำ)](#วิธีที่-1-รันด้วย-docker-compose-สะดวกและรวดเร็วที่สุด)
   - [วิธีที่ 2: รันแบบ Manual (Local Environment)](#วิธีที่-2-รันแบบ-manual-local-development)
5. [การตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables)](#-การตั้งค่าตัวแปรสภาพแวดล้อม-environment-variables)
6. [API Endpoints Reference](#-api-endpoints-reference)

---

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)

### **Frontend**
- **React 19** + **Vite** : เครื่องมือพัฒนาเว็บแอปพลิเคชันฝั่งไคลเอนต์ที่มีประสิทธิภาพสูงและโหลดเร็ว (HMR)
- **Tailwind CSS** + **DaisyUI** : ชุด Utility-first CSS และ Component Library สำหรับสร้าง UI สวยงาม รองรับ Responsive
- **Lucide React** : คลังไอคอนโมเดิร์น สวยงามและมีขนาดเล็ก
- **Axios** : HTTP Client สำหรับรับส่งข้อมูลกับ Backend REST API
- **SweetAlert2** : ป๊อปอัปแจ้งเตือน (Modal Alert/Confirm) ที่สวยงามและตอบสนองได้ดี

### **Backend**
- **Node.js (v22)** + **Express.js** : เฟรมเวิร์กเซิร์ฟเวอร์แบบ Minimalist ยอดนิยม
- **Sequelize ORM** : Object-Relational Mapping สำหรับจัดการและสร้าง Table ในฐานข้อมูล PostgreSQL อัตโนมัติ (`sync()`)
- **pg & pg-hstore** : PostgreSQL Client Driver สำหรับ Node.js
- **CORS** : Middleware สำหรับเปิดให้ Frontend ต่างโดเมน/พอร์ตเรียกใช้งานได้
- **Dotenv** : โหลดการตั้งค่า Environment Variables จากไฟล์ `.env`
- **Nodemon** : เครื่องมือรีสตาร์ตเซิร์ฟเวอร์ให้อัตโนมัติเมื่อมีการแก้ไขโค้ด

### **Database & DevOps**
- **PostgreSQL 15** : ระบบจัดการฐานข้อมูลเชิงสัมพันธ์ (Relational Database)
- **Docker & Docker Compose** : ระบบจัดการ Containerize จัดการฐานข้อมูลและแอปพลิเคชันให้พร้อมใช้งานในคำสั่งเดียว

---

## 📁 โครงสร้างของโปรเจกต์ (Project Structure)

```text
product-management-app/
├── docker-compose.yml           # ไฟล์คอนฟิกสำหรับรัน Services (PostgreSQL, Backend, Frontend)
├── .env.example                 # ตัวอย่าง Environment Variables สำหรับ Root / Docker
├── .env                         # ไฟล์ Environment Variables หลัก
│
├── backend/                     # ส่วนของ Backend Server (Node.js + Express)
│   ├── config/
│   │   └── database.js          # จัดการการเชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน Sequelize
│   ├── controller/
│   │   └── productController.js # ควบคุม Business Logic การทำงานของ CRUD Products
│   ├── model/
│   │   └── productModel.js      # นิยาม Schema และ Field ของตาราง Product
│   ├── router/
│   │   └── productRouter.js     # กำหนดเส้นทาง URL RESTful API (/api/products)
│   ├── index.js                 # Entry Point หลักของ Express เซิร์ฟเวอร์
│   ├── nodemon.json             # ตั้งค่าการมอนิเตอร์ไฟล์ของ Nodemon
│   ├── package.json             # รายการ Dependencies และ Scripts ของ Backend
│   └── .env.example             # ตัวอย่างไฟล์คอนฟิกสำหรับ Backend
│
└── frontend/                    # ส่วนของ Frontend Client (React + Vite)
    ├── public/                  # Static Assets เช่น Favicon, Icons
    ├── src/
    │   ├── assets/              # รูปภาพหรือไฟล์ Asset ที่ใช้งานในโปรเจกต์
    │   ├── components/          # React Components ที่สามารถนำกลับมาใช้ซ้ำได้
    │   │   ├── EditProductModal.jsx # Modal ป๊อปอัปสำหรับแก้ไขข้อมูลสินค้า
    │   │   ├── Navbar.jsx           # แถบนำทางด้านบนของเว็บไซต์
    │   │   ├── PageState.jsx        # คอมโพเนนต์แสดงสถานะ Loading หรือ Error
    │   │   ├── ProductForm.jsx      # ฟอร์มสำหรับกรอกข้อมูลเพิ่ม/แก้ไขสินค้า
    │   │   ├── ProductHeader.jsx    # ส่วนหัวแสดงสถิติและปุ่มจัดการ
    │   │   └── ProductList.jsx      # ตาราง/การ์ดแสดงรายการสินค้าพร้อมปุ่มจัดการ
    │   ├── pages/               # หน้าเพจหลักของแอปพลิเคชัน
    │   │   ├── AddProductPage.jsx   # หน้าสำหรับเพิ่มสินค้าใหม่
    │   │   ├── EditProductPage.jsx  # หน้าสำหรับแก้ไขสินค้า
    │   │   ├── ProductPage.jsx      # หน้าหลักแสดงรายการสินค้าและสถิติ
    │   │   └── ProductFormPage.jsx  # Re-export ProductForm
    │   ├── services/            # ส่วนบริการเชื่อมต่อ API และแจ้งเตือน
    │   │   ├── alertService.js      # ตัวช่วยแสดงผล SweetAlert2 (ยืนยัน/แจ้งเตือนสำเร็จ/ผิดพลาด)
    │   │   └── productService.js    # ตัวกลางเรียก REST API สินค้าผ่าน Axios
    │   ├── App.jsx              # คอมโพเนนต์หลักที่ควบคุม Routing และ State ส่วนกลาง
    │   ├── main.jsx             # Entry Point ฝั่ง React Render เข้าสู่ DOM
    │   └── index.css            # ไฟล์สไตล์หลักพร้อมการนำเข้า Tailwind/DaisyUI
    ├── index.html               # ไฟล์ HTML หลัก
    ├── package.json             # รายการ Dependencies และ Scripts ของ Frontend
    ├── vite.config.js           # การตั้งค่าสำหรับ Vite
    └── .env.example             # ตัวอย่างไฟล์คอนฟิกสำหรับ Frontend
```

---

## 🔍 คำอธิบายการทำงานของโค้ดแต่ละส่วน (Code Explanation)

### 1. ฝั่ง Backend (Node.js + Express)

- **`backend/config/database.js`**
  - จัดการสร้าง Instance ของ Sequelize เพื่อเชื่อมต่อกับ PostgreSQL
  - รองรับทั้งการเชื่อมต่อผ่าน Connection String เช่น `DATABASE_URL` (กรณี Deploy บนคลาวด์ เช่น Render, Neon, Supabase) และการเชื่อมต่อผ่านตัวแปรแยก (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
  - ฟังก์ชัน `connectDB()` จะทำการทดสอบการเชื่อมต่อ (`authenticate()`) และสั่ง `sync({ alter: true })` เพื่อสร้างหรือปรับปรุงโครงสร้างตารางในฐานข้อมูลให้ตรงกับ Model โดยอัตโนมัติ

- **`backend/model/productModel.js`**
  - กำหนดโครงสร้างตาราง `products` ด้วย Sequelize:
    - `id` (INTEGER, Primary Key, Auto Increment)
    - `name` (STRING, ห้ามว่าง, ความยาว 2-100 ตัวอักษร)
    - `price` (DECIMAL, ห้ามว่าง, ต้องมากกว่าหรือเท่ากับ 0)
    - `image` (STRING, URL รูปภาพสินค้า ต้องเป็น URL ที่ถูกต้อง)
  - กำหนด `timestamps: true` เพื่อบันทึกเวลา `createdAt` และ `updatedAt` อัตโนมัติ

- **`backend/controller/productController.js`**
  - บรรจุ Business Logic ทั้งหมด 5 เมธอด:
    1. `getProducts`: ดึงรายการสินค้าทั้งหมด เรียงลำดับจากใหม่สุดไปเก่าสุด (`ORDER BY id DESC`)
    2. `getProductById`: ดึงข้อมูลสินค้าชิ้นเดียวตาม `id` (ส่ง 404 หากไม่พบ)
    3. `createProduct`: รับค่า `name`, `price`, `image` จาก Request Body ตรวจสอบความถูกต้องและบันทึกข้อมูลใหม่ (ส่ง 201 Created)
    4. `updateProduct`: ตรวจสอบสินค้าตาม `id` และอัปเดตข้อมูล (ส่ง 200 OK)
    5. `deleteProduct`: ค้นหาและลบสินค้าออกจากฐานข้อมูล (ส่ง 200 OK พร้อมข้อมูลที่ถูกลบ)

- **`backend/router/productRouter.js`**
  - กำหนดเส้นทาง URL RESTful API:
    - `GET /api/products` ➜ `getProducts`
    - `GET /api/products/:id` ➜ `getProductById`
    - `POST /api/products` ➜ `createProduct`
    - `PUT /api/products/:id` ➜ `updateProduct`
    - `DELETE /api/products/:id` ➜ `deleteProduct`

- **`backend/index.js`**
  - รวมการตั้งค่า Express เข้าด้วยกัน
  - ใช้งาน Middleware `cors()` เพื่อให้ Frontend สามารถเรียก API ข้าม Port/Domain ได้
  - ใช้งาน Middleware `express.json()` แปลง JSON Body เป็น Object ใน `req.body`
  - สั่ง `connectDB()` เพื่อเริ่มต้นฐานข้อมูล และเปิดเซิร์ฟเวอร์ที่ Port ที่กำหนด (ค่าเริ่มต้น 5000)

---

### 2. ฝั่ง Frontend (React + Vite)

- **`frontend/src/services/productService.js`**
  - รวมฟังก์ชันเรียก API ไปยัง Backend ด้วย Axios:
    - `fetchProducts()`: ขอรายการสินค้าทั้งหมด
    - `fetchProductById(id)`: ขอดูสินค้าตาม ID
    - `createProduct(productData)`: ส่งข้อมูลสินค้าใหม่ไปบันทึก
    - `updateProduct(id, productData)`: ส่งข้อมูลที่แก้ไขไปอัปเดต
    - `deleteProduct(id)`: ร้องขอลบสินค้า

- **`frontend/src/services/alertService.js`**
  - ครอบฟังก์ชันของ SweetAlert2 เพื่อความสะดวกและความสม่ำเสมอของ UI ทั่วทั้งแอป:
    - `showSuccessAlert(message)`: แสดงหน้าต่างแจ้งเตือนสำเร็จ
    - `showErrorAlert(message)`: แสดงหน้าต่างแจ้งเตือนข้อผิดพลาด
    - `confirmDelete(productName)`: แสดงหน้าต่างถามยืนยันก่อนการลบสินค้า ป้องกันการกดลบโดยไม่ได้ตั้งใจ

- **`frontend/src/components/`**
  - `Navbar.jsx`: แถบเมนูด้านบน แสดงโลโก้, เมนูนำทาง (รายการสินค้า / เพิ่มสินค้า), และปุ่มสลับหน้าระหว่างหน้ารายการสินค้าและหน้าเพิ่มสินค้า
  - `ProductHeader.jsx`: สรุปจำนวนสินค้าทั้งหมด, สินค้าที่มีมูลค่าสูงสุด, สินค้าที่ราคาต่ำสุด พร้อมปุ่มเปิดหน้าเพิ่มสินค้า
  - `ProductList.jsx`: แสดงรายการสินค้าทั้งในรูปแบบตารางและแบบ Card, มีช่อง Search ค้นหาแบบเรียลไทม์ และปุ่มกดแก้ไข / ลบสินค้า
  - `ProductForm.jsx`: ฟอร์มสำหรับกรอกชื่อ, ราคา และ URL รูปภาพ รองรับการตรวจสอบ (Validation) และแสดงตัวอย่างภาพ (Live Image Preview)
  - `EditProductModal.jsx`: ป๊อปอัป Modal สไตล์ DaisyUI ให้แก้ไขสินค้าได้ทันทีโดยไม่ต้องเปลี่ยนหน้า
  - `PageState.jsx`: คอมโพเนนต์แสดงหน้าโหลด (Spinner) หรือแสดงข้อผิดพลาดเมื่อเรียกข้อมูลไม่สำเร็จ

- **`frontend/src/App.jsx`**
  - ทำหน้าที่เป็น Orchestrator จัดการ Routing แบบง่ายผ่าน State `currentPage` (`products` หรือ `add`)
  - จัดการ State ของสินค้าที่กำลังแก้ไขใน Modal

---

## 🛠️ วิธีการติดตั้งและรันโปรเจกต์ (Installation & Setup)

คุณสามารถเลือกติดตั้งและรันโปรเจกต์ได้ 2 วิธี:

### วิธีที่ 1: รันด้วย Docker Compose (สะดวกและรวดเร็วที่สุด)

เหมาะสำหรับผู้ที่มี **Docker Desktop** ติดตั้งอยู่แล้ว ไม่จำเป็นต้องติดตั้ง Node.js หรือ PostgreSQL ในเครื่อง

1. **สร้างไฟล์ `.env` ที่โฟลเดอร์หลัก (Root Directory)**
   คัดลอกไฟล์ `.env.example` เป็น `.env`:
   ```bash
   cp .env.example .env
   ```
   *(หรือเปิดสร้างไฟล์ `.env` แล้วใส่การตั้งค่าตามตัวอย่าง)*

2. **สั่งรันคอนเทนเนอร์ทั้งหมดผ่าน Docker Compose**
   ```bash
   docker compose up --build
   ```
   *(หากต้องการให้รันเป็น Background ให้เพิ่ม Flag `-d` เช่น `docker compose up -d --build`)*

3. **เข้าใช้งานแอปพลิเคชัน**
   - **Frontend**: เปิดเบราว์เซอร์ที่ [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)
   - **Database (PostgreSQL)**: `localhost:5432`

4. **หยุดการทำงาน**
   ```bash
   docker compose down
   ```

---

### วิธีที่ 2: รันแบบ Manual (Local Development)

เหมาะสำหรับการพัฒนาและดีบักโค้ดโดยตรงบนเครื่องคอมพิวเตอร์ของคุณ

#### 1. สิ่งที่ต้องมีในเครื่อง (Prerequisites)
- [Node.js](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป แนะนำ v20 หรือ v22)
- [PostgreSQL](https://www.postgresql.org/) (เวอร์ชัน 14 ขึ้นไป)
- Git

#### 2. เตรียมฐานข้อมูล PostgreSQL
1. เปิดโปรแกรม pgAdmin หรือ Terminal `psql`
2. สร้างฐานข้อมูลใหม่:
   ```sql
   CREATE DATABASE product_db;
   ```

#### 3. ติดตั้งและเริ่มทำงานฝั่ง Backend
1. เปิด Terminal และเข้าไปที่โฟลเดอร์ `backend`:
   ```bash
   cd backend
   ```
2. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```
3. สร้างไฟล์ `.env` ในโฟลเดอร์ `backend`:
   ```bash
   cp .env.example .env
   ```
   จากนั้นแก้ไขค่าใน `backend/.env` ให้ตรงกับการตั้งค่า PostgreSQL ในเครื่องของคุณ:
   ```env
   BACKEND_PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=product_db
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   ```
4. เริ่มรันเซิร์ฟเวอร์ Backend:
   ```bash
   npm run dev
   ```
   ระบบจะแสดงข้อความว่า:
   ```text
   Connection to database has been established successfully.
   All models were synchronized successfully.
   Server is running on: http://localhost:5000
   ```

#### 4. ติดตั้งและเริ่มทำงานฝั่ง Frontend
1. เปิด Terminal ใหม่ แล้วเข้าไปที่โฟลเดอร์ `frontend`:
   ```bash
   cd frontend
   ```
2. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```
3. สร้างไฟล์ `.env` ในโฟลเดอร์ `frontend`:
   ```bash
   cp .env.example .env
   ```
   ตรวจสอบว่ามีค่า:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. เริ่มรันเว็บ Frontend:
   ```bash
   npm run dev
   ```
5. เปิดเบราว์เซอร์และเข้าไปที่ [http://localhost:5173](http://localhost:5173)

---

## ⚙️ การตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables)

### ไฟล์ `.env` ที่ Root Directory (สำหรับ Docker Compose)
| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
| :--- | :--- | :--- |
| `BACKEND_PORT` | `5000` | พอร์ตของ Backend บนเครื่อง Host |
| `FRONTEND_PORT` | `5173` | พอร์ตของ Frontend บนเครื่อง Host |
| `POSTGRES_USER` | `dev_user` | ชื่อผู้ใช้ PostgreSQL ใน Container |
| `POSTGRES_PASSWORD` | `dev_password` | รหัสผ่าน PostgreSQL ใน Container |
| `POSTGRES_DB` | `product_db` | ชื่อ Database ใน Container |
| `POSTGRES_PORT` | `5432` | พอร์ต PostgreSQL บนเครื่อง Host |
| `NODE_ENV` | `development` | สภาพแวดล้อมการทำงาน (`development` / `production`) |
| `DB_HOST` | `postgres-db` | ชื่อ Service โฮสต์ของ Database (ใน Docker ใช้ชื่อ Service) |
| `DB_PORT` | `5432` | พอร์ต Database ภายในเครือข่าย Docker |
| `DB_NAME` | `product_db` | ชื่อ Database ที่ Backend เชื่อมต่อ |
| `DB_USER` | `dev_user` | ผู้ใช้สำหรับ Backend เชื่อมต่อ Database |
| `DB_PASSWORD` | `dev_password` | รหัสผ่านสำหรับ Backend เชื่อมต่อ Database |
| `VITE_API_URL` | `http://localhost:5000` | URL API ที่ Frontend จะเรียกใช้งาน |

---

## 📡 API Endpoints Reference

Base URL: `http://localhost:5000/api/products`

| Method | Endpoint | คำอธิบาย | ข้อมูลที่ส่ง (Request Body) | รหัสตอบกลับ (Status) |
| :---: | :--- | :--- | :--- | :---: |
| **GET** | `/api/products` | ดึงข้อมูลสินค้าทั้งหมด | ไม่มี | `200 OK` |
| **GET** | `/api/products/:id` | ดึงข้อมูลสินค้าตาม ID | ไม่มี | `200 OK` / `404 Not Found` |
| **POST** | `/api/products` | เพิ่มสินค้าใหม่ | JSON (ดูตัวอย่างด้านล่าง) | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/products/:id` | แก้ไขข้อมูลสินค้า | JSON (ดูตัวอย่างด้านล่าง) | `200 OK` / `404 Not Found` |
| **DELETE** | `/api/products/:id` | ลบสินค้าตาม ID | ไม่มี | `200 OK` / `404 Not Found` |

### ตัวอย่าง JSON Body สำหรับสร้างหรือแก้ไขสินค้า:
```json
{
  "name": "Wireless Mechanical Keyboard",
  "price": 2590.00,
  "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
}
```

---

## 💡 ข้อมูลเพิ่มเติมและคำแนะนำ
- **Hot Module Replacement (HMR)**: เมื่อรันในโหมด Development ไม่ว่าจะรันผ่าน Docker หรือรันในเครื่อง เมื่อทำการบันทึกไฟล์โค้ด หน้าเว็บหรือเซิร์ฟเวอร์จะอัปเดตให้อัตโนมัติทันที
- **Database Synchronization**: โค้ดใน `database.js` ตั้งค่า `sync({ alter: true })` ไว้ ทำให้สามารถเพิ่มหรือปรับปรุงคอลัมน์ในโมเดลได้โดยตรงโดยไม่ต้องเขียน migration script เองในระหว่างการพัฒนา
