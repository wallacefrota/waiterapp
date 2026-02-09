import express, { Request, Response, NextFunction } from "express";
import { ResourceAlreadyExists } from "./errors/resource-already-exists.error";
import { ResourceNotFound } from "./errors/resource-not-found.error";
import routes from "./routes";

import path from "node:path";

const app = express();

app.use(express.json());

app.use("/api", routes);
app.use("/api/uploads", express.static(path.resolve(__dirname, "..", "uploads")))

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ResourceNotFound) {
    return res.status(404).json({
      message: error.message
    })
  }

  if (error instanceof ResourceAlreadyExists) {
    return res.status(409).json({
      message: error.message
    })
  }

  if (error instanceof Error) {
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

export default app;
