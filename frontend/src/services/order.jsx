import axios from 'axios';

export const URL = 'http://localhost:3000';
const API = axios.create({
    baseURL: URL,
    withCredentials: true
});

export const placeOrder = async (products, totalPrice, deliveryAddress) => {
    const response = await API.post('/place-order', { products, totalPrice, deliveryAddress });
    return response.data;
};

export const fetchUserOrders = async (userId) => {
    const response = await API.get(`/orders/${userId}`);
    return response.data;
};