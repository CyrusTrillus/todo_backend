import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodo,
  toggle,
} from "../controllers/todostore.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware); // all todo routes require authentication

router.get("/fetchtodo", fetchTodo);
router.post("/addtodo", addTodo);
router.put("/:id/toggle", toggle);
router.put("/:id/edittodo", editTodo);
router.delete("/:id/deletetodo", deleteTodo);

export default router;
