import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodo,
  toggle,
} from "../controllers/todostore.controller";

const router = Router();

// Get all todos
router.get("/fetchtodo", fetchTodo);

// Add todo
router.post("/addtodo", addTodo);

// Toggle todo
router.put("/:id/toggle", toggle);

// 🔥 Update todo (title + description)
router.put("/:id/edittodo", editTodo);

// Delete todo
router.delete("/:id/deletetodo", deleteTodo);

export default router;
