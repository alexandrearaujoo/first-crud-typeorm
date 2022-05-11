import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";

class ListProductsService {
    async execute () {
        const productsRepository = AppDataSource.getRepository(Product)

        const productList = await productsRepository.find()

        return productList
    }
}

export default new ListProductsService()