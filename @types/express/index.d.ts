import * as express from "express";
import { UserData } from "../../src/interfaces/user/index";

declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      newUser: UserData;
    }
  }
}
