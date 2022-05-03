import { Response, Request } from "express";
import UserListService from "../services/user/listUsers.service";
import UserCreateService from "../services/user/userCreate.service";

class UserController {
  create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = UserCreateService({ name, email, password });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  index(req: Request, res: Response) {
    try {
      const users = UserListService();

      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
}

export default new UserController();
