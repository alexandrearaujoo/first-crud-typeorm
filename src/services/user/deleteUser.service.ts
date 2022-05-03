import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";

const DeleteUserService = async (email:String) => {
    const userRespository = AppDataSource.getRepository(User)

    const user = await userRespository.find()

    const account = user.find(user => user.email === email)

    await userRespository.delete(account!.id)

    return true
}

export default DeleteUserService