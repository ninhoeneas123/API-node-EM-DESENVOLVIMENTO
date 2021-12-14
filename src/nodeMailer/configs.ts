require('dotenv/config')
  

class SMTP_CONFIG {
    public host = process.env.EMAIL_HOST;
    public port = parseInt(process.env.EMAIL_HOST);
    public user = process.env.EMAIL_HOST;
    public password = process.env.EMAIL_PASSWORD;
}

export default new SMTP_CONFIG();