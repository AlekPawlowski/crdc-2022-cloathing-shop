import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";

const CheckoutQuantity = ({ item }) => {
    const { quantity } = item;
    const { addItemToCart, removeItemFromCart } = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(item);
    };
    const removeProductFromCart = () => {
        removeItemFromCart(item);
    };

    return (
        <div className="quantity_manipulate">
            <Button buttonType="inverted" onClick={removeProductFromCart}>minus</Button>
            <p>{quantity}</p>
            <Button onClick={addProductToCart}>add</Button>
        </div>
    );
};

export default CheckoutQuantity;
