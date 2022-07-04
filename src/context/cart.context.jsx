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

const removeCartItem = (cartItems, cartItemToRemove) => {
    // return cartItems.map((cartItem) =>
    //     cartItem.id === cartItemToRemove.id && cartItem.quantity > 0
    //         ? { ...cartItem, quantity: cartItem.quantity - 1 }
    //         : cartItem
    // );
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const deleteCartItem = (cartItems, productToDelete) =>
    cartItems.filter((item) => item.id !== productToDelete.id);

export const CartContext = createContext({
    usCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearCartItem: () => {},
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

    const removeItemToCart = (productToRemove) => {
        setCartItem(removeCartItem(cartItems, productToRemove));
    };

    const clearCartItem = (cartItemToClear) => {
        setCartItem(deleteCartItem(cartItems, cartItemToClear));
    };

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, currentItem) => total + currentItem.quantity,
            0
        );

        setcartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartPriceSum = cartItems.reduce(
            (total, currentItem) =>
                total + currentItem.quantity * currentItem.price,
            0
        );
        setPriceSum(newCartPriceSum);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearCartItem,
        cartItems,
        cartCount,
        priceSum,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
