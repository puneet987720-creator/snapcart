import {CartPage} from "../components/Order/addToCartPage";
import { OrderCheckout } from "../components/Order/OrderCheckout";

export const cartRoutes = [
    {
        path: "/cart",
        element: <CartPage />
    },
    {
        path: "/checkout",
        element: <OrderCheckout />
    }
];