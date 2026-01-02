const nodemailer = require('nodemailer');

const transportemail = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,      
    secure: true,  
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.GMAIL_PASSWORD
        }
});

module.exports = transportemail;
