import { Response, Request } from "express";
import { AppError, handleError } from "../errors/AppError";
import DeleteUserService from "../services/user/deleteUser.service";
import UserListService from "../services/user/listUsers.service";
import ShowUser from "../services/user/showUser.service";
import UpdateUserService from "../services/user/updateUser.service";
import UserCreateService from "../services/user/userCreate.service";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.newUser;

      const user = await UserCreateService({ name, email, password});

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res)
      }
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await UserListService();

      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res)
      }
    }
  }

  async show (req: Request, res: Response) {
   
    try {
      const email = req.userEmail

      const user = await ShowUser(email)

      return res.status(200).json(user)
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res)
      }
    }
  }

  async update (req: Request, res: Response){
    try {
        const email = req.userEmail
        const {password} = req.body

        if (!password){
          throw new Error ("No password informed")
        }

        const user = await UpdateUserService(email, password)

        return res.status(200).json({message: "Password Update"})


    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res)
      }
    }
  }

  async delete (req:Request, res: Response){
    try {
      const email = req.userEmail

      await DeleteUserService(email)

      return res.status(200).json({message: "User deleted with sucess!"})
      
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res)
      }
    }
  }
}

export default new UserController();
