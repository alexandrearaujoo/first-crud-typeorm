import { Router } from "express";
import UserController from "../controllers/user.controller";
import SessionController from "../controllers/session.controller";
import AuthUser from "../middlewares/AuthUser";
import { ValidateFields } from "../middlewares/validateFields";
import { userCreateSchema } from "../middlewares/validateFields";

const router = Router();

export const userRouter = () => {
  router.post("", ValidateFields(userCreateSchema), UserController.create);
  router.post("/login", SessionController.login);
  router.get("", UserController.index);
  router.get("/me", AuthUser, UserController.show);
  router.patch("/me/updatePassword", AuthUser, UserController.update);
  router.delete("/me", AuthUser, UserController.delete);

  return router
};

