import express from "express";
import {
  register,
  login,
  getUsers,
  userStats,
} from "../Controller/userController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.get("/stats", userStats);

export default router;
