import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";


function Restaurant(props) {

    const { name, thumb } = props.restaurant;
    const { locality, address } = props.restaurant.location;

    return (
        <Card elevation={1}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    { name }
                </Typography>
            <Typography variant="subtitle1" gutterBottom>
                { locality }
            </Typography>
            <Typography paragraph>
                { address }
            </Typography>
                <img src={ thumb } alt={name}></img>
                <button>View Restaurant Details</button>
            </CardContent>
        </Card>
    );
}

export default Restaurant;
