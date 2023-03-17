import "./card-dropdown.style.scss";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router";

const CardDropdown = () => {
    const {CartItems}= useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHanhler = () => {
        navigate('/checkout')
    }
    
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
               {CartItems.map((item) => {
                return (
                    <CartItem key={item.id} cartItem={item} />
                )
               })}
            </div>
            <button onClick={goToCheckoutHanhler}>GO TO CHECKOUT</button>
        </div>
    );
}

export default CardDropdown;