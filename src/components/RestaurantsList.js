import React from 'react';
import Restaurant from './Restaurant';
import { Grid } from "@material-ui/core";


function RestaurantsList(props) {

    return (
        <Grid item xs={12} container justify="center" spacing={6} id="restaurants-container">
            { props.restaurants.map(item => {
                return (
                    <Grid item xs={10} sm={6} key={item.restaurant.id}>
                        <Restaurant restaurant={item.restaurant}/>
                    </Grid>
                )})
            }
        </Grid>
    )
}

export default RestaurantsList;
