import React from 'react';
import { ListGroup } from 'react-bootstrap';

const BidsList = ({ bids }) => {
    return (
        <div className="mt-4">
            <h3>Bids</h3>
            {bids.length > 0 ? (
                <ListGroup>
                    {bids.map((bid, index) => (
                        <ListGroup.Item key={index}>
                            ${bid.amount} by {bid.user?.email || 'Anonymous'}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>No bids yet.</p>
            )}
        </div>
    );
};

export default BidsList;
