import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: `${theme.spacing(4)}px 0`
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 200,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 'auto',
      }
    }
}));

function Form(props) {
    const classes = useStyles();

    const renderOption = (input, i) => {
        return (
            <MenuItem key={i} value={input}>
                {input}
            </MenuItem>
        );
    };

    const neighborhoods = props.neighborhoods.map((neighborhood, i) => {
        return renderOption(neighborhood, i);
    });

    const cuisines = props.cuisines.map((cuisine, i) => {
        return renderOption(cuisine, i);
    });

    return (
        <Grid item container justify="center" xs={12} sm={10} >
            <form className={classes.root}>
                <Grid item xs={8} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="neighborhoods-select">
                            Select neighborhood
                        </InputLabel>
                        <Select
                            
                            value={props.selectNeighborhood}
                            onChange={props.onChange}
                            aria-label="Select neighborhood"
                            inputProps={{
                                name: "selectNeighborhood",
                                id: "neighborhoods-select"
                            }}>
                            <MenuItem value="all">All neighborhoods</MenuItem>;
                            {neighborhoods}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="cuisines-select">
                            Select cuisine
                        </InputLabel>
                        <Select
                            
                            value={props.selectCuisine}
                            onChange={props.onChange}
                            aria-label="Select cuisine"
                            inputProps={{
                                name: "selectCuisine",
                                id: "cuisines-select"
                            }}>
                            <MenuItem value="all">All cuisines</MenuItem>;
                            {cuisines}
                        </Select>
                    </FormControl>
                </Grid>
            </form>
        </Grid>
    );
}

export default Form;
