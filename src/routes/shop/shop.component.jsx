import './shop.style.scss';
import { useContext } from "react";

import { ProductsContext } from "../../context/products.context";
import ProductCard from '../../components/product-card/product.component';

const Shop = () => {
    const { products } = useContext(ProductsContext);
    return (
        <div className="products-container">
            {products.map((product) => {
                return <ProductCard key={product.id} product={product}/>
            })}
        </div>
    );
};

export default Shop;
