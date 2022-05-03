import { Router } from "express";
import UserController from "../controllers/user.controller";
import validateFields from "../middlewares/validateFields";

const userRouter = Router();

userRouter.post("", validateFields, UserController.create);
userRouter.get("", UserController.index);

export default userRouter;
