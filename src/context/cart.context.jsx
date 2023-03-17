import { createContext, useState, useEffect } from "react";

const addCartItem = (CartItems, productToAdd) => {
    const existingCartItem = CartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return CartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }

    return [...CartItems, { ...productToAdd, quantity: 1 }]
};

const removeCartItem = (CartItems, cartItemToRemove) => {
    const existingCartItem = CartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1) {
        return CartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return CartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )

}

const clearCartItem = (CartItems, ItemToClear) =>  CartItems.filter(cartItem => cartItem.id !== ItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    CartItems: [],
    addItemToCart: () => { },
    removeItemFromCart : () => {},
    clearItemFromCart : () => {},
    cartCount: 0,
    cartTotal:0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [CartItems, setCartItmes] = useState([]);
    const [cartCount, setCartcount] = useState(0);
    const [cartTotal, setCarttotal] = useState(0);

    useEffect(() => {
        const newCartCount = CartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartcount(newCartCount)
    },[CartItems])

    useEffect(() => {
        const newCartToatl = CartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCarttotal(newCartToatl)
    },[CartItems])

    const addItemToCart = (productToAdd) => {
        setCartItmes(addCartItem(CartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItmes(removeCartItem(CartItems, cartItemToRemove))
    }

    const clearItemFromCart = (ItemToClear) => {
        setCartItmes(clearCartItem(CartItems, ItemToClear))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, CartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}