const express = require('express');
const router = express.Router();
const cartController = require('../controler/cartControler');

router.post('/cart/add', cartController.addToCart);
router.get('/getcart', cartController.getCart);
router.put('/cart/update', cartController.updateCartItem);
router.delete('/cart/remove/:productId', cartController.removeFromCart);
router.delete('/cart/clear', cartController.clearCart);

module.exports = router;