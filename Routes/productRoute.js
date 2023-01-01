import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../Controller/productController.js";
import { verifyAdmin } from "../MiddleWare/middleware.js";
const router = express.Router();

router.post("/", verifyAdmin, createProduct);
router.get("/", getProducts);
router.patch("/delete/:id", deleteProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);

export default router;
