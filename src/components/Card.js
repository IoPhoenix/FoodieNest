import React from 'react';

function Card(props) {

    const { name, thumb } = props.restaurant;
    const { locality, address } = props.restaurant.location;

    return (
        <li>
            <h3>{ name }</h3>
            <img src={ thumb } alt={name}></img>
            <p>{ locality }</p>
            <p>{ address }</p>
            <button>View Restaurant Details</button>
        </li>
    )
}

export default Card;
