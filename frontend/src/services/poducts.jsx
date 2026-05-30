import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

export const URL = API_BASE_URL;
const API = axios.create({
    baseURL: URL,
    withCredentials: true
});

export const fetchProducts = () => API.get('/all');

export const fetchProductById = (id) => API.get(`/details/${id}`);

export const deleteProduct = (id) => API.delete(`/delete-product/${id}`)

export const updateProduct = (id, productData) => API.put(`/update-product/${id}`, productData)

export const addProduct = (productData) => {
  return API.post('/add', productData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const searchProducts = (searchTerm) => API.get(`/search?query=${searchTerm}`);

export const filterProduct = (categories, brand, minPrice, maxPrice) => API.get(`/filter`,{
    params:{
        category:categories,
        brand:brand,
        minPrice:minPrice,
        maxPrice:maxPrice
    }
})



  //  Cart routes

export const addToCart = (productId, quantity = 1) => API.post('/cart/add', { productId, quantity });

export const getCart = () => API.get('/getcart');

export const updateCartItem = (productId, quantity) => API.put('/cart/update', { productId, quantity });

export const removeFromCart = (productId) => API.delete(`/cart/remove/${productId}`);

export const clearCart = () => API.delete('/cart/clear');