import {Express} from "express";
import { cartRouter } from "./cart.routes";
import { productRouter } from "./product.routes";
import { userRouter } from "./user.routes";


export const appRoutes = (app: Express) => {
    app.use('/users', userRouter())
    app.use('/products', productRouter())
    app.use('/cart', cartRouter()) 
}
