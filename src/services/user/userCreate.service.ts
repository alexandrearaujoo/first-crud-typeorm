import { User } from "../../entities/user.entity";
import { UserData } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import bcrypt from 'bcrypt'
import { AppError } from "../../errors/AppError";
import { Cart } from "../../entities/cart.entity";

const UserCreateService = async (data: UserData) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart)
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === data.email);

  if (emailAlreadyExists) {
    throw new AppError (409, "Email already exists")
  }

  const cart = new Cart()
  cart.subtotal = 0

  cartRepository.create(cart)
  await cartRepository.save(cart)

  const user = new User();
  user.email = data.email;
  user.name = data.name;
  user.password = bcrypt.hashSync(data.password,10)
  user.cart = cart

  userRepository.create(user);
  await userRepository.save(user);
  return user;
};

export default UserCreateService;
