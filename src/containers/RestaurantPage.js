import React from 'react';
import Helper from '../helpers';
import Map from '../components/Map';
import Icons from '../components/Icons';
import Reviews from '../components/Reviews';
import UserRating from '../components/UserRating';
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
    Button } from '@material-ui/core';
import './App.css';


const styles = (theme) => ({
    container: {
        margin: `${theme.spacing(4)}px ${theme.spacing(4)}px 0`,
    },
    paper: {
        padding: theme.spacing(1, 2)
    },
    card: {
        margin: `${theme.spacing(4)}px`
    },
    media: {
        paddingTop: '57%'
    },
    content: {
        padding: `${theme.spacing(4)}px`,
        textAlign: 'left'
    },
    divider: {
      margin: `${theme.spacing(2)}px 0`
    }
});


class RestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layer: null,
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
            this.setState({ restaurant }, () => this.initMap(restaurant));
        } else {
            console.log('Fetching restaurant by id...');

            // otherwise fetch restaurant details:
            Helper.fetchRestaurantById(id, (error, restaurant) => {
                if (error) {
                  console.error('Error fetching restaurant by id:: ', error);
                } else {
                  this.setState({ restaurant }, () => this.initMap(restaurant));
                }
            });
        }
    }

    initMap = (restaurant) => {
        const layer = Helper.initMapAndReturnLayer();
        this.setState({ layer }, () => {
            const marker = Helper.createMarkerFor(restaurant);
            marker.addTo(layer);
        });
    }

    renderRestaurantCard = (restaurant) => {
        const { classes } = this.props;
         const { name,
                url,
                photos_url,
                featured_image,
                cuisines,
                price_range,
                establishment,
                menu_url,
                average_cost_for_two } = restaurant;
        const { reviews } = restaurant.all_reviews;
        const rating = parseFloat(restaurant.user_rating.aggregate_rating);
        const votes = restaurant.user_rating.votes;
        const { locality } = restaurant.location;

        return (
            <Card className={classes.card}>
                <CardMedia
                        alt={name}
                        className={classes.media}
                        image={ featured_image } />
                <CardContent className={classes.content}>
                    <Typography
                        component='h2'
                        variant={'h5'}
                        gutterBottom>
                        { name }
                    </Typography>
                    <UserRating 
                        rating={rating}
                        votes={votes}
                        />
                    <Typography variant='body1' paragraph={true} >
                        {'$'.repeat(price_range)} • { cuisines }
                    </Typography>
                    <Divider className={classes.divider} light />

                    <CardActions disableSpacing>
                        <Icons url={url} menu={menu_url} photos={photos_url} />
                    </CardActions>

                    <Divider className={classes.divider} light />
                    <Typography 
                        variant='body1' color='textPrimary' component='p' gutterBottom>
                        { establishment } at { locality } for ${ average_cost_for_two } for two.
                    </Typography>
                    <Divider className={classes.divider} light />
                    <Reviews reviews={reviews} />
                </CardContent>
            </Card>
        )
    }

    render() {
        const { restaurant } = this.state;
        const { classes } = this.props;

        return !restaurant ? (
                <div>
                    <Map />
                    <h1>Loading...</h1>
                </div>
            ) : (
                <Grid container direction="column-reverse">
                    <Grid item container justify="center" xs={12} md={8}>
                        <Grid item xs={12} sm={8} md={10}>
                            <div className={classes.container}>
                                <Paper elevation={1} className={classes.paper}>
                                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                                    <Button
                                        href='/'
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
                        <Grid item xs={12} sm={8} md={10}>
                            { this.renderRestaurantCard(restaurant) }
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Map />
                    </Grid>
                </Grid>
            )
    }
}

export default withStyles(styles)(RestaurantPage);
