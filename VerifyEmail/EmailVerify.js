const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

async function verifyEmail(email,token) {

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

let mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Please click on the following link to verify your email: http://localhost:3000/verify-email/${token}`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});

}

exports.verifyEmail = verifyEmail