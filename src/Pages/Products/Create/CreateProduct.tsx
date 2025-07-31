import React, { useEffect, useState } from 'react';
import ProductForm from '../../../Components/ProductForm/ProductForm';
import { initialProductValues, Product } from '../../../types/Product';
import classes from './CreateProduct.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../../reduxStore/actions/productActions';

// Component for creating or editing a product
const CreateProduct: React.FC = () => {
    // State to manage the form title
    const [title, setTitle] = useState('Create Product');
    // Get the product id from the URL params (if editing)
    const { id } = useParams<{ id?: string }>();
    // Hook for navigation
    const navigate = useNavigate();
    // Redux dispatch function
    const dispatch = useDispatch<any>();

    // Update the form title based on whether we're editing or creating
    useEffect(() => {
        setTitle(id ? 'Edit Product' : 'Create Product');
    }, [id]);

    // Handle form submission for both create and update
    const handleProductSubmit = async (product: Product) => {
        if (id) {
            // If editing, dispatch update action
            await dispatch(updateProduct(product));
        } else {
            // If creating, dispatch create action
            await dispatch(createProduct(product));
        }
        // Navigate back to the products list after submit
        navigate('/home/products');
    };

    return (
        <div className={classes.container}>
            {/* Render the product form with initial values and handlers */}
            <ProductForm
                product={initialProductValues}
                updateProduct={handleProductSubmit}
                formTitle={title}
            />
        </div>
    );
};

export default CreateProduct;