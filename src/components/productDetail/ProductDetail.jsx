import "./ProductDetail.css";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/ProductsSlice";
import { useLocation, useParams } from "react-router-dom";
import Accordion from "../accordion/Accordion";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const productId = useParams().productId;
  const product = useSelector(selectAllProducts).find(
    (item) => item.id == productId,
  );

  const { addItem } = useCart();
  return (
    <div className="product">
      <div className="productThumbnailImage">
        {product?.images.map((img) => {
          return <img src={img} />;
        })}
      </div>
      <div className="productDescription">
        <h2 className="title">{product?.title}</h2>
        <p className="description">{product?.description}</p>
        <p className="price">Rs. {product?.price}</p>
        <p className="rating">{product?.rating}</p>
        <div className="reviews">
          <Accordion
            items={product?.reviews}
            renderHeader={(item) => {
              return (
                <>
                  <h5>
                    {item.comment} {item.rating} * &darr;
                  </h5>
                </>
              );
            }}
            renderBody={(item) => {
              return (
                <>
                  <p>{item.reviewerName}</p>&nbsp; &nbsp;
                  <p>{item.reviewerEmail}</p>
                </>
              );
            }}
          />
        </div>
      </div>

      <button className="addToCart" onClick={() => addItem(productId)}>
        Add to Cart
      </button>
    </div>
  );
}
