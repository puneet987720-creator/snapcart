import {CartPage} from "../components/Order/addToCartPage";
import { OrderCheckout } from "../components/Order/OrderCheckout";

import { UserOrder } from "../components/Order/UserOrder";
import { OrderDetails } from "../components/Order/OrderDetails";

import { AllPlacedOrder } from "../components/Order/AllPlacedOrder";
import { OrderDetailsAdmin } from "../components/Order/OrderDetailsAdmin";
export const cartRoutes = [
    {
        path: "/cart",
        element: <CartPage />
    },
    {
        path: "/checkout",
        element: <OrderCheckout />
    },
    {
        path: "/my-orders",
        element: <UserOrder />
    },
    {
        path: "/order-details/:orderId",
        element: <OrderDetails />
    },
    {
        path: "/all-orders",
        element: <AllPlacedOrder />
    },
    {
        path: "/order-details-admin/:orderId",
        element: <OrderDetailsAdmin />
    }
];