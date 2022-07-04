import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
    const { cartItems, priceSum } = useContext(CartContext);
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span className="">product</span>
                </div>
                <div className="header-block">
                    <span className="">Description</span>
                </div>
                <div className="header-block">
                    <span className="">Quantity</span>
                </div>
                <div className="header-block">
                    <span className="">Price</span>
                </div>
                <div className="header-block">
                    <span className="">Remove</span>
                </div>
            </div>
            {cartItems.length > 0 ? (
                cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    );
                })
            ) : (
                <h1>koszyk jest pusty</h1>
            )}
            <span className="total">total: {priceSum}</span>
        </div>
    );
};

export default Checkout;
