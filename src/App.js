import Home from "./routes/home/home.componnent";
import {Routes, Route} from "react-router-dom";
import Navigation from "./routes/home/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";





const App = () => {
  return ( 
    <div>
      <Routes>
        <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="Shop/*" element={<Shop/>} />
        <Route path="auth" element={<Authentication/>} />
        <Route path="checkout" element={<Checkout/>} />
        </Route>
      </Routes>
    </div>
   );
}
 
export default App;