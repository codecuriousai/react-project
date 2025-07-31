import React from 'react';
import classes from './Checkout.module.css';
import { useSelector } from 'react-redux';
import { Product } from '../../types/Product';

const Checkout: React.FC = () => {
    const cartItems: Product[] = useSelector((state: any) => state.product.cart || []);

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    };

    const handlePayment = () => {
        // Simulate payment process
        alert('Payment successful!');
    };

    if (!cartItems.length) {
        return <div className={classes.checkoutContainer}>Your cart is empty.</div>;
    }

    return (
        <div className={classes.checkoutContainer}>
            <h2>Checkout</h2>
            <div className={classes.cartList}>
                {cartItems.map((item) => (
                    <div key={item.id} className={classes.cartItem}>
                        <span className={classes.productName}>{item.title}</span>
                        <span className={classes.productPrice}>${item.price?.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className={classes.total}>
                <strong>Total: ${getTotal().toFixed(2)}</strong>
            </div>
            <button className={classes.payBtn} onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
};

export default Checkout;
