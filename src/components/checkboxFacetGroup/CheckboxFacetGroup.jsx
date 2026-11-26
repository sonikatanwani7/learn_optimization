import React from 'react'
// a pure renderer functional component
function CheckBoxFacetGroup(props) {

    let discountSet;
    let ratingsSet;
    let values;
    let labelPrefix;

    values = props.facet[1]

    if(props.facet[0]==="discountPercentage"){
        discountSet = new Set(
            [...props.facet[1]].map((rate) => Math.floor(rate / 10) * 10)
          );
          values=discountSet;
          labelPrefix =`% & above`;
          
    }

    if(props.facet[0]==='rating'){
        ratingsSet = new Set([...props.facet[1]].map((rate) => Math.floor(rate)));
        values=ratingsSet;
        labelPrefix = `* & above`;
    }

    return (
      <div id={`filter-${props.facet[0]}`}>
        <h3>{props.facet[0]}</h3>
        {[...values].map((val) => {
          return (
            <React.Fragment key={val}>
              <input
                type="checkbox"
                onChange={(e) => props.handleToggle(e, props.facet)}
                name={`${props.facet[0]}`}
                value={val}
              />{" "}
              <label>{val}{ labelPrefix}</label>
              <br />
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  export default CheckBoxFacetGroup;