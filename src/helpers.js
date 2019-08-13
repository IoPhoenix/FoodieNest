import { USER_KEY, CITY_ID, LIMIT, ENTITY_TYPE } from './constants';

class Helper {

    static get DATABASE_URL() {
      return 'https://developers.zomato.com/api/v2.1';
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
            const categories = json.collections.map(item => item.collection.title);
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
            const neighborhoods = restaurants.map(item => item.restaurant.location.locality);

            // Remove duplicates from neighborhoods
            const uniqueNeighborhoods = neighborhoods.filter((res, i) => neighborhoods.indexOf(res) === i);
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
            const cuisines = restaurants.map(item => item.restaurant.cuisines);
            
            // Remove duplicates from cuisines
            const uniqueCuisines = cuisines.filter((res, i) => cuisines.indexOf(res) === i);
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
  
      

    static fetchAllRestaurants = (category, neighborhood, cuisine, callback) => {

        // Fetch all restaurants
        Helper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                let results = restaurants;
                if (category !== 'all') { // filter by category
                    
                }

                if (cuisine !== 'all') { // filter by cuisine
                }

                if (neighborhood !== 'all') { // filter by neighborhood
                }

                callback(null, results);
            }
        });
    }
}

export default Helper;