import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import { ErrorMiddlewareParams } from "./types/express/express";

// Load .env variables
dotenv.config();

// Init express app
const app = express();
app.use(express.json());

app.use(helmet);

// Global error handler
app.use((params: ErrorMiddlewareParams) => {
  const { err, req, res, next } = params;

  console.error(err.stack); // Logs error details for debugging.
  const statusCode = err.status || 500; // Sets status code (default: 500 Internal Server Error).
  const message = err.message || "Internal Server Error"; // Sets a generic error message.
  res.status(statusCode).json({ message: message }); // Sends the error response to the client.
});

export default app;
