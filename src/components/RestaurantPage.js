import React from 'react';

function RestaurantPage(props) {
    console.log(props);
    const { params } = props.match;

    return <h1>This is page for restaurant {params.id}!</h1>;
}

export default RestaurantPage;
