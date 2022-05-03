import { Response, Request, NextFunction } from "express";

const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const keys = ['email', 'name', 'password']

    try {
        keys.forEach((item) => {
            if (!Object.keys(req.body).includes(item)){
                throw new Error ("Preencha todos os campos")
            }
        })
        next()
    } catch (error) {
        return res.status(400).json({message: "Preencha todos os campos"})
    }
}

export default validateFields