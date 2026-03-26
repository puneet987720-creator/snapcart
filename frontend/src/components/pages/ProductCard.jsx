import { useNavigate } from "react-router-dom";

export function ProductCard({product}){
  const Navigate = useNavigate()
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
          <h2 className="card-title text-lg line-clamp-2">{product.name}</h2>
          {/* Brand */}
          <p className="text-sm font-semibold text-accent">{product.brand}</p>

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
            <button className="btn btn-outline btn-sm flex-1">Add to Cart</button>
            <button className="btn btn-primary btn-sm flex-1">Buy Now</button>
          </div>
        </div>
      </div>
    )
} 