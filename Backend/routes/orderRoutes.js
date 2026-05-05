const express = require('express')
const router = express.Router()

const orderController = require('../controler/ordercontroler')

// Payment endpoints
router.post('/create-razorpay-order', orderController.createRazorpayOrder)
router.post('/verify-payment', orderController.verifyPaymentAndCreateOrder)

// Existing order endpoints
router.post('/place-order', orderController.createOrder)
router.get('/user/:userId', orderController.getUserOrders)
router.get('/placed-order-detail/:orderId', orderController.getOrderById)
router.put('/update/:orderId', orderController.updateOrderStatus)
router.delete('/delete/:orderId', orderController.deleteOrder)
router.get('/all-placed-orders', orderController.getAllOrders)

module.exports = router
