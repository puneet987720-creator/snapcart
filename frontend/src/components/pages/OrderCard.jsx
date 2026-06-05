import { NavLink } from "react-router-dom";
export const OrderCard = ({ order }) => {
    console.log("Order data in OrderCard:", order);
    return (
        <>
        <NavLink to={`/order-details/${order._id}`} className="block">
            <article className="card bg-base-100 shadow hover:shadow-xl transition">
                <div className="card-body gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">Order #{order._id}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="badge badge-warning badge-outline">{order.status}</span>
                            <span className="text-sm text-base-content/70">{order.date}</span>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-base-200 p-4">
                            <p className="text-sm text-base-content/60">Items</p>
                            <p className="font-semibold text-base-content">{order.products.length}</p>
                        </div>
                        <div className="rounded-2xl bg-base-200 p-4">
                            <p className="text-sm text-base-content/60">Total</p>
                            <p className="font-semibold text-base-content">₹{order.totalPrice}</p>
                        </div>
                        <div className="rounded-2xl bg-base-200 p-4">
                            <p className="text-sm text-base-content/60">Delivery</p>
                            <p className="font-semibold text-base-content">Standard</p>
                        </div>
                    </div>
                </div>
            </article>
        </NavLink>
        </>
    )
}