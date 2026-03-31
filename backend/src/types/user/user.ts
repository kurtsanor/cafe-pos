import { Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
}

export type UserRole = "admin" | "cashier";
