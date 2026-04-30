import axios from 'axios';

export const URL = 'http://localhost:3000';
const API = axios.create({
    baseURL: URL,
    withCredentials: true
});

export const fetchProducts = () => API.get('/all');

export const fetchProductById = (id) => API.get(`/details/${id}`);

export const addProduct = (productData) => API.post('/add', productData);

export const searchProducts = (searchTerm) => API.get(`/search?query=${searchTerm}`);

export const filterProduct = (categories, brand, minPrice, maxPrice) => API.get(`/filter`,{
    params:{
        category:categories,
        brand:brand,
        minPrice:minPrice,
        maxPrice:maxPrice
    }
})

export const addToCart = (productId, quantity = 1) => API.post('/cart/add', { productId, quantity });

export const getCart = () => API.get('/getcart');

export const updateCartItem = (productId, quantity) => API.put('/cart/update', { productId, quantity });

export const removeFromCart = (productId) => API.delete(`/cart/remove/${productId}`);

export const clearCart = () => API.delete('/cart/clear');