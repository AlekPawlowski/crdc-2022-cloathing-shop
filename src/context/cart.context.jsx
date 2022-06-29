import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cart items contains product to add
    // if found increment quantity
    // return new array with modifed cartitems new cart item
}

export const CartContext = createContext({
    usCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const value = { isCartOpen, setIsCartOpen };

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItem, productToAdd));
    }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
