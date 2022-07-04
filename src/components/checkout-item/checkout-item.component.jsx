import {useContext} from 'react';

import CheckoutQuantity from "../checkout-quantity/checkout-quantity.component";
import { CartContext } from '../../context/cart.context';

import Button from "../button/button.component";

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, quantity, price } = cartItem;
    const {clearCartItem} = useContext(CartContext)

    const removeAllItems = () => {
        clearCartItem(cartItem);
    }

    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={name} />
            <p>{name}</p>
            <CheckoutQuantity item={cartItem} />
            <p>{price}</p>
            <Button onClick={removeAllItems}>remove all</Button>
        </div>
    )
}

export default CheckoutItem;