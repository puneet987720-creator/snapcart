import React, { useContext, useState } from "react";
import { AddToCartStore } from "../../Store/addToCart-Store";
import { updateCartItem } from "../../services/poducts";
import { OrderCheckout } from "./orderCheckout";
import { removeFromCart } from "../../services/poducts";
import { clearCart } from "../../services/poducts";

export const CartPage = () => {
  const [orderForm, setOrderForm] = useState(false);
  const [cartItems, setCartItems,] = useContext(AddToCartStore);

  // Calculate gross total
  let grossTotal = 0;
  if (Array.isArray(cartItems)) {
    cartItems.forEach(item => {
      grossTotal += item.productId.price * item.quantity;
    });
  }

  // Empty handlers (to be replaced with server calls)
  const handleIncrement = async(item) => {
    let productId = item.productId._id;
    let quantity = item.quantity + 1;
    const response = await updateCartItem(productId, quantity);
    if(response.status === 200){
      setCartItems(response.data.cart.products);
    }
  };

  const handleDecrement = async(item) => {
    let productId = item.productId._id;
    let quantity = item.quantity - 1;
    const response = await updateCartItem(productId, quantity);
    if(response.status === 200){
      setCartItems(response.data.cart.products);
    }
  };

  const handleDelete = async(item) => {
    let productId = item.productId._id;
    const response = await removeFromCart(productId);
    if(response.status === 200){
      setCartItems(response.data.cart.products);
    }
    console.log("Delete:", item);
  };

  const handleClearCart = async() => {
    const response = await clearCart();
    if(response.status === 200){
      setCartItems([]);
    }
    console.log("Clear Cart");
  };

  return (
    <>
    {orderForm ? (<OrderCheckout totalPrice={grossTotal} />) : (

      <div className="container mx-auto p-4 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet</p>
      ) : (
        <>
          {/* Responsive grid: 1 col on mobile, 2 on md, 4 on lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-sm p-4 flex flex-col"
              >
                <figure>
                  <img
                    src={`http://localhost:3000/uploads/${item.productId.image}`}
                    alt={item.productId.name}
                    className="w-full h-auto object-cover rounded"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.productId.name}</h2>
                  <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                  <p className="text-sm">Price: ₹{item.productId.price}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleDecrement(item)}
                    >
                      ➖
                    </button>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleIncrement(item)}
                    >
                      ➕
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gross total at bottom */}
            <div className="card bg-base-200 shadow-md p-4 mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Gross Total: ₹{grossTotal}
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setOrderForm(true)}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
      )}
  </>    
  )}