import { Response, Request } from "express";
import UserListService from "../services/user/listUsers.service";
import ShowUser from "../services/user/showUser.service";
import UserCreateService from "../services/user/userCreate.service";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = await UserCreateService({ name, email, password});

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await UserListService();

      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  async show (req: Request, res: Response) {
    const authorization = req.headers.authorization
    try {
      const user = await ShowUser({authorization})

      return res.status(201).json(user)
    } catch (error) {
      if (error instanceof Error){
        return res.status(401).json({message: error.message})
      }
    }
  }
}

export default new UserController();
