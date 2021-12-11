import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import sendWelcomeMail from './mail/send-welcome-email'
import SendRecoveryPassword from './mail/send-recovery-password'

import User from './schemas/users-schema'
import PasswordRecovery from './schemas/password-recover'

class UserController {

    async findUsers(req: Request, res: Response): Promise<any> {
        const query = req.query
        let result
        if (query.name) {
            const name = query.name.toString()
            result = await User.find({ name: name })

            if (result.length === 0) return res.status(400).send({ message: "Usuário não encontrado" })

            return res.status(200).send(result)
        }
        result = await User.find()
        return res.status(200).send(result)
    }

    async registerUser(req: Request, res: Response): Promise<any> {
        const data = req.body
        const valitEmail = await User.findOne({ email: data.email })

        if (valitEmail) return res.status(400).send({ message: "Email ja registrado em nosso sitema" })

        const hashPassword = await bcrypt.hash(data.password, 8);
        const user = {
            "name": data.name.toLowerCase(),
            "password": hashPassword,
            "email": data.email,
            "address": {
                "zipcode": data.address.zipcode,
                "street": data.address.street,
                "district": data.address.district,
                "city": data.address.city,
                "country": data.address.country
            }
        }
        await User.create(user).then(async () => {
            sendWelcomeMail.welcomeEmail(data.email, data.name)
            res.status(201).end({ mesage: "Usuario criado com sucesso" })
        }).catch(err => {
            return res.status(400).send(err.message)
        })
    }

    async forgotPassword(req: Request, res: Response) {
        const data = req.body
        const code = Math.floor(Math.random() * 1000000 + 1).toString()

        if (!data.email) return res.status(400).send({ message: "Por favor insira um Email" })

        const userEmail: any = await User.find({ email: data.email })
        if (userEmail) {
            SendRecoveryPassword.recoveryPassword(userEmail[0].email, code)
            const recoveryCodeCreation = {
                "user": userEmail[0]._id,
                "code": code,
            }
            console.log(userEmail[0]._id)
            PasswordRecovery.create(recoveryCodeCreation)

            setInterval(async () => {
                await PasswordRecovery.deleteOne({ code: code }) // delete code 
            }, 300000);

        }
        return res.status(200).send({ message: "Caso o email esteja cadastrado no nosso sistema você recebera um código para recuperação de senha." })

    }
    async passwordRecovery(req: Request, res: Response) {
        const data = req.body;
        const codeRecovery: any = await PasswordRecovery.find({ code: data.code })
        console.log(codeRecovery)
        if (codeRecovery.length > 0) {

            const newPassword = await bcrypt.hash(data.newPassword, 8);

            await User.updateOne({ _id: codeRecovery[0].user }, { $set: { password: newPassword } })
            await PasswordRecovery.deleteOne({ code: data.code })

            return res.status(200).send("Nova senha definida com sucesso")

        }
        return await res.status(400).send({ message: "Codigo de redefinicção de senha invalido" })
    }

    async newPassword(req: Request, res: Response) {
        const data = req.body
        const _id = req.userId

        if (!data.newPassword) return res.status(400).send("Insira uma nova senha")

        const newPassword = await bcrypt.hash(data.newPassword, 8);

        await User.updateOne({ _id: _id }, { $set: { password: newPassword } })

        return res.status(200).send({ message: "Senha alterada com sucesso" })
    }

    async deleteUser(req: Request, res: Response) {
        const query = req.params


        await User.deleteOne({ _id: query.id })
        return res.status(200).send({ message: "Usuario excluido" })
    }

    async updateUser(req: Request, res: Response) {
        const data = req.body
        const userId = req.userId

        await User.updateOne({ _id: userId }, { $set: { name: data.name, function: data.function } })

        return res.status(200).send({ message: "Alterações aplicadas com sucesso " })
    }

    async updateUserAddress(req: Request, res: Response) {
        const data = req.body
        const userId = req.userId

        const newAddress = {
                "zipcode": data.zipcode,
                "number": data.number,
                "street": data.street,
                "district": data.district,
                "city": data.city,
                "state": data.state,
                "country": data.country
        }
       

        await User.updateOne({ _id: userId }, { $set: { address: newAddress } })
        return res.status(200).send({message: "enedeço atualizado com sucesso"})
    }
}

export default new UserController();