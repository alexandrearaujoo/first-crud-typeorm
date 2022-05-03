import { users } from "../../database";
import { UserData } from "../../interfaces/user";
import { v4 as uuidv4 } from "uuid";

const UserCreateService = (data: UserData) => {
  const emailAlreadyExists = users.find((user) => user.email === data.email);

  if (emailAlreadyExists) {
    throw new Error("Email ja esta em uso!");
  }

  data.id = uuidv4();

  users.push(data);

  return data;
};

export default UserCreateService;
