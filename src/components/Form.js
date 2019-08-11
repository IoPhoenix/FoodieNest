import React from 'react';

function Form() {
    return (
        <form>
              <label htmlFor="neighborhoods-select" className="sr-only">Select neighborhood</label>
              <select 
                id="neighborhoods-select" 
                className="neighborhoods" 
                aria-label="Select neighborhood"
                onchange="updateRestaurants()">
                  <option value="all">All Neighborhoods</option>
              </select>
              <label htmlFor="cuisines-select" className="sr-only">Select cuisine</label>
              <select 
                id="cuisines-select" 
                className="cuisines" 
                aria-label="Select cuisines"
                onChange="updateRestaurants()">
                  <option value="all">All Cuisines</option>
              </select>
          </form>
    )
}

export default Form;
