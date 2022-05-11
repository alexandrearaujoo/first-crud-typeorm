import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";
import { IProduct } from "../../interfaces/products";

class CreateProductsService {
  async execute(data: IProduct): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);

    const productAlreadyExists = await productRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (productAlreadyExists) {
      throw new AppError(409, "Products already exists");
    }

    const product = new Product();
    product.name = data.name;
    product.description = data.description;
    product.price = data.price;

    productRepository.create(product);
    await productRepository.save(product);

    return product;
  }
}

export default new CreateProductsService()