import { createContext, useState, useEffect } from "react";

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

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const deleteCartItem = (cartItems, productToDelete) => {
    return cartItems.filter((item)=>{
        return item.id !== productToDelete.id;
    })
};

export const CartContext = createContext({
    usCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    cartPriceSum: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setcartCount] = useState(0);
    const [priceSum, setPriceSum] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItem(removeCartItem(cartItems, productToRemove));
    };
    const clearCartItem = (clearItem) => {
        setCartItem(deleteCartItem(cartItems, clearItem));
    };

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, currentItem) => total + currentItem.quantity,
            0
        );
        const newCartPriceSum = cartItems.reduce(
            (total, currentItem) =>
                total + currentItem.quantity * currentItem.price,
            0
        );
        setcartCount(newCartCount);
        setPriceSum(newCartPriceSum);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearCartItem,
        cartItems,
        cartCount,
        priceSum,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
