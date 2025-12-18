import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import routes from "./src/app/routes";
import { ResourceAlreadyExists } from "./src/app/errors/resource-already-exists.error";
import { ResourceNotFound } from "./src/app/errors/resource-not-found.error";
import path from "node:path";

async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    const app = express();
    app.use(express.json())
    app.use("/api", routes);
    app.use("/api/uploads", express.static(path.resolve(__dirname, "..", "uploads")))

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if(error instanceof ResourceNotFound) {
        return res.status(404).json({
          message: error.message
        })
      }

      if(error instanceof ResourceAlreadyExists) {
        return res.status(409).json({
          message: error.message
        })
      }

      if(error instanceof Error) {
        return res.status(400).json({
          message: error.message
        })
      }

      return res.status(500).json({
        message: "Internal Server Error"
      })
    });

    app.use(/(.*)/, (req: Request, res: Response) => {
      return res.status(404).json({
        message: "Route not found!"
      })
    })

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
