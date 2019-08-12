import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  }
}));


function Form(props) {

  const classes = useStyles();

  const renderOption = (input) => {
    return <MenuItem value={input[0]}>{input[1]}</MenuItem>;
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
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="categories-select">Select category</InputLabel>
          <Select
            className="categories" 
            onChange={props.onChange}
            aria-label="Select category" 
            inputProps={{
              name: 'selectCategory',
              id: 'categories-select',
            }}
          >
          <MenuItem value='all'>All Categories</MenuItem>;
          { categories }
          </Select>
        </FormControl>
      </form>
      
        // <form>
        //     <label htmlFor="categories-select" className="sr-only">Select category</label>
        //       <select 
        //         name="selectCategory"
        //         id="categories-select" 
        //         className="categories" 
        //         aria-label="Select category" 
        //         onChange={props.onChange} >
        //           <option value="all">All Categories</option>
        //           { categories }
        //       </select>
        //       <label htmlFor="neighborhoods-select" className="sr-only">Select neighborhood</label>
        //       <select 
        //         name="selectNeighborhood"
        //         id="neighborhoods-select" 
        //         className="neighborhoods" 
        //         aria-label="Select neighborhood" 
        //         onChange={props.onChange} >
        //           <option value="all">All Neighborhoods</option>
        //       </select>
        //       <label htmlFor="cuisines-select" className="sr-only">Select cuisine</label>
        //       <select 
        //         name="selectCuisine"
        //         id="cuisines-select" 
        //         className="cuisines" 
        //         aria-label="Select cuisines"
        //         onChange={props.onChange} >
        //           <option value="all">All Cuisines</option>
        //       </select>
        //   </form>
    )
}

export default Form;
