import express, { NextFunction, Request, Response } from 'express'
import { AppError } from './errors/AppError'
import userRouter from './routes/user.routes'

const app = express()

app.use(express.json())

app.use('/user', userRouter)

app.use((err: Error,req:Request, res: Response, _:NextFunction) => {
    if (err instanceof AppError){
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: "Internal server error"
    })
})
 
app.listen(3333, () => console.log('Server running'))