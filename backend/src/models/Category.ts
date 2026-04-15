import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Category name is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Category", categorySchema);
