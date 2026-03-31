import mongoose, { Schema } from "mongoose";
import { UserRole } from "../types/user/user";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "cashier"] satisfies UserRole[],
    required: [true, "Role is required"],
  },
});

export default mongoose.model("User", userSchema);
