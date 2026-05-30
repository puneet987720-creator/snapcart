import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

export const URL = API_BASE_URL;
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