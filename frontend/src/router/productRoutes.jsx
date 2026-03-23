import { ShowProduct } from "../components/Products.jsx/showProduct";
import { ProductDetail } from "../components/Products.jsx/ProductDetail";

export const productRoutes = [
    {
        path: "/product",
        element: <ShowProduct />,
    },
    {
        path: "/product/:id",
        element: <ProductDetail />,
    }
]