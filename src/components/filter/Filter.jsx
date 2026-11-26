import "./Filter.css";
import FilterFacet from "../filterfacet/FilterFacet";

export default function Filter({ productsData, filterObj, onFilterChange }) {
  const productKeys = productsData[0] ? Object.keys(productsData[0]) : [];
  const unwantedKeys = [
    "id",
    "category",
    "title",
    "description",
    "stock",
    "tags",
    "sku",
    "weight",
    "dimensions",
    "warrantyInformation",
    "shippingInformation",
    "reviews",
    "returnPolicy",
    "meta",
    "images",
    "thumbnail",
    "minimumOrderQuantity",
  ];
  const facets = productKeys.filter((key) => {
    return unwantedKeys.includes(key) === false;
  });

  let facetMap = new Map();
  facets.forEach((key) => {
    facetMap.set(key, new Set());
  });
  productsData.map((productData) => {
    let keyVal = Object.entries(productData);

    keyVal.forEach(([key, val]) => {
      if (facetMap.has(key)) {
        const facetValue = facetMap.get(key);
        facetValue.add(val);
        facetMap.set(key, facetValue);
      }
    });
  });

  return (
    <div className="filter">
      <h3>Filters</h3>
      <FilterFacet
        facetMap={facetMap}
        filterObj={filterObj}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}
