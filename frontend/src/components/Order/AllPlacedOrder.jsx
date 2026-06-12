import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../services/order";
import { NavLink } from "react-router-dom";

export const AllPlacedOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                setLoading(true);
                const response = await fetchAllOrders();
                setOrders(response);
            } catch (err) {
                setError("Failed to fetch orders");
                console.error("Error fetching all orders:", err);
            } finally {
                setLoading(false);
            }
        };
        getAllOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 text-base-content">
            <div className="container mx-auto px-4 py-10">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body gap-8">
                        {/* Header Section */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                                    All Orders
                                </p>
                                <h1 className="text-3xl font-bold">Order Management</h1>
                                <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                                    View and manage all customer orders in one place.
                                </p>
                            </div>
                            <div className="badge badge-outline badge-lg">
                                Total: {orders.length}
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="stats stats-vertical lg:stats-horizontal shadow">
                            <div className="stat">
                                <div className="stat-title">Total Orders</div>
                                <div className="stat-value text-primary">{orders.length}</div>
                                <div className="stat-desc">All time</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Pending</div>
                                <div className="stat-value text-warning">{orders.filter((order) => order.status === "pending").length}</div>
                                <div className="stat-desc">Awaiting shipment</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Delivered</div>
                                <div className="stat-value text-success">{orders.filter((order) => order.status === "delivered").length}</div>
                                <div className="stat-desc">Completed</div>
                            </div>
                        </div>

                        {/* Orders Grid Section */}
                        <div className="card bg-base-200 shadow-sm border border-base-300">
                            <div className="card-body">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="card-title">All Orders</h2>
                                        <p className="text-sm text-base-content/70">
                                            Displaying {orders.length} orders total.
                                        </p>
                                    </div>
                                </div>

                                {orders.length === 0 ? (
                                    <div className="mt-6 text-center py-10">
                                        <p className="text-base-content/70">No orders found</p>
                                    </div>
                                ) : (
                                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                        {orders.filter((order) => order.status !== "delivered").map((order) => (
                                            <NavLink
                                                key={order._id}
                                                to={`/order-details-admin/${order._id}`}
                                                className="block"
                                            >
                                                <article className="card bg-base-100 shadow hover:shadow-xl transition duration-300 border border-base-300 hover:border-primary">
                                                    <div className="card-body gap-4">
                                                        {/* Card Header: Order ID and Status */}
                                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                            <div className="flex-1">
                                                                <h3 className="text-lg font-semibold text-primary">
                                                                    Order #{order._id?.slice(-8)}
                                                                </h3>
                                                                <p className="text-xs text-base-content/50">
                                                                    Full ID: {order._id}
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span
                                                                    className={`badge ${order.status === "pending"
                                                                        ? "badge-warning"
                                                                        : order.status === "delivered"
                                                                            ? "badge-success"
                                                                            : "badge-info"
                                                                        } badge-outline`}
                                                                >
                                                                    {order.status?.toUpperCase()}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Card Body: Order Details Grid */}
                                                        <div className="divider my-2"></div>

                                                        <div className="grid gap-3 sm:grid-cols-2">
                                                            {/* Number of Products */}
                                                            <div className="rounded-lg bg-base-200 p-3 hover:bg-primary/10 transition">
                                                                <p className="text-xs text-base-content/60 font-semibold">
                                                                    NO. OF PRODUCTS
                                                                </p>
                                                                <p className="text-2xl font-bold text-primary">
                                                                    {order.products?.length || 0}
                                                                </p>
                                                            </div>

                                                            {/* Total Price */}
                                                            <div className="rounded-lg bg-base-200 p-3 hover:bg-success/10 transition">
                                                                <p className="text-xs text-base-content/60 font-semibold">
                                                                    TOTAL PRICE
                                                                </p>
                                                                <p className="text-2xl font-bold text-success">
                                                                    ₹{order.totalPrice?.toLocaleString()}
                                                                </p>
                                                            </div>

                                                            {/* Order Date */}
                                                            <div className="rounded-lg bg-base-200 p-3 sm:col-span-2 hover:bg-info/10 transition">
                                                                <p className="text-xs text-base-content/60 font-semibold">
                                                                    ORDER DATE
                                                                </p>
                                                                <p className="text-lg font-semibold text-base-content">
                                                                    {new Date(order.orderDate).toLocaleDateString("en-US", {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Card Footer: View Details Link */}
                                                        <div className="mt-2 flex justify-end">
                                                            <span className="text-sm text-primary font-semibold group-hover:underline">
                                                                View Details →
                                                            </span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}