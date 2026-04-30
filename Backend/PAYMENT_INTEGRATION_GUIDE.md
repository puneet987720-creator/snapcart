# Razorpay Payment Integration - Implementation Guide

## Backend Changes Made

### 1. **Order Model** (`models/order.js`)
   - Added Razorpay-specific fields to `paymentInfo`:
     - `razorpayOrderId`: Stores Razorpay order ID
     - `razorpayPaymentId`: Stores Razorpay payment ID
     - `razorpaySignature`: Stores payment signature for verification
   - Added 'razorpay' as payment method option

### 2. **Payment Verification Utility** (`utils/paymentVerification.js`)
   - `verifyPaymentSignature()`: Validates Razorpay payment using HMAC-SHA256 hash
   - Creates cryptographic signature to ensure payment authenticity

### 3. **Order Controller** (`controler/ordercontroler.js`)
   - **`createRazorpayOrder()`**: Creates order on Razorpay, returns order ID and key
   - **`verifyPaymentAndCreateOrder()`**: Verifies payment signature and saves order to DB
   - Kept existing `createOrder()` for other payment methods

### 4. **Order Routes** (`routes/orderRoutes.js`)
   - `POST /create-razorpay-order`: Creates Razorpay order
   - `POST /verify-payment`: Verifies payment and creates order

### 5. **Environment Variables** (`.env`)
   - Updated keys:
     - `RAZORPAY_KEY_ID`: Your Razorpay API Key
     - `RAZORPAY_KEY_SECRET`: Your Razorpay Secret Key

---

## Frontend Changes Made

### 1. **Payment Service** (`services/paymentService.jsx`)
   - `loadRazorpayScript()`: Loads Razorpay SDK
   - `createRazorpayOrder()`: Calls backend to create order
   - `openRazorpayCheckout()`: Opens Razorpay payment modal
   - `verifyPayment()`: Sends payment details to backend for verification

### 2. **Checkout Component** (`components/PaymentCheckout.jsx`)
   - Ready-to-use React component
   - Handles loading states and error messages
   - Shows success/failure feedback

---

## How to Use in Your Existing Components

### Step 1: Update `addToCartPage.jsx`

```jsx
import PaymentCheckout from '../components/PaymentCheckout';

// In your component:
<PaymentCheckout
    cartItems={cartItems}
    totalPrice={totalPrice}
    deliveryAddress={deliveryAddress}
    userEmail={userEmail}
    userName={userName}
    userPhone={userPhone}
/>
```

### Step 2: Get User Information

You'll need to collect:
- `userEmail`: User's email
- `userName`: User's name
- `userPhone`: User's phone number
- `deliveryAddress`: Delivery address
- `cartItems`: Array of cart items
- `totalPrice`: Total amount to pay

### Step 3: Add Razorpay Script to HTML

Add this to your main `index.html`:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

## Payment Flow Summary

```
1. User clicks "Pay with Razorpay"
   ↓
2. Frontend calls: POST /create-razorpay-order
   ↓
3. Backend creates order on Razorpay → Returns order_id
   ↓
4. Frontend opens Razorpay checkout modal
   ↓
5. User completes payment
   ↓
6. Razorpay sends: payment_id, order_id, signature
   ↓
7. Frontend calls: POST /verify-payment
   ↓
8. Backend verifies signature (ensures payment is authentic)
   ↓
9. If valid: Order saved to DB, success shown
   If invalid: Error shown, order NOT saved
```

---

## Testing with Test Cards

Use these test cards (Razorpay provides):

**Success Card:**
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Failed Card:**
- Card Number: 4111 1111 1111 1110
- Expiry: Any future date
- CVV: Any 3 digits

---

## Security Best Practices Implemented

✅ **Signature Verification**: Payment verified using HMAC-SHA256
✅ **Secret Key Safe**: Never exposed to frontend
✅ **Order Verification**: Database saves only after signature matches
✅ **Tamper Protection**: Signature prevents unauthorized payment modifications

---

## Environment Setup

Your `.env` already contains Razorpay test credentials:
```
RAZORPAY_KEY_ID="rzp_test_SiuYwCWMSfEAJl"
RAZORPAY_KEY_SECRET="iD0RxfSTx45IqNk2nXQ1tAmD"
```

**For Production:**
1. Get live credentials from Razorpay dashboard
2. Replace test credentials in `.env`:
   ```
   RAZORPAY_KEY_ID="rzp_live_your_live_key"
   RAZORPAY_KEY_SECRET="your_live_secret_key"
   ```

---

## Troubleshooting

**Order Creation Fails:**
- Check if `RAZORPAY_KEY_ID` is correct
- Verify user is authenticated (`req.session.auth.id`)

**Payment Verification Fails:**
- Ensure signature matches exactly
- Check `RAZORPAY_KEY_SECRET` is correct
- Verify order_id and payment_id are sent correctly

**Razorpay Script Not Loading:**
- Check if CDN URL is accessible
- Verify no browser extensions blocking scripts
- Check browser console for errors

---

## Next Steps

1. ✅ Backend integration: DONE
2. ✅ Frontend service: DONE
3. ✅ Sample component: DONE
4. ⏳ Integrate PaymentCheckout in your cart/checkout page
5. ⏳ Test with test cards
6. ⏳ Deploy to production with live credentials

---

## API Endpoints

### Create Razorpay Order
```
POST /create-razorpay-order
Body: {
    products: [...],
    totalPrice: 1000,
    deliveryAddress: "123 Main St"
}
Response: {
    success: true,
    orderId: "order_xxxxx",
    amount: 100000,
    currency: "INR",
    keyId: "rzp_test_xxx"
}
```

### Verify Payment
```
POST /verify-payment
Body: {
    orderId: "order_xxxxx",
    paymentId: "pay_xxxxx",
    signature: "xxxx",
    products: [...],
    totalPrice: 1000,
    deliveryAddress: "123 Main St"
}
Response: {
    success: true,
    message: "Payment verified and order created successfully",
    orderId: "db_order_id"
}
```

---

## Database Order Structure

Orders now include:

```javascript
{
    userId: ObjectId,
    products: [...],
    totalPrice: 1000,
    deliveryAddress: "123 Main St",
    paymentInfo: {
        method: "razorpay",
        transactionId: "pay_xxxxx",
        razorpayOrderId: "order_xxxxx",
        razorpayPaymentId: "pay_xxxxx",
        razorpaySignature: "xxxx"
    },
    status: "pending",
    orderDate: Date
}
```