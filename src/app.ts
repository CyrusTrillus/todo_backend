import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connection";
import todoRoutes from "./routes/admin.routes";

dotenv.config();

const app = express();

// ✅ Proper CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use Todo routes
app.use("/api/todos", todoRoutes);

// Connect DB
connectDB();

export default app;
