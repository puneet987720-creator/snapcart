import { ProductCard } from "../pages/ProductCard";
import { fetchProducts } from "../../services/poducts";
import { useEffect, useState } from "react";
import {Loader} from "../pages/loader";

export function ShowProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProductList = async() => {
        try {
            const response = await fetchProducts();
            const productList = response.data.products;
            console.log('Fetched products:', productList);
            setProducts(productList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }
      useEffect(() => {
        fetchProductList();
}, [])
  return (
    <>
    <div className="mt-20 p-4 flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
    {loading && <Loader />}
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}

  </div>
</div>
    </>
  );
}