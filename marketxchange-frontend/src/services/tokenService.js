import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tokens';

export const refillTokens = async () => {
    const response = await axios.post(`${API_URL}/refill`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};
