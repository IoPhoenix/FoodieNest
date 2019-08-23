import React from 'react';
import { 
        Typography,
        Divider } from '@material-ui/core';


function Review(props) {
    console.log('from Review: ', props.review);
    const { id, rating, rating_text, review_text, review_time_friendly, timestamp } = props.review;
    
    return (
        <>
            <Typography 
                variant='body1'
                color='textPrimary'
                component='p'
                gutterBottom>
                    { review_text }
            </Typography>
            <Divider light />
        </>
    )
}

export default Review;