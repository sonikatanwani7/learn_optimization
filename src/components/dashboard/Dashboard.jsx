import { useState, useEffect } from "react";

import CategoryCard from "../categoryCard/CategoryCard";
import { selectAllProducts } from "../../store/productsSlice.js";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [categoriesData, setCategoriesData] = useState([]);

  const products = useSelector(selectAllProducts);

  useEffect(() => {
    const categoryDataMap = new Map();
    products.forEach((product) => {
      if (!categoryDataMap.has(product.category)) {
        let products = [];
        products.push(product);
        categoryDataMap.set(product.category, products);
      } else {
        let products = categoryDataMap.get(product.category);
        products.push(product);
        categoryDataMap.set(product.category, products);
      }
    });

    setCategoriesData([...categoryDataMap.values()]);
  }, [products]);

  return (
    <>
      <ul className="categoryCardList">
        {categoriesData.map((card, index) => {
          return <CategoryCard card={card} key={index} />;
        })}
      </ul>
    </>
  );
}
