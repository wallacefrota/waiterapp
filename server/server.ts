import mongoose from "mongoose";
import app from "./src/app"

async function startConnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017");
  } catch (error) {
    throw error;
  }
}

async function startServer() {
  try {
    await startConnection();

    app.listen(3001, () => {
      console.log("🚀 Server is running on port 3001");
    });
  } catch (error) {
    throw error;
  }
}

startServer().catch((err) => {
  console.log("🚀 Error starting server", err);
  process.exit(1);
});
