import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
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

export const checkLoginStatus = async () => {
    const response = await API.get('/loginStatus');
    return response;
}