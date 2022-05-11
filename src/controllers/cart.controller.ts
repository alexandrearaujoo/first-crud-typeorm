import { Request, Response } from "express";
import { AppError, handleError } from "../errors/AppError";
import cartAddProductService from "../services/cart/cartAddProduct.service";
import cartDelProductService from "../services/cart/cartDelProduct.service";

class CartController {
  async store(req: Request, res: Response) {
    try {
      const { userEmail } = req;
      const { product_id } = req.body;

      const cartAdd = await cartAddProductService.execute(
        product_id,
        userEmail
      );

      return res.status(201).json(cartAdd);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { product_id } = req.params;
      const { userEmail } = req;

      await cartDelProductService.execute(userEmail, product_id);

      return res.status(204).json();
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}

export default new CartController();
