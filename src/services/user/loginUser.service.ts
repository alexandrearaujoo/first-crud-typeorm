import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { UserLogin } from "../../interfaces/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppError } from "../../errors/AppError";

const UserLoginService = async (data: UserLogin) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
    const account = users.find((user) => user.email === data.email)
    
    if (!account) {
        throw new AppError (403, "Wrong email/password")
    }

    if(!bcrypt.compareSync(data.password, account.password)){
        throw new AppError (403, "Wrong email/password")
    }

    const token = jwt.sign(
        {email: data.email},
        String(process.env.JWT_SECRET),
        {expiresIn: '1d'}
    )

    return {token, account}
}

export default UserLoginService