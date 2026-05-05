// ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, addToCart } from "../../services/poducts";
import { useEffect, useState, useContext } from "react";
import { AddToCartStore } from "../../Store/addToCart-Store";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useContext(AddToCartStore);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      setCartItems([...cartItems, productId]);
      console.log("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-20">Product not found</div>;
  }

  return (
    <div className="flex justify-center mt-20 p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-md">
        <figure>
          <img
            src={`http://localhost:3000/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-96 object-contain"
          />
        </figure>

        <div className="card-body">
          {/* Product Name */}
          <h2 className="card-title text-2xl">{product.name}</h2>

          {/* Brand */}
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>

          {/* Description */}
          <p className="text-gray-700">{product.description}</p>

          {/* Price */}
          <p className="text-xl font-bold text-primary">₹{product.price}</p>

          {/* Actions */}
          <div className="card-actions justify-between mt-4">
            <button onClick={() => handleAddToCart(product._id)} className="btn btn-outline btn-primary">Add to Cart</button>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
