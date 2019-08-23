import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    rating: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    }
}));

function UserRating(props) {

    const classes = useStyles();

    return (
        <Box component='fieldset' mb={1} borderColor='transparent'>
            <div className={classes.rating}>
                <Rating value={props.rating} size='small' precision={0.1} readOnly />
                <Box ml={1}>
                    <Typography variant='caption' color='textSecondary'>
                        {props.rating} { props.votes ? '(' + props.votes + ')' : ''}
                    </Typography>
                </Box>
            </div>
        </Box>
    )
}

export default UserRating;