import { Router } from "express";
import UserController from "../controllers/user.controller";
import SessionController from "../controllers/session.controller"; 
import AuthUser from "../middlewares/AuthUser";
import { ValidateFields } from "../middlewares/validateFields";
import { userCreateSchema } from "../middlewares/validateFields";


const userRouter = Router();

userRouter.post("", ValidateFields(userCreateSchema), UserController.create);
userRouter.post("/login", SessionController.login)
userRouter.get("", UserController.index);
userRouter.get("/me", AuthUser, UserController.show)
userRouter.patch("/me/updatePassword", AuthUser, UserController.update)
userRouter.delete("/me", AuthUser, UserController.delete)

export default userRouter;
