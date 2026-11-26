import React, { useMemo } from "react";
import "./Search.css";
//import {  useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductsStatus,
} from "../../store/ProductsSlice";
import searchHelper from "../../utils/searchHelper";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function SearchResult() {
  const allProducts = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
  const searchText = (searchParams.get("searchText") || "").trim();

  // Memoize search results to avoid unnecessary recalculations on re-renders
  const matchedProducts = useMemo(() => {
    if (!searchText) return [];
    return searchHelper(allProducts, searchText);
  }, [allProducts, searchText]);

  if (!searchText) {
    return (
      <div className="searchResults">
        <div className="emptySearchStr">
          <h3>Search text is empty. What are you looking for?</h3>
        </div>
      </div>
    );
  }

  if (status === "idle" || status === "loading") {
    return (
      <div className="searchResults">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="searchResults">
        <p>Something went wrong.</p>
      </div>
    );
  }

  // Handle valid searches that return 0 results
  if (matchedProducts.length === 0) {
    return (
      <div className="searchResults">
        <div className="emptySearchStr">
          <h3>No products found for "{searchText}".</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="searchResults">
      <ul>
        {matchedProducts.map((product) => (
          <li className="productCard" key={product.id}>
            {/* React Router v6 syntax: pass state as a separate prop */}
            <Link to={`/products/${product.id}`} state={product}>
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.title || "Product image"}
              />
              <h3 className="productTitle">{product.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
