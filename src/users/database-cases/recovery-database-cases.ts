import PasswordRecovery from '../schemas/password-recover'


class RecoveryCasesDatabase {

    async createRecover(dataRecover: any) {

        await PasswordRecovery.create(dataRecover)
        console.log("create")
    }

    async deleteRecover(code: string) {
        await PasswordRecovery.deleteOne({ code: code })
    }

    async findCode(code: string): Promise<any> {
        const coder = await PasswordRecovery.findOne({ code: code })
        return coder
    }

}
export default new RecoveryCasesDatabase()