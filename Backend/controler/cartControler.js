const Cart = require('../models/cart');
const Product = require('../models/products');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.session.auth.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                 userId,
                  products: [] 
                });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.session.auth.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(200).json({ products: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.auth.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.productId._id.toString() === productId);
        if (productIndex > -1) {
            if (quantity <= 0) {
                cart.products.splice(productIndex, 1);
            } else {
                cart.products[productIndex].quantity = quantity;
            }
            cart.updatedAt = Date.now();
            await cart.save();
            res.status(200).json({ message: 'Cart updated', cart });
        } else {
            res.status(404).json({ message: 'Product not in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.session.auth.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.productId._id.toString() !== productId);
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.session.auth.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await Cart.findOneAndDelete({ userId });
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};