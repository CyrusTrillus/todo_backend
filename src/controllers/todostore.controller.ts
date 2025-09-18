import { Request, Response } from "express";
import todoModel from "../models/todo.model";

export const fetchTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await todoModel.find();
    res.json(todos); // Sends response, doesn't need to return anything
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const todo = new todoModel({ title, description });
    await todo.save();
    res.json(todo); // Sends response, doesn't need to return anything
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const toggle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.done = !todo.done;
    await todo.save();
    return res.json(todo); // ✅ return here as well
  } catch (err) {
    console.error("Error toggling todo:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const editTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    res.json(updatedTodo); // Sends response, doesn't need to return anything
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoModel.findByIdAndDelete(req.params.id);

    res.json({ success: true }); // Sends response, doesn't need to return anything
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Server error" });
  }
};
