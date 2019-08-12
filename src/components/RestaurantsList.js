import React from 'react';
import Restaurant from './Restaurant';
import { Grid } from "@material-ui/core";


function RestaurantsList(props) {

    return (
        <Grid item xs={12} sm={11} container spacing={8}>
            { props.restaurants.map(item => {
                return (
                    <Grid item xs={12} sm={6} lg={4} key={item.restaurant.id}>
                        <Restaurant restaurant={item.restaurant}/>
                    </Grid>
                )})
            }
        </Grid>
    )
}

export default RestaurantsList;
