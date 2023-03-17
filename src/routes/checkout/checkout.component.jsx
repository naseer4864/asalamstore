import "./checkout.style.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";



const Checkout = () => {
    const { CartItems, cartTotal } = useContext(CartContext)
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>quantity</span>
                </div>
                <div className="header-block">
                    <span>price</span>
                </div>
                <div className="header-block">
                    <span>remove</span>
                </div>
            </div>
                {CartItems.map((CartItem) => {
                    return (
                        <CheckoutItem key={CartItem.id} cartItem={CartItem} />
                    )
                })}
                <span className="total">Total $ {cartTotal}</span>
        </div>
    );
}

export default Checkout;