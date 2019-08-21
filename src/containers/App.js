import React from 'react';
import Map from '../components/Map';
import Form from '../components/Form';
import RestaurantsList from '../components/RestaurantsList';
import './App.css';
import Helper from '../helpers';
import { Grid } from "@material-ui/core";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      layer: null,
      markers: [],
      restaurants: [],
      filteredRestaurants: [],
      neighborhoods: [],
      cuisines: [],
      selectNeighborhood: 'all',
      selectCuisine: 'all',
    }
  }


  componentDidMount() {
    this.initMap();
    this.fetchNeighborhoods();
    this.fetchCuisines();
  }


  initMap = () => {
    const layer = Helper.initMap();
    this.setState({ layer });
    this.updateRestaurants();
  }

  
  updateRestaurants = () => {
    const { restaurants, selectNeighborhood, selectCuisine } = this.state;

    // if restaurants were fetched, filter them:
    if (restaurants.length) {
      let results = restaurants;

      if (selectNeighborhood !== 'all') {
        results = results.filter(item => this.matchNeighborhood(item, selectNeighborhood));
      }

      if (selectCuisine !== 'all') {
        results = results.filter(item => this.matchCuisine(item, selectCuisine));
      }

      if (selectNeighborhood !== 'all' && selectCuisine !== 'all') {
        results = results.filter(item => this.matchNeighborhood(item, selectNeighborhood) && this.matchCuisine(item, selectCuisine));
      }

      this.setState({ filteredRestaurants: results }, this.addMarkersToMap);
    } else {
      // fetch all restaurants:
      Helper.fetchAllRestaurants((error, restaurants) => {
        if (error) {
          console.error(error);
        } else {
          this.setState({ restaurants, filteredRestaurants: restaurants }, this.addMarkersToMap);
        }
      });
    }
  }

  onSelectChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log('Option selected: ', name, value );
    this.setState({ [ name ]: value }, this.updateRestaurants);
    
  }


  fetchNeighborhoods = () => {
    Helper.fetchNeighborhoods((error, neighborhoods) => {
      if (error) {
        console.error('Error fetching neighborhoods: ', error);
      } else {
        this.setState({ neighborhoods });
      }
    });
  }


  fetchCuisines = () => {
    Helper.fetchCuisines((error, cuisines) => {
      if (error) {
        console.error('Error fetching cuisines: ', error);
      } else {
        this.setState({ cuisines });
      }
    });
  }


  addMarkersToMap = () => {
    const { layer } = this.state;
    
    // remove previous markers:
    layer.clearLayers();

    const newMarkers = [];

    console.log('Creating markers...');

    this.state.filteredRestaurants.forEach(item => {
      const marker = Helper.createMarkerFor(item.restaurant);
        marker.addTo(layer);
        newMarkers.push(marker);
    });

    this.setState({ markers: newMarkers, layer });
  }


  matchNeighborhood = (item, search) => {
    return item.restaurant.location.locality === search;
  }


  matchCuisine = (item, search) => {
    return item.restaurant.cuisines.includes(search);
  }


  render() {
    const { 
      filteredRestaurants,
      neighborhoods,
      cuisines,
      selectNeighborhood,
      selectCuisine } = this.state;
    

    return (
      <div className="app">
        <Grid container direction="row">
            <Grid item xs={8} container justify="center" spacing={6}>
              <Form 
                  selectNeighborhood={selectNeighborhood}
                  selectCuisine={selectCuisine}
                  neighborhoods={neighborhoods}
                  cuisines={cuisines}
                  onChange={this.onSelectChange} />
              <RestaurantsList 
                restaurants={filteredRestaurants} />
            </Grid>

            <Grid item xs={4}>
              <Map />
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
