import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

// Create Razorpay Order
export const createRazorpayOrder = async (products, totalPrice, deliveryAddress) => {
    try {
        const response = await API.post('/create-razorpay-order', {
            products,
            totalPrice,
            deliveryAddress
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
};

// Verify Payment
export const verifyPayment = async (orderId, paymentId, signature, products, totalPrice, deliveryAddress) => {
    try {
        const response = await API.post('/verify-payment', {
            orderId,
            paymentId,
            signature,
            products,
            totalPrice,
            deliveryAddress
        });
        return response.data;
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw error;
    }
};

// Load Razorpay Script
export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// Open Razorpay Checkout
export const openRazorpayCheckout = async (
    razorpayOrderId,
    keyId,
    userEmail,
    userName,
    userPhone,
    onSuccess,
    onError
) => {
    const options = {
        key: keyId,
        order_id: razorpayOrderId,
        handler: async (response) => {
            try {
                onSuccess(response);
            } catch (error) {
                onError(error);
            }
        },
        prefill: {
            email: userEmail,
            name: userName,
            contact: userPhone
        },
        theme: {
            color: '#3399cc'
        },
        modal: {
            ondismiss: () => {
                onError(new Error('Payment cancelled'));
            }
        }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
};