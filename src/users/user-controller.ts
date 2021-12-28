import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserCases from './usecases/users-usecases'
import RecoverCases from './usecases/recover-password-usecases'


require('dotenv/config');

const userController = {

    async findUsers(req: Request, res: Response): Promise<any> {
        const name = req.query.name
        const user = await UserCases.caseFindUser(name)
        res.status(user.code).send(user.return)
    },

    async registerUser(req: Request, res: Response): Promise<any> {
        const data = req.body
        const user = {
            "name": data.name.toLowerCase(),
            "password": data.password,
            "email": data.email,
            "function": data.function,
            "phone": data.phone,
            "admin": data.admin,
            "address": {
                "zipcode": data.address.zipcode,
                "number": data.address.number,
                "street": data.address.street,
                "district": data.address.district,
                "city": data.address.city,
                "state": data.address.state,
                "country": data.address.country
            }
        }
        const returnStatus = await UserCases.caseRegisterUser(user)

        res.status(returnStatus.code).send(returnStatus.return)

    },

    async forgotPassword(req: Request, res: Response) {
        const data = req.body
        const recover = await RecoverCases.caseForgotPassword(data.email)

        return res.status(recover.code).send(recover.return)

    },
    async recoverPassword(req: Request, res: Response) {
        const { code, newPassword } = req.body
        const returnStatus = await RecoverCases.recoverPassword(code, newPassword)

        return res.status(returnStatus.code).send(returnStatus.return)
    },

    async newPassword(req: Request, res: Response) {
        const data = req.body
        const id = req.userId

        const returnStatus = await UserCases.newPassword(data, id)

        return res.status(returnStatus.code).send(returnStatus.return)
    },

    async deleteUser(req: Request, res: Response) {
        const query = req.params

        const returnStatus = await UserCases.caseDeleteUser(query.id)
        return res.status(201).send({ message: "Usuario excluido" })
    },

    async updateUser(req: Request, res: Response) {
        const data = req.body
        const userId = req.userId


        const returnStatus = await UserCases.updateUser(data, userId)

        return res.status(returnStatus.code).send(returnStatus.return)
    },

    async updateUserAddress(req: Request, res: Response) {
        const data = req.body
        const userId = req.userId

        const returnStatus = await UserCases.updateUserAddress(data, userId)
        return res.status(returnStatus.code).send(returnStatus.return)
    },

}

export default userController;