import { Fragment,useContext } from "react";
import { Outlet,Link } from "react-router-dom";
import "./navigation.styles.scss"
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../../context/user.context";
import { SignOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../../components/card-dropdown/card-dropdown.component";
import { CartContext } from "../../../context/cart.context";




const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)
  
    return(
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to="/">
           <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to="/Shop">
                SHOP
            </Link>
            {currentUser ? (<span className="nav-Link" onClick={SignOutUser}>SIGN OUT</span>
            ) : (<Link className="nav-link" to="/auth">
                SIGN IN
            </Link>)}
            <CartIcon />
        </div>
        {isCartOpen && <CardDropdown />}
      </div>
      
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;