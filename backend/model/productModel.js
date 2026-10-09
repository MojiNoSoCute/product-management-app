import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

/**
 * นิยามโมเดล Product สำหรับตารางสินค้าในฐานข้อมูล
 * Sequelize จะนำโมเดลนี้ไปสร้างหรือจัดการ Table ชื่อ "Products" ใน PostgreSQL
 */
const Product = sequelize.define("Product", {
    // รหัสสินค้า: เป็นตัวเลขจำนวนเต็ม รันอัตโนมัติ (Auto Increment) และเป็น Primary Key
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // ชื่อสินค้า: ข้อความ (STRING/VARCHAR), จำเป็นต้องระบุ (ห้ามเป็น NULL)
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // ราคาสินค้า: ทศนิยม (FLOAT), จำเป็นต้องระบุ (ห้ามเป็น NULL)
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    // รายละเอียดสินค้า: ข้อความขนาดยาว (TEXT), สามารถเว้นว่างได้ (NULL)
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // URL รูปภาพสินค้า: ข้อความขนาดยาว (TEXT), สามารถเว้นว่างได้ (NULL)
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

export default Product;