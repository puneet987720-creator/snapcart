import { Form } from "react-router-dom";
import { useContext, useState } from "react";
import { AddToCartStore } from "../../Store/addToCart-Store";
import { LoginStateStore } from "../../Store/loginState-store";
import { OrderProductStore } from "../../Store/orderProduct-store";
import {PaymentCheckout} from "./PaymentCheckout";

export const OrderCheckout = ({totalPrice}) => {
  const [checkoutoption, setCheckoutOption] = useState(false);
    const [cartItems, setCartItems, grossTotal, setGrossTotal] = useContext(AddToCartStore);
    const {IsLoggedIn, setIsLoggedIn, userDetails, setuserDetails} = useContext(LoginStateStore);
    const [ phoneNumber, setPhoneNumber, deliveryAddress, setDeliveryAddress ] = useContext(OrderProductStore);
    return (
        <>
        {!checkoutoption ? (
          <div className="container mx-auto p-4 pt-20">
  <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Checkout Form</h1>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">

            <label className="label">Total Price</label>
            <input type="number" name="totalPrice" value={totalPrice} className="input" placeholder="0" readOnly />

            <label className="label">Delivery Address</label>
            <textarea name="deliveryAddress" className="textarea" onChange={(e)=>{setDeliveryAddress(e.target.value)}} placeholder="Required"></textarea>

            <label className="label">User Email</label>
            <input type="email" name="userEmail" value={userDetails.email} className="input" placeholder="Required" />

            <label className="label">User Name</label>
            <input type="text" name="userName" defaultValue={userDetails.firstname} className="input" placeholder="Required" />

            <label className="label">User Phone</label>
            <input type="tel" onChange={(e)=>{setPhoneNumber(e.target.value)}} name="userPhone" className="input" placeholder="Required" />

            <button className="btn btn-neutral mt-4" onClick={() => setCheckoutOption(true)}>Submit</button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</div>
): (
          <PaymentCheckout
           cartItems={cartItems}
          totalPrice={totalPrice}
             deliveryAddress={deliveryAddress}
              userEmail={userDetails.email}
               userName={userDetails.firstname}
                userPhone={phoneNumber} />
        )}
        </>
    );
};