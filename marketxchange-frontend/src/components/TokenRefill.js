import React from 'react';
import { refillTokens } from '../services/tokenService';

const TokenRefill = ({ onTokensRefilled }) => {

    const handleRefill = async () => {
        try {
            const data = await refillTokens();
            onTokensRefilled(data.currentTokens);
        } catch (error) {
            console.error('Token refill failed:', error);
        }
    };

    return (
        <button onClick={handleRefill} className="btn btn-primary mt-3">
            Refill Tokens
        </button>
    );
};

export default TokenRefill;
