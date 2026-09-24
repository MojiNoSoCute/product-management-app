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
      // มีค่า เท่ากับ name: name ,
      // des: des,
      // image: image
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
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required!" });
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    return res.status(200).json(product);

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
    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price can't be null" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const updates = {};
    //ให้แก้ได้บางค่า และทุกค่า
    if (name != undefined) update.name = name;
    if (price != undefined) update.price = Number(price);
    if (description != undefined) update.description = description;
    if (image != undefined) update.image = image;

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
