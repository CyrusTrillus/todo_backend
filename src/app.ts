import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connection";
import todoRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Todo routes (protected)
app.use("/api/todos", todoRoutes);

// Connect DB
connectDB();

export default app;
