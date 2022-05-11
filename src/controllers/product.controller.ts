import { Request, Response } from "express";
import { AppError, handleError } from "../errors/AppError";
import { IProduct } from "../interfaces/products";
import createProductsService from "../services/products/createProducts.service";
import listProductsService from "../services/products/listProducts.service";

class ProductController {
  async store(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;

      const product = await createProductsService.execute({
        name,
        description,
        price,
      });

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
  async index(req: Request, res: Response) {
    try {
      const products = await listProductsService.execute();

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}

export default new ProductController();
