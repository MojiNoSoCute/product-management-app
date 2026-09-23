import Product from "../model/productModel.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and Price are requied fields" });
    }
    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      image,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // ค้นหา product ที่มี id ตรงกับที่ขอมา await ให้รอทำให้เสร็จก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอ ให้ตอบกลับ 404 และ return ออกจาก function เลย
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ถ้าเจอ ส่งข้อมูลกลับไป
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // รับค่าใหม่จาก body (จะส่งมาแค่บางฟิลด์ก็ได้)
    const { name, price } = req.body;

    // หา product ที่จะแก้ไขก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอส่ง 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // อัปเดตค่า ถ้าไม่ส่งมาให้ใช้ค่าเดิม
    product.name = name || product.name;
    product.price = price ? Number(price) : product.price;

    // บันทึกลง database จริง
    await product.save();

    return res.status(200).json({ message: "Product updated", data: product });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // หา product ที่จะลบก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอส่ง 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ลบออกจาก database จริง
    await product.destroy();

    return res.status(200).json({ message: "Product deleted", data: product });
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
