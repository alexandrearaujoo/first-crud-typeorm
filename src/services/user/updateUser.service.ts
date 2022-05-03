import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import bcrypt from 'bcrypt'

const UpdateUserService = async (email: string, password: string) => {
    const userRespository = AppDataSource.getRepository(User)

    const user = await userRespository.find()

    const account = user.find(user => user.email === email)

    if (bcrypt.compareSync(password, account!.password)){
        throw new Error ("Inform a different password")
    }

    const newPassword  = bcrypt.hashSync(password, 10)

    await userRespository.update(account!.id, {password: newPassword})

    return true
}

export default UpdateUserService