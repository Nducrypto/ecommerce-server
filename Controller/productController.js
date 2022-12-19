import ProductEcommerce from "../Models/productModel.js";
import { createError } from "../Error/error.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  const newProduct = new ProductEcommerce(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await ProductEcommerce.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await ProductEcommerce.find({
        categories: { $in: [qCategory] },
      });
    } else {
      products = await ProductEcommerce.find();
    }

    res.status(200).json(products);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await ProductEcommerce.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await ProductEcommerce.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await ProductEcommerce.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully Deleted");
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};
