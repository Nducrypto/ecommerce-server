import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  orderStats,
  updateOrder,
} from "../Controller/orderController.js";
const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrder);
router.get("/income", orderStats);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.patch("/:id", deleteOrder);

export default router;
