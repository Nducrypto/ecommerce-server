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
router.patch("/delete/:id", verifyAdmin, deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/:id", getProduct);

export default router;
