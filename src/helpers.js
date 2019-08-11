import { USER_KEY, CITY_ID, LIMIT } from './constants';

class Helper {

    static get DATABASE_URL() {
      return 'https://developers.zomato.com/api/v2.1';
    }


    static async fetchCategories(callback) {
        try {
            const url = `${this.DATABASE_URL}/collections?city_id=${CITY_ID}&count=${LIMIT}`;
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
            const categories = json.collections.map(item => [item.collection.collection_id, item.collection.title]);
            callback(null, categories);

        } catch(err) {
            console.log('Error fetching categories: ', err);
        }
      }
}

export default Helper;