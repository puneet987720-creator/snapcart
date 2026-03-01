const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    products: [ {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    paymentInfo: {
        method:{
            type: String,
            enum: ['credit_card', 'upi', 'cash_on_delivery'],
            required: true
        },
        transactionId: {
            type: String,
            required: true
        }
},
deliveryAddress: {
    type: String,
    required: true
},
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
})

module.exports = mongoose.model('Order', orderSchema)