import SendRecoveryPassword from '../mail/send-recovery-password'
import UserCasesDataBase from '../database-cases/users-database-cases'
import RecoveryCasesDatabase from '../database-cases/recovery-database-cases'
import UserCases from '../usecases/users-usecases'

class RecoverCases {

    async caseForgotPassword(email: string) {
        let statusReturn
        if (!email) {
            statusReturn = {
                code: 400,
                return: { message: "Insira um email válido" }
            }
            return statusReturn
        }
        const userEmail = await UserCasesDataBase.valitUserForEmail(email)
        if (userEmail) {
            const code = Math.floor(Math.random() * 1000000 + 1).toString()

            SendRecoveryPassword.recoveryPassword(userEmail.email, code)
            const recoveryCodeCreation = {
                "user": userEmail._id,
                "code": code,
            }
            RecoveryCasesDatabase.createRecover(recoveryCodeCreation)

            setInterval(async () => {
                await RecoveryCasesDatabase.deleteRecover(code)
            }, 100000);
        }
        statusReturn = {
            code: 200,
            return: { message: "caso este email esteja cadastrado em nosso sistema você recebera um codigo de recuperação nele" }
        }
        return statusReturn
    }
    async recoverPassword(code: string, newPassword: string): Promise<any> {
        let statusReturn
        if (!code || !newPassword) {
            statusReturn = {
                code: 400,
                return: { message: "Por favor insira o código e a nova senha" }
            }
            return statusReturn
        }
        const validatePassword = UserCases.valityPassword(newPassword)
        if (validatePassword) {
            statusReturn =  validatePassword
            return statusReturn
        }

        const codeRecovery = await RecoveryCasesDatabase.findCode(code)

        if (!codeRecovery) {
            statusReturn = {
                code: 400,
                return: { message: "Código invalido" }
            }
            return statusReturn
        }
        await UserCasesDataBase.updateUser(codeRecovery.user, newPassword)
        await RecoveryCasesDatabase.deleteRecover(code)
        statusReturn = {
            code: 200,
            return: { message: "Nova senha definida com sucesso" }
        }
        return statusReturn

    }



}
export default new RecoverCases()

