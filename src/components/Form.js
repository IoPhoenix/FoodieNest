import React from 'react';

function Form(props) {

  const renderOption = (input) => {
    return <option 
              key={input[0]}
              value={input[0]}>
                {input[1]}
              </option>
  }

  const categories = props.categories.map(category => {
    return renderOption(category);
  });

  const neighborhoods = props.neighborhoods.map(neighborhood => {
    return renderOption(neighborhood);
  });

  const cuisines = props.cuisines.map(cuisine => {
    return renderOption(cuisine);
  });



    return (
        <form>
            <label htmlFor="categories-select" className="sr-only">Select category</label>
              <select 
                name="selectCategory"
                id="categories-select" 
                className="categories" 
                aria-label="Select category" 
                onChange={props.onChange} >
                  <option value="all">All Categories</option>
                  { categories }
              </select>
              <label htmlFor="neighborhoods-select" className="sr-only">Select neighborhood</label>
              <select 
                name="selectNeighborhood"
                id="neighborhoods-select" 
                className="neighborhoods" 
                aria-label="Select neighborhood" 
                onChange={props.onChange} >
                  <option value="all">All Neighborhoods</option>
              </select>
              <label htmlFor="cuisines-select" className="sr-only">Select cuisine</label>
              <select 
                name="selectCuisine"
                id="cuisines-select" 
                className="cuisines" 
                aria-label="Select cuisines"
                onChange={props.onChange} >
                  <option value="all">All Cuisines</option>
              </select>
          </form>
    )
}

export default Form;
