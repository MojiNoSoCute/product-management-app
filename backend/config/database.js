import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// กรณีใช้งาน Local Database หรือ Docker PostgreSQL สามารถใช้รูปแบบ config ด้านล่างนี้ได้:
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: "postgres",
//         logging: false,
//     }
// );

// ดึง Connection String จาก Environment Variable (สำหรับ Cloud PostgreSQL เช่น Neon Database)
const databaseURL = process.env.DATABASE_URL_UNPOOLED;

// สร้าง Sequelize Instance สำหรับติดต่อกับ PostgreSQL
const sequelize = new Sequelize(databaseURL, {
    dialect: "postgres", // ระบุประเภทของฐานข้อมูล
    logging: false,      // ปิดการพิมพ์คำสั่ง SQL ดิบในคอนโซลเพื่อความสะอาดของ log
    dialectOptions: {
        ssl: {
            require: true,              // บังคับใช้การเชื่อมต่อแบบปลอดภัยผ่าน SSL
            rejectUnauthorized: false, // อนุญาต Self-signed Certificate (จำเป็นสำหรับ Cloud Database บางแห่ง)
        }
    }
});

// ฟังก์ชันสำหรับทดสอบการเชื่อมต่อฐานข้อมูล และทำการ Sync ตารางอัตโนมัติ
const connectDB = async () => {
    try {
        // ทดสอบการเชื่อมต่อกับ Database
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL!");

        // ซิงค์โครงสร้าง Table ในฐานข้อมูลให้ตรงกับ Model ที่กำหนดไว้
        // alter: true ในโหมด development จะทำการอัปเดตคอลัมน์โดยไม่ลบข้อมูลเดิมทิ้ง
        await sequelize.sync({
            alter: process.env.NODE_ENV === "development",
        });
        console.log("Table Synchronized!");
    } catch (error) {
        console.error("Connection failed", error);
        // หากเชื่อมต่อ Database ไม่ได้ ให้หยุดการทำงานของเซิร์ฟเวอร์ทันที
        process.exit(1);
    }
};

export { sequelize, connectDB };

