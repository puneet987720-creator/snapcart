const {BrevoClient} = require('@getbrevo/brevo')
const dotenv = require('dotenv')
dotenv.config()

async function verifyEmail(email, token) {
  if (!process.env.BREVO_API_KEY ) {
    throw new Error('BREVO_API_KEY is not set')
  }
  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
  })

  try{
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Verify Your Email',
      textContent: `click on the link to verify your email: ${process.env.CLIENT_URL}/verify-email/${token}`,

      sender:{
        name: 'Snapcart Team',
        email: process.env.MAIL_USER
      },
      to: [{ email: email }]
    })
    console.log('Verification email sent: %s', result.messageId)
  }catch(error){
    console.error('Error sending verification email:', error)
    throw error
  }
}

exports.verifyEmail = verifyEmail