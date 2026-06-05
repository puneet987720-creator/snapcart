import { useEffect,useState, useContext } from "react";
import { LoginStateStore } from "../../Store/loginState-store";
import { fetchUserOrders } from "../../services/order";
import { OrderCard } from "../pages/OrderCard";

export const UserOrder = () => {
   const {IsLoggedIn, setIsLoggedIn, userDetails, setuserDetails} = useContext(LoginStateStore);
    const [orders, setOrders] = useState([]);
    const getUserOrders = async () => {
        try{
            console.log(userDetails.id);
            const response = await fetchUserOrders(userDetails.id);
            setOrders(response);
        }
        catch (error) {
            console.error("Error fetching user orders:", error);
        }
    }
    useEffect(() => {
        if (!IsLoggedIn) {
            window.location.href = "/login";
        }
        getUserOrders();
    }, [IsLoggedIn]);

    return (
        <div className="min-h-screen bg-base-200 text-base-content">
            <div className="container mx-auto px-4 py-10">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body gap-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                                    My Orders
                                </p>
                                <h1 className="text-3xl font-bold">Order history</h1>
                                <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                                    Review your completed orders, delivery details, and order status in one place.
                                </p>
                            </div>

                            <div className="badge badge-outline badge-lg">
                                {IsLoggedIn ? "Signed in user" : "Guest view"}
                            </div>
                        </div>

                        <div className="stats stats-vertical lg:stats-horizontal shadow">
                            <div className="stat">
                                <div className="stat-title">Total orders</div>
                                <div className="stat-value text-primary">{orders.length}</div>
                                <div className="stat-desc">Updated just now</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Pending</div>
                                <div className="stat-value text-secondary">{orders.filter((order) => order.status === "pending").length}</div>
                                <div className="stat-desc">Processing shipment</div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-sm border border-base-300">
                            <div className="card-body">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="card-title">Recent orders</h2>
                                        <p className="text-sm text-base-content/70">
                                            Orders placed in the last 30 days. Scroll to view all records.
                                        </p>
                                    </div>
                                    <button className="btn btn-primary btn-sm">Filter orders</button>
                                </div>

                                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                    {orders.map((order) => (
                                        <OrderCard key={order._id} order={order} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};