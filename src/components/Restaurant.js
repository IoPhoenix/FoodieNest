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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 300,
      margin: 'auto',
      transition: '0.3s',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
      }
    },
    media: {
      paddingTop: '56.25%'
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
    const { name, thumb } = props.restaurant;
    const rating = parseFloat(props.restaurant.user_rating.aggregate_rating);
    const votes = props.restaurant.user_rating.votes;
    const { locality, address } = props.restaurant.location;

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
                <Box component='fieldset' mb={2} borderColor='transparent'>
                    <div className={classes.rating}>
                        <Rating value={rating} size='small' precision={0.1} readOnly />
                        <Box ml={1}>
                            <Typography variant='caption'>
                                {rating} ({votes})
                            </Typography>
                        </Box>
                    </div>
                </Box>
                <Typography 
                    variant='subtitle1' 
                    gutterBottom>
                    { locality }
                </Typography>
                <Typography 
                    variant='body2' color='textSecondary' component='p'>
                    { address }
                </Typography>
                <Divider className={classes.divider} light />
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                </IconButton>
                <Button size='small' color='primary'>
                    View Restaurant Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default Restaurant;