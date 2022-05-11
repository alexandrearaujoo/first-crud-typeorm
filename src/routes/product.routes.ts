import { Router } from "express";
import productController from "../controllers/product.controller";

const router = Router();

export const productRouter = () => {
  router.post("/", productController.store);
  router.get("", productController.index);

  return router;
};
