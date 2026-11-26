import "./CategoryCard.css";
import { Link } from "react-router-dom";

export default function CategoryCard({ card }) {
  return (
    <div className="card">
      <Link state={card} to={`/productlist/${card[0].category}`}>
        <img src={card[0].images[0]} />
        <h3 className="cardTitle">{card[0].category}</h3>
      </Link>
    </div>
  );
}
