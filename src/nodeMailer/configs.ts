require('dotenv/config')
  

class SMTP_CONFIG {
    public host = process.env.EMAIL_HOST;
    public port = parseInt(process.env.EMAIL_HOST);
    public user = process.env.EMAIL_HOST;
    public password = "3n34s1302";
}

export default new SMTP_CONFIG();