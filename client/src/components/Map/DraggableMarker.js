import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import Pin from './Pin'

class DraggableMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: props.longitude,
            latitude: props.latitude
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(e) {
        this.setState({
            longitude: e.lngLat[0],
            latitude: e.lngLat[1]
        });
    }

    render() {
        return (
            <Marker
                longitude={this.state.longitude}
                latitude={this.state.latitude}
                draggable
                onDragEnd={this.onDragEnd}>
                <Pin size={20} />
            </Marker>
        );
    }
}

export default DraggableMarker;
