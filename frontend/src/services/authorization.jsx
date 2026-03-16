import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
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