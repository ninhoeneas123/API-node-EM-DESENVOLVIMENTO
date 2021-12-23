import { NextFunction, Request, Response } from 'express';
import User from '../users/schemas/users-schema'



export default async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const userID = req.userId
    const user = await User.findOne({ _id: userID })

    if (user.admin === false) {
        return res.status(401).send({ message: "Você não tem autorização de acesso ! " })
    }
    next()
}