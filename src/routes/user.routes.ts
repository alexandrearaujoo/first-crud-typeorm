import { Router } from "express";
import UserController from "../controllers/user.controller";
import SessionController from "../controllers/session.controller";
import validateFields from "../middlewares/validateFields";

const userRouter = Router();

userRouter.post("", validateFields, UserController.create);
userRouter.post("/login", SessionController.login)
userRouter.get("", UserController.index);
userRouter.get("/me", UserController.show)

export default userRouter;
