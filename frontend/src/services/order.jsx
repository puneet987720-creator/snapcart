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

export const fetchOrderById = async (orderId) => {
    const response = await API.get(`/placed-order-detail/${orderId}`);
    return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await API.put(`/update-order/${orderId}`, { status });
    return response.data;
};

export const deleteOrder = async (orderId) => {
    const response = await API.delete(`/delete-order/${orderId}`);
    return response.data;
}

export const fetchAllOrders = async () => {
    const response = await API.get('/all-placed-orders');
    return response.data;
};