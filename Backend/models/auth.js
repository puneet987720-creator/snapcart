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
    userProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userProducts'
    }],
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