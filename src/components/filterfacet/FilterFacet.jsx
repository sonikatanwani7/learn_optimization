import "./FilterFacet.css";
import useFacetSelection from "../../custom-hooks/useFacetSelection"; // custom hook to update filterObj based on facet selection
import CheckBoxFacetGroup from "../checkboxFacetGroup/CheckboxFacetGroup"; // pure functional comp to render facets

export default function FilterFacet({ facetMap, filterObj, onFilterChange }) {
  let toggleFunction = useFacetSelection(); // this has to be iniotialized upfront only at the top of function comp else hook wont be rendered unconditionally

  function handleToggle(e, facet) {
    let filterValues = toggleFunction(e, facet);
    onFilterChange({ ...filterObj, [facet[0]]: [...filterValues] });
  }

  function renderRangeSliderFacet(facet) {
    let min = Math.min(...facet[1]);
    let max = Math.max(...facet[1]);
    return (
      <div id={`filter-${facet[0]}`}>
        <h3>{facet[0]}</h3>
        <span>{Math.floor(min)}</span>
        <input
          type="range"
          onChange={(e) =>
            onFilterChange({
              ...filterObj,
              price: [min, Number(e.target.value)],
            })
          }
          min={Math.floor(min)}
          max={Math.ceil(max)}
        />
        <span>{Math.ceil(max)}</span>
      </div>
    );
  }

  function selectFacet(facet) {
    if (facet[0] === "price") {
      return renderRangeSliderFacet(facet);
    } else {
      return <CheckBoxFacetGroup facet={facet} handleToggle={handleToggle} />;
    }
  }

  return (
    <div className="filterFacet">
      <div>
        {[...facetMap].map((facet) => {
          return <div className="filteringFacet">{selectFacet(facet)}</div>;
        })}
      </div>
    </div>
  );
}
