import Product from "../model/productModel.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "กรุณาระบุชื่อสินค้า" });
    }
    if (price === undefined || price === null || price === "" || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ message: "กรุณาระบุราคาที่ถูกต้องและไม่ติดลบ" });
    }
    const newProduct = await Product.create({
      name: name.trim(),
      price: Number(price),
      description: description ? description.trim() : "",
      image: image ? image.trim() : "",
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required!" });
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required!" });
    }
    const { name, price, description, image } = req.body;
    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ message: "ชื่อสินค้าต้องไม่เป็นค่าว่าง" });
    }
    if (price !== undefined && (price === "" || isNaN(Number(price)) || Number(price) < 0)) {
      return res.status(400).json({ message: "ราคาต้องเป็นตัวเลขที่ถูกต้องและไม่ติดลบ" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (price !== undefined) updates.price = Number(price);
    if (description !== undefined) updates.description = description ? description.trim() : "";
    if (image !== undefined) updates.image = image ? image.trim() : "";

    await product.update(updates);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required!" });
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

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
