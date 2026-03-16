import axios from 'axios';

export const URL = 'http://localhost:3000';
const API = axios.create({
    baseURL: URL,
});

export const fetchProducts = () => API.get('/all');