import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bidding';

export const placeBid = async (bidData) => {
    const response = await axios.post(`${API_URL}/place`, bidData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const getBidsByProduct = async (productId) => {
    console.log(productId);
    
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
};
