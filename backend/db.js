// import Sequelize and DataTypes
import { Sequelize, DataTypes } from "sequelize";

//connect in docker
const sequelize = new Sequelize("product_db", "dev_user", "dev_password", {
  host: "postgres-db",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

// define databse schema
// จากตาราง Product และต้องกำหนดทุกอันให้ถูก
const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// function connect to DB
const connectDB = async () => {
  // try catch เพื่อจับ error
  try {
    // รอ ให้เชื่อม database
    await sequelize.authenticate();
    // แสดงให้ดูว่าเชื่อมแล้ว
    console.log("Connected to PostgresSQL!");
    // ให้ table sync กัน
    await sequelize.sync({ alter: false });
    // แสดงให้ดูว่า sync แล้ว
    console.log("Table synchronize!");
    // จับ error
  } catch (error) {
    // แสดงให้ดูว่า connect fail และ แสดง error
    console.error("Connection failed!", error);
    // จบการทำงานแบบ เกิด Error จนโปรแกรมไปต่อไม่ได้
    process.exit(1);
  }
};

// ส่งออก
export { sequelize, Product, connectDB };