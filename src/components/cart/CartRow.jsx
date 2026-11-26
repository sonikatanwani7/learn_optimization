import "./Cart.css";
import { useCart } from "../../context/CartContext";

export function CartRow({ product }) {
  const { cartItems, removeItem, changeQuantity } = useCart();
  return (
    <>
      {product.product && (
        <div className="productRow">
          <div className="productThumbnailImage">
            <img src={product.product?.images?.[0]} />
          </div>

          <div className="productDescription">
            <h2 className="title">{product.product?.title}</h2>
            <p className="price">Rs. {product.product?.price}</p>
            <p>
              <span
                className="decrement"
                onClick={() => {
                  product.quantity > 1
                    ? changeQuantity(
                        product?.product?.id,
                        product?.quantity - 1,
                      )
                    : removeItem(product?.product?.id);
                }}
              >
                -
              </span>
              {product?.quantity}

              <span
                className="increment"
                onClick={() => {
                  changeQuantity(product?.product?.id, product?.quantity + 1);
                }}
              >
                +
              </span>
            </p>
            <p style={{ fontWeight: "bold" }}>
              Line Total : {product.product?.price * product?.quantity}{" "}
            </p>
          </div>

          <button
            className="removeFromCart"
            onClick={() => removeItem(product?.product?.id)}
          >
            Remove from Cart
          </button>
        </div>
      )}
    </>
  );
}
