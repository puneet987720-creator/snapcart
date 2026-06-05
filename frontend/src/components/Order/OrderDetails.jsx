import { useEffect, useState } from "react";
import { fetchOrderById } from "../../services/order";
import { useParams } from "react-router-dom";
import { UPLOADS_URL } from "../../services/apiConfig";

export const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetchOrderById(orderId);
                console.log("Fetched order details:", response);
                setOrder(response);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        fetchOrder();
    }, [orderId]);
    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-base-200 text-base-content">
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body gap-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                                    Order #{order._id}
                                </p>
                                <h1 className="text-3xl font-bold">Order Summary</h1>
                                <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                                    Review the details of your order, including items, pricing, and delivery information.
                                </p>
                            </div>
                            <div className="badge badge-outline badge-lg">
                                {order.status}
                            </div>
                        </div>
                        <div className="stats stats-vertical lg:stats-horizontal shadow">
                            <div className="stat">
                                <div className="stat-title">Total items</div>
                                <div className="stat-value text-primary">{order.products.length}</div>
                                <div className="stat-desc">Updated just now</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Total</div>
                                <div className="stat-value text-primary">₹{order.totalPrice}</div>
                                <div className="stat-desc">Inclusive of all taxes</div>
                            </div>
                        </div>
                        <div className="mt-6 grid gap-6 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <h3 className="text-xl font-semibold mb-4">Items in this order</h3>
                                <div className="space-y-4">
                                    {order.products.map((product, idx) => {
                                        const p = product.productId || {};
                                        const qty = product.quantity || 0;
                                        const unit = p.price ?? 0;
                                        const subtotal = (unit * qty).toFixed(2);
                                        const imgSrc = p.image ? `${UPLOADS_URL}/${p.image}` : "/fallback-product.png";
                                        return (
                                            <div key={product._id || idx} className="card bg-base-100 shadow-sm flex items-center gap-4 p-4">
                                                <img src={imgSrc} alt={p.name} className="w-20 h-20 object-cover rounded" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/fallback-product.png'; }} />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{p.name || 'Product'}</h4>
                                                    <p className="text-sm text-base-content/70">{p.description || ''}</p>
                                                    <div className="mt-2 flex items-center gap-4">
                                                        <span className="badge badge-outline">Qty: {qty}</span>
                                                        <span className="text-sm">Unit: ₹{unit}</span>
                                                        <span className="font-semibold">Subtotal: ₹{subtotal}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <aside className="space-y-4">
                                <div className="card bg-base-100 p-4">
                                    <h4 className="font-semibold">Delivery Address</h4>
                                    <p className="text-sm text-base-content/70 mt-2 whitespace-pre-line">{order.deliveryAddress}</p>
                                </div>

                                <div className="card bg-base-100 p-4">
                                    <h4 className="font-semibold">Payment Info</h4>
                                    <p className="text-sm text-base-content/70 mt-2">Method: <span className="font-medium">{order.paymentInfo?.method || '—'}</span></p>
                                    <p className="text-sm text-base-content/70">Transaction ID: <span className="font-medium">{order.paymentInfo?.transactionId || '—'}</span></p>
                                    {order.paymentInfo?.razorpayPaymentId && (
                                        <p className="text-sm text-base-content/70">Razorpay Payment ID: <span className="font-medium">{order.paymentInfo.razorpayPaymentId}</span></p>
                                    )}
                                </div>

                                <div className="card bg-base-100 p-4">
                                    <h4 className="font-semibold">Order Summary</h4>
                                    <div className="mt-2 text-sm text-base-content/70">
                                        <p>Total items: <span className="font-medium">{order.products.length}</span></p>
                                        <p className="mt-1">Total price: <span className="font-medium">₹{order.totalPrice}</span></p>
                                        <p className="mt-1">Placed on: <span className="font-medium">{new Date(order.orderDate).toLocaleString()}</span></p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
