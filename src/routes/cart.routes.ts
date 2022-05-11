import { Router } from "express";
import cartController from "../controllers/cart.controller";
import AuthUser from "../middlewares/AuthUser";

const router = Router();

export const cartRouter = () => {
  router.post("/", AuthUser, cartController.store);
  router.delete("/:product_id", AuthUser, cartController.store);

  return router;
};
