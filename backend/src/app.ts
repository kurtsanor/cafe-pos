import express from "express";
import helmet from "helmet";
import productRoutes from "../src/routes/product.routes";
import orderRoutes from "../src/routes/order.routes";
import analyticsRoutes from "../src/routes/analytics.routes";
import authRoutes from "../src/routes/auth.routes";
import categoryRoutes from "../src/routes/category.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// Init express app
const app = express();
app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS")); // block
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per window per IP
  standardHeaders: true, // return RateLimit-* headers
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(apiLimiter);

app.use(cookieParser());
app.use(helmet());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/auth", authLimiter, authRoutes);
app.use("/categories", categoryRoutes);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack); // Logs error details for debugging.
    const statusCode = err.status || 500; // Sets status code (default: 500 Internal Server Error).
    const message = err.message || "Internal Server Error"; // Sets a generic error message.
    res.status(statusCode).json({ message: message }); // Sends the error response to the client.
  },
);

export default app;
