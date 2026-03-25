import "dotenv/config";
import app from "./app";
import getConnection from "./config/db";

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
  try {
    await getConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to start server:", err.message);
    } else {
      console.error("Failed to start server:", err);
    }
    process.exit(1); // exit if DB connection fails
  }
}

startServer();
