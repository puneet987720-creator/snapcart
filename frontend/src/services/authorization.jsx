import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

export const createUser = async (userData) => {
    const response = await API.post('/register', userData);
    return response.data;
};

export const verifyEmail = async (token) => {
    const response = await API.post('/verify', {},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const loginUser = async (credentials) => {
    const response = await API.post('/login', credentials);
    return response.data;
}

export const logoutUser = async () => {
    const response = await API.post('/logout');
    return response
}

export const checkLoginStatus = async () => {
    const response = await API.get('/loginStatus');
    return response;
}