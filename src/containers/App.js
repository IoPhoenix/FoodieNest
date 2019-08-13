import React from 'react';
import Map from '../components/Map';
import Leaflet from 'leaflet';
import Form from '../components/Form';
import RestaurantsList from '../components/RestaurantsList';
import './App.css';
import Header from '../components/Header';
import Helper from '../helpers';
import { Grid } from "@material-ui/core";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      categories: [],
      neighborhoods: [],
      cuisines: [],
      selectCategory: 'all',
      selectNeighborhood: 'all',
      selectCuisine: 'all',
    }
  }


  initMap = () => {
    const map = Leaflet.map('map', {
      center: [37.7742, -122.417068],
      zoom: 12,
      scrollWheelZoom: false
    });

    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.jpg70?access_token=pk.eyJ1IjoiaW9waG9lbml4IiwiYSI6ImNqa29peG82NzFtZHkzcXBjdm9mbmN2ZWkifQ.80oAZqBb8GPBVoI8xFZucA', {
      mapboxToken: 'pk.eyJ1IjoiaW9waG9lbml4IiwiYSI6ImNqa29peG82NzFtZHkzcXBjdm9mbmN2ZWkifQ.80oAZqBb8GPBVoI8xFZucA',
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(map);

    this.updateRestaurants();
    this.fetchNeighborhoods();
    this.fetchCuisines();
  }

  
  onSelectChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [ name ]: value }, () => console.log('State changed: ', this.state.selectCategory ))
  }


  fetchNeighborhoods = () => {

  }


  fetchCuisines = () => {

  }


  fetchCategories = () => {
    Helper.fetchCategories((error, categories) => {
      if (error) { 
        console.error(error);
      } else {
        this.setState({ categories }, () => console.log('State changed: ', this.state.categories ));
      }
    });
  }

  
  updateRestaurants = () => {
    const { selectCategory, selectNeighborhood, selectCuisine } = this.state;

    Helper.fetchAllRestaurants(selectCategory, selectNeighborhood, selectCuisine, (error, restaurants) => {
      if (error) {
        console.error(error);
      } else {
        this.resetRestaurants(restaurants);
        this.setState({ restaurants });
      }
    });
  }

  
  resetRestaurants = (restaurants) => {
     // Remove all map markers
  }


  componentDidMount() {
    this.initMap();
    this.fetchCategories();
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
        <Header />
        <main>
          <section id="map-container">
            <Map />
          </section>

          <Grid container justify="center">
              <Form 
                  selectCategory={selectCategory}
                  selectNeighborhood={selectNeighborhood}
                  selectCuisine={selectCuisine}
                  categories={categories}
                  neighborhoods={neighborhoods}
                  cuisines={cuisines}
                  onChange={this.onSelectChange} />
              <RestaurantsList restaurants={restaurants}/>
          </Grid>
        </main>
      </div>
    );
  }
}

export default App;
