import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    ListItem,
    ListItemText,
    Typography,
    ListItemAvatar,
    Avatar,
    Divider
 } from '@material-ui/core';
import UserRating from '../components/UserRating';


const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
}));


function Review(props) {
    const classes = useStyles();
    const { rating, rating_text, review_text } = props.review;
    const { name, profile_image } = props.review.user;
    
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={name} src={profile_image} />
                </ListItemAvatar>
                <ListItemText
                    primary={rating_text}
                    secondary={
                        <>
                        <UserRating rating={rating} />
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            { name } 
                        </Typography>
                             { ' — ' + review_text }
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default Review;