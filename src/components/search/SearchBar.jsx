import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductsStatus,
} from "../../store/ProductsSlice";
import searchHelper from "../../utils/searchHelper";
import searchIcon from "../../assets/search.png";
import "./Search.css";

export default function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [searchBoxText, setSearchBoxText] = useState(
    searchParams.get("searchText") || ""
  );
  const [debouncedText, setDebouncedText] = useState(searchBoxText);
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);

  const allProducts = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);

  const searchURL = `/search?searchText=${encodeURIComponent(
    searchBoxText.trim()
  )}`;

  // Sync input with URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchBoxText(params.get("searchText") || "");
    setIsOpen(false);
  }, [location.search]);

  // Debounce search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchBoxText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchBoxText]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleMouseDown(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const suggestions = debouncedText.trim()
    ? searchHelper(allProducts, debouncedText).slice(0, 5)
    : [];

  function handleSubmit(e) {
    e.preventDefault();
    setIsOpen(false);
    history.push(searchURL);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="search-form"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <input
        type="text"
        value={searchBoxText}
        placeholder="Search products..."
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearchBoxText(e.target.value);
          setIsOpen(true);
        }}
      />
      <button type="submit">
        <img src={searchIcon} alt="Search" />
      </button>

      {isOpen && debouncedText.trim() && (
        <ul className="search-suggestions">
          {status === "loading" ? (
            <li>Loading...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  onClick={() => setIsOpen(false)}
                >
                  {product.name}
                </Link>
              </li>
            ))
          ) : (
            <li>No products found</li>
          )}
        </ul>
      )}
    </form>
  );
}
