import CartEcommerce from "../Models/cartModel.js";
import { createError } from "../Error/error.js";

// ======CREATE CART
export const createCart = async (req, res, next) => {
  const newCart = new CartEcommerce(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    next(createError(404, "Unable To Create Cart"));
  }
};

// ======GET ALL CART,
// ADMIN ONLY CAN GET THIS
export const getAllCart = async (req, res, next) => {
  try {
    const allCart = await CartEcommerce.find();

    res.status(200).json(allCart);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// ======GET USER CART
export const getCart = async (req, res, next) => {
  try {
    const userCart = await CartEcommerce.findOne({ userId: req.params.id });

    res.status(200).json(userCart);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// ======UPDATE CART
export const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await CartEcommerce.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// ======DELETE CART
export const deleteCart = async (req, res, next) => {
  try {
    await CartEcommerce.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully Deleted");
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};
