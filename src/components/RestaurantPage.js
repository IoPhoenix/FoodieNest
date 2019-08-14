import React from 'react';
import Helper from '../helpers';
import Map from './Map';


class RestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            restaurant: null
        }
    }

    componentDidMount() {
        const newMap = Helper.initMap();
        this.setState({ map: newMap }, () => {
            const marker = Helper.createMarkerFor(this.state.restaurant);
            marker.add(this.state.map);
        });
    }

    render() {
        const { params } = this.props.match;
        return (
            <div>
                <h1>This is page for restaurant {params.id}!</h1>
                <Map />
            </div>
        )
    }
}

export default RestaurantPage;
