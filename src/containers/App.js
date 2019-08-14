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
      restaurants: [],
      markers: [],
      categories: [],
      neighborhoods: [],
      cuisines: [],
      selectCategory: 'all',
      selectNeighborhood: 'all',
      selectCuisine: 'all',
    }
  }


  componentDidMount() {
    this.initMap();
    this.fetchCategories();
    this.fetchNeighborhoods();
    this.fetchCuisines();
  }


  initMap = () => {
    const newMap = Helper.initMap();
    this.setState({ map: newMap });
    this.updateRestaurants();
  }

  
  updateRestaurants = () => {
    Helper.fetchAllRestaurants((error, restaurants) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({ restaurants }, this.addMarkersToMap);
      }
    });
  }

  onSelectChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log('Option selected: ', name, value );
    this.setState({ [ name ]: value });
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


  fetchCategories = () => {
    Helper.fetchCategories((error, categories) => {
      if (error) { 
        console.error(error);
      } else {
        this.setState({ categories });
      }
    });
  }

  addMarkersToMap = () => {
    this.state.restaurants.forEach(item => {
      const marker = Helper.createMarkerFor(item.restaurant);
      marker.addTo(this.state.map);
      
      this.setState({ markers: this.state.markers.concat(marker) });
    });
  }


  matchNeighborhood = (item, search) => {
    return item.restaurant.location.locality === search;
  }


  matchCuisine = (item, search) => {
    return item.restaurant.cuisines.includes(search);
  }


  filterRestaurants = (restaurants, selectCa, selectN, selectCu) => {
    let results = restaurants;

    if (selectCa !== 'all') {}

    if (selectN !== 'all') {
      results = results.filter(item => this.matchNeighborhood(item, selectN));
    }

    if (selectCu !== 'all') {
      results = results.filter(item => this.matchCuisine(item, selectCu));
    }

    if (selectN !== 'all' && selectCu !== 'all') {
      results = results.filter(item => this.matchNeighborhood(item, selectN) && this.matchCuisine(item, selectCu));
    }

    return results;
  }


  render() {
    const { 
      restaurants,
      categories,
      neighborhoods,
      cuisines,
      selectCategory,
      selectNeighborhood,
      selectCuisine } = this.state;
    

    return (
      <div className="app">
        <Map />
        <Grid container justify="center">
            <Form 
                selectCategory={selectCategory}
                selectNeighborhood={selectNeighborhood}
                selectCuisine={selectCuisine}
                categories={categories}
                neighborhoods={neighborhoods}
                cuisines={cuisines}
                onChange={this.onSelectChange} />
            <RestaurantsList 
              restaurants={
                this.filterRestaurants(restaurants, selectCategory, selectNeighborhood, selectCuisine)
              } />
        </Grid>
      </div>
    );
  }
}

export default App;
