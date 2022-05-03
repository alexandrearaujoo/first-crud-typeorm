import { User } from "../../entities/user.entity";
import { UserData } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import bcrypt from 'bcrypt'

const UserCreateService = async (data: UserData) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === data.email);

  if (emailAlreadyExists) {
    throw new Error("Email ja esta em uso!");
  }

  const user = new User();
  user.email = data.email;
  user.name = data.name;
  user.password = bcrypt.hashSync(data.password,10)

  userRepository.create(user);
  await userRepository.save(user);
  return user;
};

export default UserCreateService;
