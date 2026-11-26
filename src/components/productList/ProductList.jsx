import "./ProductList.css";
import Filter from "../filter/Filter";
import Sort from "../sort/Sort";
import { selectAllProducts } from "../../store/ProductsSlice";
import { useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductList() {
  const categoryId = useParams().categoryId;
  const productsData = useSelector(selectAllProducts).filter(
    (item) => item.category === categoryId,
  ); // check === vs ==
  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState({});

  const products = useMemo(() => {
    console.log("=======filterBy======", filterBy);

    let productList = [...productsData];
    for (const [key, value] of Object.entries({ ...filterBy })) {
      if (key === "price") {
        console.log("filtering by price");
        productList = productList.filter((product) => {
          return product[key] >= value[0] && product[key] <= parseInt(value[1]);
        });
      }
      if (key === "rating") {
        console.log("filtering by rating");
        if (value.length !== 0) {
          productList = productList.filter((product) => {
            return product[key] >= Math.min(...value.map((v) => parseInt(v)));
          });
        }
      }
      if (key === "discountPercentage") {
        console.log("filtering by discount");
        if (value.length !== 0) {
          productList = productList.filter((product) => {
            return product[key] >= Math.min(...value.map((v) => parseInt(v)));
          });
        }
      }
      if (key === "brand") {
        console.log("filtering by brand");
        if (value.length !== 0) {
          productList = productList.filter((product) => {
            return value.includes(product[key]);
          });
        }
      }
      if (key === "availabilityStatus") {
        console.log("filtering by availability");
        if (value.length !== 0) {
          productList = productList.filter((product) => {
            return value.includes(product[key]);
          });
        }
      }
    }

    // sort functionality
    if (sortBy === "priceascend") {
      productList.sort((a, b) => a.price - b.price);
      console.log(productList);
    } else if (sortBy === "pricedescend") {
      productList.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
      productList.sort((a, b) => b.rating - a.rating);
    }

    return productList;
  }, [productsData, sortBy, filterBy]);

  return (
    <div className="main">
      <div className="filterContainer">
        <Filter
          productsData={productsData}
          filterObj={filterBy}
          onFilterChange={setFilterBy}
        />
      </div>
      <div className="content">
        <div className="sortContainer">
          <Sort sortBy={sortBy} onSortChange={setSortBy} />
        </div>
        <ul className="productList">
          {products.map((product) => {
            return (
              <li className="productCard" key={product.id}>
                <Link state={product} to={`/products/${product.id}`}>
                  <img src={product.images[0]} />
                  <h3 className="productTitle">{product.title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
