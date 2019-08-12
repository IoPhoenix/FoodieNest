import React from 'react';
import Card from './Card';

function RestaurantsList(props) {

    return (
        <ul id="restaurants-list">
            { props.restaurants.map(item => {
                return <Card 
                    key={item.restaurant.id}
                    restaurant={item.restaurant}/>;
            })
            }
        </ul>
    )
}

export default RestaurantsList;
