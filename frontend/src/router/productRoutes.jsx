import { ShowProduct } from "../components/Products.jsx/showProduct";
import { ProductDetail } from "../components/Products.jsx/ProductDetail";
import { createProductAction } from "../components/Products.jsx/addProducts";
import { AddProductForm } from "../components/Products.jsx/addProducts";
import { ProfilePage } from "../components/pages/profilePage";
import { SearchProduct } from "../components/Products.jsx/SearchProduct";
import { FilterPage } from "../components/Products.jsx/filterProduct";
import { FilteredProduct } from "../components/Products.jsx/filteredProduct";

export const productRoutes = [
    {
        path: "/product",
        element: <ShowProduct />,
    },
    {
        path: "/product/:id",
        element: <ProductDetail />,
    },
    {
        path: "/product/new",
        element: <AddProductForm />,
        action: createProductAction,
    },
    {
        path: "/profilePage",
        element: <ProfilePage />
    },
    {
        path: "/search",
        element: <SearchProduct />
    },
    {
        path: "/filter",
        element: <FilterPage/>
    },
    {
        path: "/filtered-product",
        element: <FilteredProduct/>
    }
]