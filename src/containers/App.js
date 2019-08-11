import React from 'react';
import Map from '../components/Map';
import Leaflet from 'leaflet';
import Form from '../components/Form';
import RestaurantsList from '../components/RestaurantsList';
import './App.css';
import Header from '../components/Header';
import Helper from '../helpers';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      selectedCuisine: '',
      selectedNeighborhood: ''
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
  }

  
  onSelectChange = (event) => {
    console.log('Option selected!');
    console.log(event.target);
  }


  fillCategoriesHTML = () => {
    console.log('Categories set in state!');
  }

  updateRestaurants = () => {
    Helper.fetchCategories((error, categories) => {
      if (error) { 
        console.error(error);
      } else {
        this.setState({ categories }, () => this.fillCategoriesHTML());
      }
    });
  }
  

  componentDidMount() {
    this.initMap();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <section id="map-container">
            <Map />
          </section>
          <section id="restaurants-container">
              <div className="filter-options">
                <Form 
                  onChange={this.onSelectChange}
                />
              </div>
              <RestaurantsList />
            </section>
        </main>
      </div>
    );
  }
}

export default App;
