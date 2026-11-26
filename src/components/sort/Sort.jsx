import "./Sort.css";
import { useState } from "react";

export default function Sort({ sortBy, onSortChange }) {
  return (
    <div className="sort">
      <div className="sortOptions">
        <div>Sort By</div>
        <div
          className={sortBy === "priceascend" ? "active" : ""}
          onClick={() => onSortChange("priceascend")}
        >
          Price - Low to High &uarr;
        </div>
        <div
          className={sortBy === "pricedescend" ? "active" : ""}
          onClick={() => onSortChange("pricedescend")}
        >
          Price - High to Low &darr;
        </div>
        <div
          className={sortBy === "popularity" ? "active" : ""}
          onClick={() => onSortChange("popularity")}
        >
          Popularity
        </div>
      </div>
    </div>
  );
}
