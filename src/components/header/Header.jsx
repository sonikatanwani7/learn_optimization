import cart from "../../assets/shopping-cart.png";
import logo from "../../assets/supermarket.png";
import SearchBar from "../search/SearchBar";
import "./Header.css";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { cartItems } = useCart();
  function itemCount() {
    return cartItems?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }

  return (
    <>
      <div className="navbar">
        <div>
          {" "}
          <img src={logo} />
        </div>
        <div>
          <SearchBar />
        </div>
        <div>Location</div>

        <div>Login/Logout</div>
        <div>
          <Link to={"/cart"}>
            {" "}
            <img src={cart} /> ({itemCount()})
          </Link>
        </div>
      </div>
    </>
  );
}
