const order = require('../models/order');
const Razorpay = require('razorpay');
const { verifyPaymentSignature } = require('../utils/paymentVerification');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
    try {
        const { products, totalPrice, deliveryAddress } = req.body;
        const authenticatedUserId = req.session.auth.id;

        if (!authenticatedUserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Create order on Razorpay
        const razorpayOrder = await razorpay.orders.create({
            amount: totalPrice * 100, // Razorpay expects amount in paise
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
                userId: authenticatedUserId,
                products: JSON.stringify(products),
                deliveryAddress: deliveryAddress
            }
        });

        res.status(201).json({
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

// Verify Payment and Create Order
exports.verifyPaymentAndCreateOrder = async (req, res) => {
    try {
        const { orderId, paymentId, signature, products, totalPrice, deliveryAddress } = req.body;
        const authenticatedUserId = req.session.auth.id;

        if (!authenticatedUserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify signature
        const verification = verifyPaymentSignature(orderId, paymentId, signature, process.env.RAZORPAY_KEY_SECRET);

        if (!verification.isValid) {
            return res.status(400).json({ message: 'Payment verification failed', success: false });
        }

        // Create order in database
        const newOrder = new order({
            userId: authenticatedUserId,
            products,
            totalPrice,
            deliveryAddress,
            paymentInfo: {
                method: 'razorpay',
                transactionId: paymentId,
                razorpayOrderId: orderId,
                razorpayPaymentId: paymentId,
                razorpaySignature: signature
            },
            status: 'pending'
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'Payment verified and order created successfully',
            orderId: savedOrder._id,
            order: savedOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message, success: false });
    }
};

// Create Order (for COD or other methods)
exports.createOrder = async (req, res) => {
    try {
        const { products, totalPrice, deliveryAddress} = req.body;
            const authenticatedUserId = req.session.auth.id;
            if (!authenticatedUserId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        const newOrder = new order({
            userId: authenticatedUserId,
            products,
            totalPrice,
            deliveryAddress,
            paymentInfo: {
                method: 'cash_on_delivery',
                transactionId: 'COD_' + Date.now()
            }
        });
        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, message: 'Order placed successfully', orderId: savedOrder._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await order.find({ userId }).populate('products.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;
        const updatedOrder = await order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await order.find().populate('products.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const orderDetails = await order.findById(orderId).populate('products.productId');
        if (!orderDetails) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



