import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { getBidsByProduct } from '../services/bidService';
import BidForm from './BidForm';
import BidsList from './BidsList';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);
                const bidData = await getBidsByProduct(id);
                setBids(bidData);
            } catch (error) {
                console.error('Error fetching product or bids:', error);
            }
        };

        fetchProductData();

        // Listen for bidPlaced events and update bids
        socket.on('bidPlaced', (data) => {
            if (data.productId === id) {
                setProduct((prev) => ({ ...prev, price: data.amount }));
                setBids((prev) => [
                    {
                        amount: data.amount,
                        user: data.user
                    },
                    ...prev,
                ]);
            }
        });

        // Cleanup the socket connection when the component unmounts
        return () => {
            socket.off('bidPlaced');
        };
    }, [id]);

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Current Price: ${product.price}</p>
            <BidForm productId={product._id} />
            <BidsList bids={bids} />
        </div>
    );
};

export default ProductDetail;
