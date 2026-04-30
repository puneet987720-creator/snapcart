import { useNavigate } from "react-router-dom";
import { AddToCartStore } from "../../Store/addToCart-Store";
import { useContext } from "react";
import { addToCart } from "../../services/poducts";

export function ProductCard({product})
{
  const [cartItems, setCartItems] = useContext(AddToCartStore);
  const handleAddToCart = async(productId) => {
    try {
      const response = await addToCart(productId);
      // setCartItems([...cartItems, response.data.cart.products[response.data.cart.products.length - 1]]);
      setCartItems(response.data.cart.products);
      console.log("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const Navigate = useNavigate();
  const handleImageClick = async(id) => {
    try{
    Navigate(`/product/${id}`)
    }catch{
      console.error('Error fetching product details');
    }

  }
    return(
      <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <figure className="relative overflow-hidden h-48">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt={product.name}
            onClick={async() => await handleImageClick(product._id)}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </figure>
        <div className="card-body p-4">
          {/* Product Name */}
          <h2 className="card-title text-lg line-clamp-2">{product.name.toUpperCase()}</h2>
          {/* Brand */}
          <p className="text-sm font-semibold text-accent">{product.brand.toUpperCase()}</p>

          {/* Description - truncated */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-2 mt-2">
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            <p className="text-sm text-gray-400 line-through">₹{(product.price * 1.2)}</p>
            <span className="badge badge-primary text-xs">20% off</span>
          </div>

          {/* Stock Status */}
          <div className="text-xs font-semibold text-success">✓ In Stock</div>

          {/* Actions */}
          <div className="card-actions justify-between mt-4 gap-2">
            <button onClick={()=>{handleAddToCart(product._id)}} className="btn btn-outline btn-sm flex-1">Add to Cart</button>
            <button className="btn btn-primary btn-sm flex-1">Buy Now</button>
          </div>
        </div>
      </div>
    )
} 