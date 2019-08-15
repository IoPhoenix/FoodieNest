import { USER_KEY, CITY_ID, LIMIT, ENTITY_TYPE } from './constants';
import Leaflet from 'leaflet';

class Helper {

  constructor() {
    this.restaurants = [];
  }

  // static get restaurants() {
  //   return Helper.restaurants;
  // }

  // static set restaurants(restaurants) {
  //   Helper.restaurants = restaurants;
  // }

  static get DATABASE_URL() {
    return 'https://developers.zomato.com/api/v2.1';
  }


  static initMap = () => {
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

    // add layer which will contain markers:
    const layer = Leaflet.layerGroup().addTo(map);

    return layer;
  }


  static createMarkerFor(restaurant) {
    const marker = new Leaflet.marker([restaurant.location.latitude, restaurant.location.longitude], {
        title: restaurant.name,
        id: restaurant.id,
        alt: 'Marker for ' + restaurant.name,
        riseOnHover: true
      });
      return marker;
  } 
    

  static async fetchCategories(callback) {
      try {
          const url = `${Helper.DATABASE_URL}/collections?city_id=${CITY_ID}&count=${LIMIT}`;
          const data = await fetch(url, 
              {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'user-key': USER_KEY
                  }
              }
          )
          const json = await data.json();

          // Get ids and titles for all categories:
          const categories = json.collections
                                          .map(item => item.collection.title)
                                          .sort();
          callback(null, categories);

      } catch(err) {
          console.log('Error fetching categories: ', err);
      }
  }


  static fetchNeighborhoods(callback) {
      Helper.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
        } else {
          // Get all neighborhoods from all restaurants
          const neighborhoods = restaurants
                                      .map(item => item.restaurant.location.locality)
                                      .sort();

          // Remove duplicates from neighborhoods
          const uniqueNeighborhoods = neighborhoods.filter((item, i) => neighborhoods.indexOf(item) === i);
          callback(null, uniqueNeighborhoods);
        }
      });
  }
    
    
  static fetchCuisines(callback) {
        Helper.fetchRestaurants((error, restaurants) => {
          if (error) {
            callback(error, null);
          } else {
            // Get all cuisines from all restaurants
            const cuisines = restaurants
                                .map(item => item.restaurant.cuisines.split(', '))
                                .reduce((acc, val) => acc.concat(val))
                                .sort();

            // Remove duplicates from cuisines
            const uniqueCuisines = cuisines.filter((item, i) => cuisines.indexOf(item) === i);
            callback(null, uniqueCuisines);
          }
        });
  }


  static async fetchRestaurants(callback) {
    try {
      const url = `${Helper.DATABASE_URL}/search?entity_id=${CITY_ID}&entity_type=${ENTITY_TYPE}&count=${LIMIT}`;
      const data = await fetch(url,
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'user-key': USER_KEY
              }
          });
      const json = await data.json();
      callback(null, json.restaurants);
      
    } catch(err) {
      console.log('Error fetching restaurants: ', err);
    }
  }
  
      

    static fetchAllRestaurants = (callback) => {

        // Fetch all restaurants
        Helper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, restaurants);
            }
        });
    }

  
    static async fetchRestaurantById(id, callback) {
      try {
        const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}}`;
        const data = await fetch(url,
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'user-key': USER_KEY
              }
          });
        const json = await data.json();
        callback(null, json);

      } catch(err) {
        console.log('Error fetching restaurant by id: ', err);
      }
    }
}

export default Helper;