import React from 'react';
import { Grid, Typography, List } from '@material-ui/core';
import Review from './Review';


function Reviews(props) {

    console.log('Reviews are: ', props.reviews);

    return (
        <List>
            <Typography
                variant='h6'
                gutterBottom>
            All Reviews
            </Typography>
            { props.reviews.map(item => {
                return (
                    <Review review={item.review} />
                );
            })}
        </List>
    )
}

export default Reviews;