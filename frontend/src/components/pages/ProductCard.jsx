import { useNavigate } from "react-router-dom";
import { AddToCartStore } from "../../Store/addToCart-Store";
import { useContext } from "react";
import { addToCart } from "../../services/poducts";
import { LoginStateStore } from "../../Store/loginState-store"
import { deleteProduct } from "../../services/poducts";
import { UPLOADS_URL } from "../../services/apiConfig";

export function ProductCard({ product }) {
  const [cartItems, setCartItems] = useContext(AddToCartStore);
    const {IsLoggedIn, setIsLoggedIn, userDetails, setuserDetails} = useContext(LoginStateStore);
  const handleAddToCart = async (productId) => {
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
  const handleImageClick = async (id) => {
    try {
      Navigate(`/product/${id}`)
    } catch {
      console.error('Error fetching product details');
    }

  }
  return (
   <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
  <figure className="relative overflow-hidden">
    {/* Product Image */}
    <img
      src={
        product.image
          ? `${UPLOADS_URL}/${product.image}`
          : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      }
      alt={product.name}
      onClick={async () => await handleImageClick(product._id)}
      className="w-full object-contain max-h-64 transition-transform duration-300 hover:scale-105"
    />

    {/* Dropdown at top-right */}
{userDetails?.usertype === "admin" && (
  <div className="dropdown dropdown-start absolute top-2 right-6">
    <div tabIndex={0} role="button" className="btn btn-xs m-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    </div>
      <ul
      tabIndex={-1}
      className="dropdown-content menu bg-base-100 rounded-box z-10 w-40 p-2 shadow-sm"
    >
      <li><a href={`/product/${product._id}/edit`}>Edit</a></li>
      <li>
        <a
          onClick={() => document.getElementById(`product_modal_${product._id}`).showModal()}
        >
          Delete
        </a>
      </li>
    </ul>
    
<dialog id={`product_modal_${product._id}`} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Delete Product</h3>
    <p className="py-4">Are you sure you want to delete this product?</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Cancel</button>
        <a onClick={async () => await deleteProduct(product._id).then(()=>{ window.location.reload(); })} className="btn btn-error">Delete</a>
      </form>
    </div>
  </div>
</dialog>
  </div>
)}
</figure>


  <div className="card-body p-4">
    {/* Product Name */}
    <h2 className="card-title text-lg line-clamp-2">
      {product.name.toUpperCase()}
    </h2>
    {/* Brand */}
    <p className="text-sm font-semibold text-accent">
      {product.brand.toUpperCase()}
    </p>

    {/* Description */}
    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

    {/* Price Section */}
    <div className="flex items-center gap-2 mt-2">
      <p className="text-2xl font-bold text-primary">₹{product.price}</p>
      <p className="text-sm text-gray-400 line-through">₹{product.price * 1.2}</p>
      <span className="badge badge-primary text-xs">20% off</span>
    </div>

    {/* Stock Status */}
    <div className="text-xs font-semibold text-success">✓ In Stock</div>

    {/* Actions */}
    <div className="card-actions justify-between mt-4 gap-2">
      <button
        onClick={() => handleAddToCart(product._id)}
        className="btn btn-outline btn-sm flex-1"
      >
        Add to Cart
      </button>
      <button className="btn btn-primary btn-sm flex-1">Buy Now</button>
    </div>
  </div>
</div>

  )
} 