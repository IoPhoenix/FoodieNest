import React from 'react';
import Helper from '../helpers';
import Map from './Map';


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

        return !restaurant ? (
                <div>
                    <Map />
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div>
                    <Map />
                    <h1>This is page for restaurant {restaurant.id}!</h1>
                </div>
            )
    }
}

export default RestaurantPage;
