import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import Pin from './Pin';
import { connect } from 'react-redux';
import { moveDraggableMarker } from '../../actions/index';

function mapStateToProps(state) {
    return {
        draggableMarkerCoordinates: state.draggableMarkerCoordinates
    }
}

function mapDispatchToProps(dispatch) {
    return {
		updateCoordinates: (newCoordinates) => dispatch(moveDraggableMarker(newCoordinates)),
	};
}

class ConnectDraggableMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: props.longitude,
            latitude: props.latitude
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    onDragEnd(e) {
        this.setState({
            longitude: e.lngLat[0],
            latitude: e.lngLat[1]
        });
    }

    onDrag(e) {
        this.setState({
            longitude: e.lngLat[0],
            latitude: e.lngLat[1]
        });
        this.props.updateCoordinates([this.state.longitude, this.state.latitude]);
    }

    render() {
        return (
            <Marker
                longitude={this.state.longitude}
                latitude={this.state.latitude}
                draggable
                onDragEnd={this.onDragEnd}
                onDrag={this.onDrag}>
                <Pin size={20} />
            </Marker>
        );
    }
}

const DraggableMarker = connect(mapStateToProps, mapDispatchToProps)(ConnectDraggableMarker);
export default DraggableMarker;
