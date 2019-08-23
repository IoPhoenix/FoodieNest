import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    
        Typography,
        Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
}));


function Review(props) {
    const classes = useStyles();
    const { id, rating, rating_text, review_text, review_time_friendly, timestamp } = props.review;
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