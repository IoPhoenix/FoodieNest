import React from 'react';
import Helper from '../helpers';
import Map from '../components/Map';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Breadcrumbs, Typography, Button} from '@material-ui/core';
import './App.css';


const styles = (theme) => ({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    paper: {
      padding: theme.spacing(1, 2),
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

        // if restaurant object was passed successfully,
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
        const { classes } = this.props;

        return !restaurant ? (
                <div>
                    <Map />
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div>
                    <Map />
                    <Grid container justify="center" spacing={6}>
                        <Grid item xs={12} sm={8}>
                            <div className={classes.root}>
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
                        <Grid item xs={12} sm={8} container spacing={6}>
                            <Typography variant="h2">{restaurant.name}</Typography>
                        </Grid>
                    </Grid>
                </div>
            )
    }
}

export default withStyles(styles)(RestaurantPage);