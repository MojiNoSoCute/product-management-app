import Product from "../model/productModel.js";

/**
 * 1. ฟังก์ชันสร้างสินค้าใหม่ (Create Product)
 * Method: POST /api/products
 * รับข้อมูล name, price, description, image จาก req.body
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;

    // ตรวจสอบ (Validation): ชื่อสินค้าต้องไม่เป็นค่าว่าง
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "กรุณาระบุชื่อสินค้า" });
    }

    // ตรวจสอบ (Validation): ราคาสินค้าต้องเป็นตัวเลขและไม่ติดลบ
    if (price === undefined || price === null || price === "" || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ message: "กรุณาระบุราคาที่ถูกต้องและไม่ติดลบ" });
    }

    // บันทึกสินค้าลงฐานข้อมูลผ่าน Sequelize
    const newProduct = await Product.create({
      name: name.trim(),
      price: Number(price),
      description: description ? description.trim() : "",
      image: image ? image.trim() : "",
    });

    // ส่งข้อมูลสินค้าที่สร้างสำเร็จกลับไปพร้อม HTTP Status 201 (Created)
    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

/**
 * 2. ฟังก์ชันดึงรายการสินค้าทั้งหมด (Get All Products)
 * Method: GET /api/products
 * คืนค่ารายการสินค้าทั้งหมด เรียงลำดับ id จากน้อยไปมาก (ASC)
 */
const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });

    // ส่งรายการสินค้ากลับไปพร้อม HTTP Status 200 (OK)
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

/**
 * 3. ฟังก์ชันดึงข้อมูลสินค้าเฉพาะรายการ (Get Product By ID)
 * Method: GET /api/products/:id
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required!" });
    }

    // ค้นหาสินค้าจาก Primary Key (id)
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

/**
 * 4. ฟังก์ชันแก้ไข/อัปเดตข้อมูลสินค้า (Update Product)
 * Method: PUT /api/products/:id
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required!" });
    }

    const { name, price, description, image } = req.body;

    // ตรวจสอบชื่อสินค้า (หากมีการส่งค่ามาเพื่ออัปเดต)
    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ message: "ชื่อสินค้าต้องไม่เป็นค่าว่าง" });
    }

    // ตรวจสอบราคา (หากมีการส่งค่ามาเพื่ออัปเดต ต้องเป็นตัวเลขและไม่ติดลบ)
    if (price !== undefined && (price === "" || isNaN(Number(price)) || Number(price) < 0)) {
      return res.status(400).json({ message: "ราคาต้องเป็นตัวเลขที่ถูกต้องและไม่ติดลบ" });
    }

    // ตรวจสอบว่ามีสินค้ารายการนี้อยู่ในฐานข้อมูลหรือไม่
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // เตรียมฟิลด์ที่ต้องการอัปเดต
    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (price !== undefined) updates.price = Number(price);
    if (description !== undefined) updates.description = description ? description.trim() : "";
    if (image !== undefined) updates.image = image ? image.trim() : "";

    // บันทึกการเปลี่ยนแปลงลงฐานข้อมูล
    await product.update(updates);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

/**
 * 5. ฟังก์ชันลบสินค้า (Delete Product)
 * Method: DELETE /api/products/:id
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required!" });
    }

    // ค้นหาสินค้าก่อนทำการลบ
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // สั่งลบข้อมูลออกจากตารางในฐานข้อมูล
    await product.destroy();

    return res
      .status(200)
      .json({ message: "Product deleted", deleteProduct: product });
  } catch (error) {
    return next(error);
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

