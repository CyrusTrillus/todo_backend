import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getProfile);

export default router;
