const dotenv = require('dotenv')
dotenv.config()
const Auth = require('../models/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { verifyEmail } = require('../VerifyEmail/EmailVerify.js')

exports.postregister = async (req, res) => {
    try {
        const { firstname, lastname, email, password, usertype } = req.body
        const existingUser = await Auth.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new Auth({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            usertype
        })
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '10m' })
        verifyEmail(email, token)
        newUser.token = token
        await newUser.save()
        res.status(201).json({ message: newUser, token })
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const authheaders = req.headers.authorization
        if (!authheaders || !authheaders.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const token = authheaders.split(' ')[1]
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({ message: 'Token expired' })
            }
            return res.status(400).json({ message: 'Invalid token' })
        }
        const user = await Auth.findOne({ email: decoded.email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' })
        }
        user.isVerified = true
        user.token = null
        await user.save()
        res.status(200).json({ message: 'Email verified successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.reVerifyEmail = async (req, res) => {
    try {
        const { email } = req.body
        const user = await Auth.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '10m' })
        verifyEmail(email, token)
        user.token = token
        await user.save()
        res.status(200).json({ message: 'Verification email sent', token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.postlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Auth.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        req.session.isLoggedIn = true
        req.session.user = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            usertype: user.usertype
        }
        req.session.save(err => {
            if (err) {
                console.error('Error saving session:', err)
                return res.status(500).json({ message: 'Error saving session' })
            }
        })
        res.status(200).json({ message: 'Login successful' })
    } catch (error) {
        console.error('Error logging in:', error)
        res.status(500).json({ message: 'Server error' })
    }
}
