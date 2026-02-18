const order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const { products, totalPrice, deliveryAddress, paymentInfo } = req.body;
            const authenticatedUserId = req.session.auth.id;
            if (!authenticatedUserId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        const newOrder = new order({
            userId: authenticatedUserId,
            products,
            totalPrice,
            deliveryAddress,
            paymentInfo
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
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



