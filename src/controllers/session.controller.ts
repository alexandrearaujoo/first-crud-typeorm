import { Response, Request } from "express";
import UserLoginService from "../services/user/loginUser.service";

class SessionController {
  async login(req: Request, res: Response) {
    try {
      const {email, password} = req.body

      const token = await UserLoginService({email, password})

      return res.status(201).json(token)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
    }
  }
}

export default new SessionController()