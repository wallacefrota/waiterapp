import { Router } from "express";
import CategoriesController from "./controllers/categories.controller";
import ProductsController from "./controllers/products.controller";
import OrdersController from "./controllers/orders.controller";

import multer, { diskStorage } from "multer";
import path from "node:path";

const routes = Router();

const storageUploads = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uplaod = multer({ storage: storageUploads });

// List categories
routes.get("/categories", CategoriesController.listCategories);

// Create categories
routes.post("/categories", CategoriesController.createCategory);

// List products
routes.get("/products", ProductsController.listProducts);

// Create products
routes.post(
  "/products",
  uplaod.single("image"),
  ProductsController.createProduct
);

// List products by category
routes.get(
  "/categories/:categoryId/products",
  CategoriesController.listProductsByCategory
);

// List orders
routes.get("/orders", OrdersController.listOrders);
// Create orders
routes.post("/orders", OrdersController.createOrder);
// Change order status
routes.patch("/orders/:orderId", OrdersController.changeOrderStatus);
// Delete/cancel order
routes.delete("/orders/:orderId", OrdersController.deleteOrder);

export default routes;
