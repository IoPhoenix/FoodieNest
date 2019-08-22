import React from 'react';
import Helper from '../helpers';
import Map from '../components/Map';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { 
    Grid,
    Card,
    Paper,
    Breadcrumbs,
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
import './App.css';


const styles = (theme) => ({
    container: {
        margin: `${theme.spacing(3)}px 0`
    },
    paper: {
        // padding: theme.spacing(1, 2),
    },
    card: {
        padding: `${theme.spacing(3)}px`
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
});

class RestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            restaurant: null
        }
    }

    componentDidMount() {
        this.fetchRestaurantById();
    }


    fetchRestaurantById = () => {
        const { id } = this.props.match.params;
        const { restaurant } = this.props.location.state;

        // if restaurant object was passed successfully through link,
        // use it to populate local state
        if (restaurant) {
            console.log('Restaurant object was passed successfully!');
            this.setState({ restaurant }, this.initMap(restaurant));
        } else {
            console.log('Fetching restaurant by id...');

            // otherwise fetch restaurant details:
            Helper.fetchRestaurantById(id, (error, restaurant) => {
                if (error) {
                  console.error('Error fetching restaurant by id:: ', error);
                } else {
                  this.setState({ restaurant }, this.initMap(restaurant));
                }
            });
        }
    }

    initMap = (restaurant) => {
        const map = Helper.initMap();
        this.setState({ map }, () => {
            const marker = Helper.createMarkerFor(restaurant);
            marker.addTo(map);
        });
    }


    render() {
        const { restaurant } = this.state;
        const { name,
                url,
                featured_image,
                cuisines,
                price_range,
                phone_numbers,
                establishment,
                menu_url,
                highlights,
                average_cost_for_two
             } = restaurant;
        const { reviews } = restaurant.all_reviews;
        const rating = parseFloat(restaurant.user_rating.aggregate_rating);
        const votes = restaurant.user_rating.votes;
        const { zipcode, city, locality, address } = restaurant.location;
        const { classes } = this.props;

        return !restaurant ? (
                <div>
                    <Map />
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div>
                    <Map />
                    <Grid container justify="center" spacing={6} direction="column" alignItems="stretch">
                        <Grid item xs={12} sm={6}>
                            <div className={classes.container}>
                                <Paper elevation={1} className={classes.paper}>
                                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                                    <Button
                                        component={Link}
                                        to={{
                                            pathname: '/',
                                        }}
                                        color='primary'>
                                        Home
                                    </Button>
                                        <Typography color="textPrimary">
                                            { restaurant.name }
                                        </Typography>
                                    </Breadcrumbs>
                                </Paper>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <CardMedia
                                        alt={`${name}`}
                                        className={classes.media}
                                        image={ url } />
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
                                
                                <Button>Some buttom</Button>
                            </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            )
    }
}

export default withStyles(styles)(RestaurantPage);
