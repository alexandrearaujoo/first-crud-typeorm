import { Response, Request, NextFunction } from "express";
import { UserData } from "../interfaces/user";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const userCreateSchema: SchemaOf<UserData> = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const ValidateFields =
  (schema: SchemaOf<UserData>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newUser = validatedData;

        next();
      } catch (error: any) {
        return res.status(400).json({
          error: error.errors?.join(", "),
        });
      }
    } catch (error) {
      next(error);
    }
  };
