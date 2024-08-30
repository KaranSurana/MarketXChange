import React, { useState } from 'react';
import { createProduct } from '../services/productService';
import { Form, Button } from 'react-bootstrap';

const CreateProductPage = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                name: productName,
                description: productDescription,
                price: productPrice,
            };
            await createProduct(productData);
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            alert('Product created successfully!');
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <div className="mt-4">
            <h2>Create a New Product</h2>
            <Form onSubmit={handleCreateProduct}>
                <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="productDescription" className="mt-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="productPrice" className="mt-3">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Create Product
                </Button>
            </Form>
        </div>
    );
};

export default CreateProductPage;
