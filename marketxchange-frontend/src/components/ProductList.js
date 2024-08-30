import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <a href={`/products/${product._id}`}>{product.name} - ${product.price}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
