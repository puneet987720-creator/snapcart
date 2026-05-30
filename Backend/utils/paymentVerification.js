const crypto = require('crypto');

// Verify Razorpay payment signature
exports.verifyPaymentSignature = (orderId, paymentId, signature, secretKey) => {
    try {
        // Create HMAC SHA256 hash
        const body = orderId + "|" + paymentId;
        const expectedSignature = crypto
            .createHmac('sha256', secretKey)
            .update(body)
            .digest('hex');

        // Compare signatures
        if (expectedSignature === signature) {
            return { isValid: true, message: 'Payment verified successfully' };
        } else {
            return { isValid: false, message: 'Invalid payment signature' };
        }
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

// Generate order ID for Razorpay
exports.generateOrderId = () => {
    return 'order_' + Date.now();
};