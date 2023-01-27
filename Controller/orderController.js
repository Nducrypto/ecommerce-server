import OrderEcommerce from "../Models/orderModel.js";
import { createError } from "../Error/error.js";

// ======CREATE ORDER
export const createOrder = async (req, res, next) => {
  const newOrder = new OrderEcommerce(req.body);
  console.log(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(createError(404, "Unable To Create Cart"));
  }
};

// ======GET ALL ORDERS,
// ADMIN ONLY CAN GET THIS
export const getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await OrderEcommerce.find();
    // console.log(allOrder);
    res.status(200).json(allOrder);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// ======GET USER ORDER
export const getOrder = async (req, res, next) => {
  try {
    const userOrder = await OrderEcommerce.find({ userId: req.params.id });

    res.status(200).json(userOrder);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// ======UPDATE ORDER
// ADMIN ONLY
export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await OrderEcommerce.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// ======DELETE ORDER
// Admin
export const deleteOrder = async (req, res, next) => {
  try {
    await OrderEcommerce.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully Deleted");
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// =====STATS
export const orderStats = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await OrderEcommerce.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    next(createError(404, "Something went wrong"));
  }
};
