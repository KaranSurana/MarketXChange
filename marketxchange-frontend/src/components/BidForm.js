import React, { useState } from 'react';
import { placeBid } from '../services/bidService';

const BidForm = ({ productId }) => {
    const [bidAmount, setBidAmount] = useState('');

    const handleBid = async (e) => {
        e.preventDefault();
        try {
            const bidData = { amount: bidAmount, productId };
            await placeBid(bidData);
            setBidAmount('');  // Clear the input after successful bid
        } catch (error) {
            console.error('Bid failed:', error.response?.data?.message || 'Unknown error');
        }
    };

    return (
        <form onSubmit={handleBid}>
            <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                required
            />
            <button type="submit">Place Bid</button>
        </form>
    );
};

export default BidForm;
