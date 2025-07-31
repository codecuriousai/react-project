import { useEffect, useState } from 'react';
import classes from './ViewProduct.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { initialProductValues } from '../../../types/Product';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecentProducts } from '../../../reduxStore/actions/productActions';

const ViewProduct = () => {
    const [productData, setProductData] = useState(initialProductValues);
    const { id } = useParams<any>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.product.products);

    useEffect(() => {
        const currentProduct = products.filter((eachProduct: any) => eachProduct.id?.toString() === id);
        if (currentProduct[0]) {
            setProductData(currentProduct[0]);
            dispatch(updateRecentProducts(currentProduct[0]));
        }
    }, [id, products, dispatch]);

    if (!productData) {
        return <div>No Product data</div>;
    }

    const backButtonHandler = () => {
        navigate('/home/products');
    };

    return (
        <div>
            <div className={classes.detailContainer}>
                {/* Product Details */}
                <div className={classes.productDetail}>
                    <button onClick={backButtonHandler} className={classes.backButton}>
                        <i className="fa fa-arrow-left"></i>
                    </button>

                    {/* Images */}
                    <div className={classes.productImages}>
                        <img
                            src={productData?.images?.[0] || 'https://via.placeholder.com/300'}
                            alt="Main Product"
                            className={classes.mainImage}
                        />
                        <div className={classes.thumbnailImages}>
                            <img
                                src={productData?.thumbnail || 'https://via.placeholder.com/150'}
                                alt="Thumbnail"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className={classes.productInfo}>
                        <h1>{productData.title}</h1>
                        <p className={classes.sku}>
                            Category : <strong>{productData.category}</strong>
                        </p>
                        <p className={classes.price}>${productData.price}</p>
                        <p className={classes.paymentInfo}>
                            Brand : <strong>{productData.brand}</strong>
                        </p>

                        <div className={classes.options}>
                            <p className={classes.optionLabel}>Stock</p>
                            <div className={classes.optionButtons}>
                                <button className={classes.active}>
                                    {productData.availabilityStatus}
                                </button>
                            </div>
                        </div>

                        <div className={classes.actionsWrapper}>
                            {/* Quantity */}
                            <div className={classes.quantitySection}>
                                <button>-</button>
                                <input
                                    type="text"
                                    className={classes.quantityInput}
                                    defaultValue="1"
                                />
                                <button>+</button>
                            </div>

                            {/* Actions */}
                            <div className={classes.actions}>
                                <button className={classes.addToCart}>Add to Cart</button>
                                <button className={classes.buyNow}>Buy Now</button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className={classes.additionalInfo}>
                            <p>
                                <strong>
                                    Free Shipping on Orders Over{' '}
                                    {productData.minimumOrderQuantity} Products
                                </strong>
                            </p>
                            <p>
                                <strong>24/7 Customer Support:</strong> +1-800-123-4567
                            </p>
                            <p>
                                <strong>{productData.warrantyInformation}</strong>
                            </p>
                            <p>
                                <strong>Delivery:</strong> 3 - 5 Business Days
                            </p>
                            <p>
                                <strong>{productData.returnPolicy}</strong>
                            </p>
                        </div>

                        <div className={classes.tabContent}>
                            <p>{productData.description}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={classes.tabs}>
                    <button className={classes.active}>Description</button>
                    <button>Specifications</button>
                    <button>Shipping & Returns</button>
                    <button>Warranty</button>
                </div>

                <div className={classes.tabContent}>
                    <p>{productData.description}</p>
                </div>

                {/* Reviews */}
                <div className={classes.reviews}>
                    <h2>Customer Reviews</h2>
                    <div className={classes.reviewContainer}>
                        {productData?.reviews?.map((e, index) => (
                            <div key={index} className={classes.reviewComment}>
                                <p>
                                    <strong>{e.reviewerName}</strong>
                                </p>
                                <p>
                                    Comment : <strong>{e.comment}</strong>
                                </p>
                                <p>
                                    Rating : <strong>{e.rating}</strong>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <p>&copy; XYZ Store. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ViewProduct;
