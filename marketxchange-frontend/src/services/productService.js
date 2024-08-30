import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/products';

export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Add the createProduct function
export const createProduct = async (productData) => {
    const response = await axios.post(API_URL, productData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};
