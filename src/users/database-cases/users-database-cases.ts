import User from '../schemas/users-schema'
import bcrypt from 'bcrypt'


class CasesUserDataBase {

    async createUser(dataUser: any) {

        await User.create(dataUser)

    }
    async valitUserForEmail(email: string) {
        const valitEmail = await User.findOne({ email: email })
        return valitEmail
    }

    async findUserForName(name: any) {
        const users = await User.find({ name: { "$regex": `${name}`, "$options": "i" } })
        return users
    }
    async findUserForId(id: string) {
        const users = await User.findOne({ _id: id })
        return users

    }
    async findAllUsers() {
        const users = await User.find()
        return users
    }
    async updateUser(id: string, newPassword: any) {
        const newPasswordCrypt = await bcrypt.hash(newPassword, 8);
        await User.updateOne({ _id: id }, { $set: { password: newPasswordCrypt } })
    }
    async updateUserName(id: string, name: any) {
        await User.updateOne({ _id: id }, { $set: { name: name } })
    }
    async updateUserAddress(id: string, address: any) {
        await User.updateOne({ _id: id }, { $set: { address: address } })
    }
    async removeUserAddress(id: string) {
        await User.deleteOne({ _id: id })
    }

}
export default new CasesUserDataBase()