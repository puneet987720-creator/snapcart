import React, { useState } from 'react';
import {
    createRazorpayOrder,
    verifyPayment,
    loadRazorpayScript,
    openRazorpayCheckout
} from '../../services/paymentService';

export const PaymentCheckout = ({ cartItems, totalPrice, deliveryAddress, userEmail, userName, userPhone }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError(null);

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) throw new Error("Failed to load Razorpay script");

            const orderResponse = await createRazorpayOrder(cartItems, totalPrice, deliveryAddress);
            if (!orderResponse.success) throw new Error("Failed to create order");

            await openRazorpayCheckout(
                orderResponse.orderId,
                orderResponse.keyId,
                userEmail,
                userName,
                userPhone,
                async (paymentResponse) => {
                    try {
                        const verifyResponse = await verifyPayment(
                            orderResponse.orderId,
                            paymentResponse.razorpay_payment_id,
                            paymentResponse.razorpay_signature,
                            cartItems,
                            totalPrice,
                            deliveryAddress
                        );

                        if (verifyResponse.success) {
                            setSuccess(true);
                            console.log("Payment successful! Order ID:", verifyResponse.orderId);
                        } else {
                            setError("Payment verification failed");
                        }
                    } catch (err) {
                        setError("Error verifying payment: " + err.message);
                    }
                    setLoading(false);
                },
                (err) => {
                    setError("Payment failed: " + err.message);
                    setLoading(false);
                }
            );
        } catch (err) {
            setError("Error: " + err.message);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="alert alert-success shadow-lg mt-24 mx-auto w-96">
                <div>
                    <h3 className="font-bold text-lg">Payment Successful!</h3>
                    <p>Your order has been placed. You will receive a confirmation email soon.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start pt-24"> {/* pushes below navbar */}
            <div className="card bg-base-100 shadow-2xl w-96 h-[500px] flex flex-col justify-between">
                <div className="card-body">
                    <h3 className="card-title text-xl font-bold">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                        <p>Items: <span className="font-semibold">{cartItems.length}</span></p>
                        <p>Total Amount: <span className="font-semibold">₹{totalPrice}</span></p>
                        <p>Delivery Address: <span className="font-semibold">{deliveryAddress}</span></p>
                    </div>

                    {error && (
                        <div className="alert alert-error mt-4">
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <div className="card-actions justify-center mb-6">
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                    >
                        {loading ? "Processing..." : "Pay with Razorpay"}
                    </button>
                </div>
            </div>
        </div>
    );
};



export default PaymentCheckout;