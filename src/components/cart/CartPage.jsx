import { CartRow } from "./CartRow";
import { CartSummary } from "./CartSummary";
import { useCart } from "../../context/CartContext";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/ProductsSlice";
import { selectProductsStatus } from "../../store/ProductsSlice";

export default function CartPage() {
  const { cartItems } = useCart();
  const allProducts = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);

  if (!cartItems?.length) {
    return (
      <div className="emptyCart">
        <h3>Cart is empty</h3>
      </div>
    );
  }

  if (status === "idle" || status === "loading") return <p>Loading...</p>; // not to display anything until we got products from store

  if (status === "failed") return <p>Something went wrong.</p>;

  const cartProducts = cartItems?.map((item) => {
    const product = allProducts?.find((product) => product.id == item.id);
    return { product, quantity: item.quantity };
  });

  return (
    <>
      {status === "succeeded" &&
        cartProducts?.map((item) => {
          return <CartRow key={item.product.id} product={item}></CartRow>;
        })}

      <CartSummary cartProducts={cartProducts} />
    </>
  );
}
