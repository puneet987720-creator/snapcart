const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        enum: ['customer', 'admin'],
        required: true,
    },
    token:{
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
    
})

module.exports = mongoose.model('Auth', authSchema)