import React from 'react';
import { Typography, List } from '@material-ui/core';
import Review from './Review';


function Reviews(props) {

    return (
        <List>
            <Typography
                variant='h6'
                gutterBottom>
            All Reviews
            </Typography>
            { props.reviews.map(item => {
                return (
                    <Review review={item.review} key={item.review.id} />
                );
            })}
        </List>
    )
}

export default Reviews;