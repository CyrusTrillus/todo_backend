import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  done: boolean;
  user: mongoose.Types.ObjectId; // 👈 link to User
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    done: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 👈
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
