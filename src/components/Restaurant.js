import React from 'react';
import { Card,
        CardContent,
        CardActions,
        CardMedia,
        Typography,
        Divider,
        Box,
        IconButton,
        Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 340,
      margin: 'auto',
      transition: '0.3s',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
      }
    },
    media: {
      paddingTop: '63%'
    },
    content: {
      textAlign: 'left',
      padding: theme.spacing(3),
      paddingBottom: '0'
    },
    rating: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
      margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px 0`
    }
}));

function Restaurant(props) {

    const classes = useStyles();
    const { name, thumb, id, cuisines, price_range } = props.restaurant;
    const rating = parseFloat(props.restaurant.user_rating.aggregate_rating);
    const votes = props.restaurant.user_rating.votes;
    const { locality, address } = props.restaurant.location;

    switch (price_range) {

    }

    return (
        <Card className={classes.card}>
            <CardMedia
                alt={`Thumbnail of ${name}`}
                className={classes.media}
                image={ thumb } />
            <CardContent className={classes.content}>
                <Typography
                    component='h2'
                    variant={'h5'}
                    gutterBottom>
                    { name }
                </Typography>
                <Box component='fieldset' mb={1} borderColor='transparent'>
                    <div className={classes.rating}>
                        <Rating value={rating} size='small' precision={0.1} readOnly />
                        <Box ml={1}>
                            <Typography variant='caption' color='textSecondary'>
                                {rating} ({votes})
                            </Typography>
                        </Box>
                    </div>
                </Box>
                <Typography variant='body2' paragraph={true} >
                    {'$'.repeat(price_range)} • { cuisines }
                </Typography>
                <Typography 
                    variant='body2' color='textSecondary' component='p' gutterBottom>
                    { locality }
                </Typography>
                <Typography 
                    variant='body2' color='textSecondary' component='p' gutterBottom>
                    { address }
                </Typography>
                <Divider className={classes.divider} light />
            </CardContent>

            <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
            </IconButton>
            
            <Button
                component={Link}
                to={{
                    pathname: `/restaurant/${id}`,
                    state: {
                        restaurant: props.restaurant
                    }
                }}
                size='small'
                color='primary'>
                    View Restaurant Details
            </Button>
        </CardActions>
        </Card>
    );
}

export default Restaurant;
