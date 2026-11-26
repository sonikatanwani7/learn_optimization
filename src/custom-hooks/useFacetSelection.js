import { useRef } from "react";

function useFacetSelection() {
  const facetRef = useRef({}); 

  function handleToggle(e, facet) {
    let val = e.target.value;
    if (facetRef.current[facet[0]] === undefined) {
      facetRef.current[facet[0]] = new Set();
      facetRef.current[facet[0]].add(val);
    } else {
      if (facetRef.current[facet[0]].has(val)) {
        facetRef.current[facet[0]].delete(val);
      } else {
        facetRef.current[facet[0]].add(val);
      }
    }

    console.log('===== updated facet filter object', facetRef.current)
    return facetRef.current[facet[0]]; 
  }
  return handleToggle;
}

export default useFacetSelection;
