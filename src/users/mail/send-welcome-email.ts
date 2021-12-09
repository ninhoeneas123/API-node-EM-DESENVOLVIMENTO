import Email from '../../nodeMailer/mail'


class sendWelcomeMail {

    welcomeEmail(to: string, userName: string) {

        let mailOptions = {
            from: "nao.responda@jecursos",
            to: to,
            subject: "Bem Vindo",
            html: `Olá ${userName}, seja Bem vindo! `,
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

export default new sendWelcomeMail