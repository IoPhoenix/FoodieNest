import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Review from './Review';


function Reviews(props) {

    console.log('Reviews are: ', props.reviews);

    return (
        <Grid container>
            <Typography
                variant='h6'
                gutterBottom>
            All Reviews
            </Typography>
            { props.reviews.map(item => {
                return (
                    <Grid item>
                        <Review review={item.review} />
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default Reviews;