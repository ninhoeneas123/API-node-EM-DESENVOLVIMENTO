import Email from '../../nodeMailer/mail'


class SendRecoveryPassword {

    recoveryPassword(to: string, code: string) {

        let mailOptions = {
            from: "nao.responda@jecursos",
            to: to,
            subject: "Recuperação de Senha",
            html: `Ola, esse é o código para redefinição da sua senha:
                <h1>${code}</h1>
                Caso não tenha sido você que solicitou, ignore este email ou entre em contato com nosso SAC
            `,
        };

        Email.transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }
}

export default new SendRecoveryPassword