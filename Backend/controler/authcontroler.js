const { ObjectId } = require('mongodb');
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
       if(user.isVerified === true){
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }
    }else{
        return res.status(400).json({ message: 'Please verify your email before logging in' })
    }
        req.session.isLoggedIn = true
        req.session.auth = {
            id: user._id.toString(),
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

exports.logout = (req, res) => {
    console.log(req.body)
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err)
            return res.status(500).json({ message: 'Error logging out' })
        }
        res.status(200).json({ message: 'Logout successful' })
    })
}

exports.getUserDetails = async (req, res) => {
    try {
        const authenticatedUserId = req.session.auth._id
        if (!authenticatedUserId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const user = await Auth.findById(authenticatedUserId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateUserDetails = async (req, res) => {
    try {
        const authenticatedUserId = req.session.auth._id
        if (!authenticatedUserId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const { firstname, lastname, email } = req.body
        const updatedUser = await Auth.findByIdAndUpdate(
            authenticatedUserId, { firstname, lastname, email }, { new: true }
        ).select('-password')
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ user: updatedUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const authenticatedUserId = req.session.auth._id
        if (!authenticatedUserId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const deletedUser = await Auth.findByIdAndDelete(authenticatedUserId)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err)
                return res.status(500).json({ message: 'Error deleting user' })
            }
            res.status(200).json({ message: 'User deleted successfully' })
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const authenticatedUserId = req.session.auth._id
        if (!authenticatedUserId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }   
        const { currentPassword, newPassword } = req.body
        const user = await Auth.findById(authenticatedUserId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect' })
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedNewPassword
        await user.save()
        res.status(200).json({ message: 'Password changed successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.forgotPassword = async (req, res) => {
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
        res.status(200).json({ message: 'Password reset email sent', token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.resetPassword = async (req, res) => {   
    try {
        const { token, newPassword } = req.body
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return res.status(400).json({ message: 'Invalid token' })
        }
        const user = await Auth.findOne({ email: decoded.email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedNewPassword
        user.token = null
        await user.save()
        res.status(200).json({ message: 'Password reset successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Auth.find().select('-password')
        res.status(200).json({ users })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }
        const user = await Auth.findById(userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }
        const deletedUser = await Auth.findByIdAndDelete(userId)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }
        const { firstname, lastname, email, usertype } = req.body
        const updatedUser = await Auth.findByIdAndUpdate(
            userId, { firstname, lastname, email, usertype }, { new: true }
        ).select('-password')
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getUserOrders = async (req, res) => {
    try {
        const authenticatedUserId = req.session.auth._id
        if (!authenticatedUserId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const orders = await Order.find({ userId: authenticatedUserId }).populate('products.productId')
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllUsersWithOrders = async (req, res) => {
    try {
        const users = await Auth.find().select('-password') 
        const usersWithOrders = await Promise.all(users.map(async (user) => {
            const orders = await Order.find({ userId: user._id }).populate('products.productId')
            return { ...user.toObject(), orders }
        }
        ))
        res.status(200).json({ users: usersWithOrders })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getUserDetailsWithOrders = async (req, res) => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }
        const user = await Auth.findById(userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const orders = await Order.find({ userId }).populate('products.productId')
        res.status(200).json({ user, orders })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteUserAndOrders = async (req, res) => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }
        const deletedUser = await Auth.findByIdAndDelete(userId)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }       
        await Order.deleteMany({ userId })
        res.status(200).json({ message: 'User and associated orders deleted successfully' })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

