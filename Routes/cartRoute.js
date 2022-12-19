import express from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  updateCart,
} from "../Controller/cartController.js";
const router = express.Router();

router.post("/", createCart);
router.get("/", getAllCart);
router.get("/:id", getCart);
router.patch("/:id", updateCart);
router.patch("/:id", deleteCart);

export default router;
