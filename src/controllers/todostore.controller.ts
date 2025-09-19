import { Request, Response } from "express";
import todoModel from "../models/todo.model";

// Fetch only the todos of the logged-in user
export const fetchTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id; // 👈 from authMiddleware
    const todos = await todoModel.find({ user: userId });
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new todo for the logged-in user
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const { title, description } = req.body;

    const todo = new todoModel({ title, description, user: userId });
    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Toggle done/not done, but only if it belongs to the user
export const toggle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = (req as any).user._id;

    const todo = await todoModel.findOne({ _id: req.params.id, user: userId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.done = !todo.done;
    await todo.save();
    return res.json(todo);
  } catch (err) {
    console.error("Error toggling todo:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Edit a todo if it belongs to the logged-in user
export const editTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const { title, description } = req.body;

    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a todo if it belongs to the logged-in user
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user._id;

    const todo = await todoModel.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Server error" });
  }
};
