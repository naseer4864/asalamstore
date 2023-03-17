import "./cart-icon.style.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen } = useContext(CartContext);
    const {cartCount } = useContext(CartContext);
    const toggleisCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <div className="cart-icon-container" onClick={toggleisCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
}

export default CartIcon;