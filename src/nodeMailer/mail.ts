
import * as nodemailer from "nodemailer";
import SMTP_CONFIG from './configs';

class Email {
    public  transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.password
        },
    });
}

export default new Email();