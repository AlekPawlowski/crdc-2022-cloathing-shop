import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    usCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartTotalItems: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartTotalItems, setCartTotalItems] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems, productToAdd));
    };

    const countCartTotal = () => {
        let counter = 0;
        cartItems.map(item=>{
            console.log(item);
        })
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartTotalItems, countCartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};