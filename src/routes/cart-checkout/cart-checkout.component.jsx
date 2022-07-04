import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CartCheckout = () => {
    const { cartItems, priceSum } = useContext(CartContext);
    console.log(cartItems);
    return (
        <div className="checkout-container">
            <div className="cart-item-header">
                <p>product</p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Remove</p>
            </div>
            {cartItems.length > 0 
            ? cartItems.map((cartItem)=>{
                return <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            }) : <h1>koszyk jest pusty</h1>}
            <div className="checkout-price-sum">{priceSum}</div>
        </div>
    )
}

export default CartCheckout;