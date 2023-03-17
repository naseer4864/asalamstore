import "./checkout-item.style.scss"
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)
    const hanleClearItem = () => clearItemFromCart(cartItem)
    const handleremoveItem = () => removeItemFromCart(cartItem)
    const handleaddItem = () => addItemToCart(cartItem)
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={handleremoveItem} >
                    &#10094;
                </div>
                <span>
                {quantity}
                </span>
                <div className="arrow" onClick={handleaddItem}>
                &#10095;
                </div>
                </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={hanleClearItem}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;