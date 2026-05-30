const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

async function verifyEmail(email, token) {
  if (!process.env.MAIL_USER ) {
    throw new Error('MAIL_USER is not set')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  })

  await transporter.verify()

  const sendTestEmail = async () => {
    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verify Your Email',    
    text: `Please click this link to verify your email: ${process.env.CLIENT_URL}/verify-email/${token}`,
      })
      console.log('Verification email sent: %s', info.messageId)
    } catch (error) {
      console.error('Error sending verification email:', error)
      throw error
    }
  }
  await sendTestEmail()
}

exports.verifyEmail = verifyEmail