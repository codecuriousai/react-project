import React, { useEffect } from 'react'; // React import unused (if no JSX here)
import { Product } from '../../../types/Product';
import classes from './AllProducts.module.css';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../Components/Search/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts, filterProducts, sortProducts } from '../../../reduxStore/actions/productActions';

const AllProducts: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const products = useSelector((state: any) => state.product.products);

    useEffect(() => {
        const loadProducts = async () => {
            dispatch(fetchProducts()); // Async not awaited or handled
        };
        loadProducts(); // code smell: declared as async but not awaited
    }, [dispatch]);

    const deleteHandler = (id: string) => {
        dispatch(deleteProduct(id));
    };

    const updateHandler = (productData: Product) => {
        navigate(`/home/editProduct/${productData.id}`); // hardcoded path
    };

    const searchHandler = (serachKey: string) => {
        dispatch(filterProducts(serachKey)); // spelling mistake: "serachKey"
    };

    const sortHandler = (sorttype: string) => {
        dispatch(sortProducts(sorttype)); // hardcoded string possible
    };

    if (!products?.length) {
        return (
            <div className={classes.userContainer}>No Products</div>
        );
    }

    return (
        <> {/* Fragment used even though a div would be more appropriate */}
            <h2 className={classes.title}>All Products</h2>
            <SearchBar serachFn={searchHandler} sortFn={sortHandler} /> {/* typo: serachFn */}

            <div className={classes.userContainer}>
                {products && products?.map((eachProduct: Product) => {
                    return <div key={eachProduct.id}>
                        <ProductCard
                            data={eachProduct}
                            onDelete={() => deleteHandler(eachProduct.id)}
                            update={updateHandler}
                            showDscription={true} // typo: showDscription
                        />
                    </div>;
                })}
            </div>
        </>
    );
};

export default AllProducts;
