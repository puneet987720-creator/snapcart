import { ShowProduct } from "../components/Products.jsx/showProduct";
import { ProductDetail } from "../components/Products.jsx/ProductDetail";

import { createProductAction } from "../components/Products.jsx/addProducts";
import { AddProductForm } from "../components/Products.jsx/addProducts";

import { ProfilePage } from "../components/pages/profilePage";
import { SearchProduct } from "../components/Products.jsx/SearchProduct";

import { FilterPage } from "../components/Products.jsx/filterProduct";
import { FilteredProduct } from "../components/Products.jsx/filteredProduct";

import {updateProductAction} from "../components/Products.jsx/updateProduct";
import {UpdateProductForm} from "../components/Products.jsx/updateProduct";

import { AdminPage } from "../components/pages/adminPage";
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
        path: "/product/:id/edit",
        element: <UpdateProductForm />,
        action: updateProductAction,
    },
    {
        path: "/profilePage",
        element: <ProfilePage />
    },
    {
        path: "/admin",
        element: <AdminPage />
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
    },
]