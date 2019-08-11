import React from 'react';

function Form(props) {
    return (
        <form>
            <label htmlFor="categories-select" className="sr-only">Select category</label>
              <select 
                name="categories"
                id="categories-select" 
                className="categories" 
                aria-label="Select category" 
                onChange={props.onChange} >
                  <option value="all">All Categories</option>
              </select>
              <label htmlFor="neighborhoods-select" className="sr-only">Select neighborhood</label>
              <select 
                name="neighborhoods"
                id="neighborhoods-select" 
                className="neighborhoods" 
                aria-label="Select neighborhood" 
                onChange={props.onChange} >
                  <option value="all">All Neighborhoods</option>
              </select>
              <label htmlFor="cuisines-select" className="sr-only">Select cuisine</label>
              <select 
                name="cuisines"
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
