import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import { connect } from "react-redux";
import Pin from './Pin'
import DraggableMarker from './DraggableMarker'
import {fetchPOIs} from '../../actions/index'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFyaXVzc20iLCJhIjoiY2pvZThiOGdqMDB3azNrbG1ybDRwMXFoayJ9.VhpcScQB1k33pHFtw0T9mg';

const mapStateToProps = state => {
  return { mapStyle: state.mapStyle };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchPOIs: (queryObject, callback) => dispatch(fetchPOIs(queryObject, callback))
    }
}

class ConnectedMap extends Component {

	constructor(props) {
      	super(props);
        const draggableMarker = <DraggableMarker visible="false"/>
      	this.state = {
        	viewport: {
          		latitude: 48.8585,
          		longitude: 2.339,
          		zoom: 12.1,
          		bearing: 0,
          		pitch: 0
        	},
        	marker: {
          		latitude: 37.785164,
          		longitude: -100,
        	},
            markers: [],
            userAddedPOIs: [],
        	events: {},
            visiblePOIs: [],
      	};
        this.updateViewport = this.updateViewport.bind(this);
        this.fetchPOIs = this.fetchPOIs.bind(this);
        this.mapRef = React.createRef()
        this.is_mounted = false;
    }

	updateViewport = (viewport) => {
        if(this.is_mounted) {
            const bounds = this.map.getBounds();
            /*console.log({
                north: bounds._ne.lat,
                south: bounds._sw.lat,
                west: bounds._sw.lng,
                east: bounds._ne.lng,
            });*/
        }
      	this.setState({viewport});
    }

    componentDidMount() {
        this.is_mounted = true;
        this.map = this.mapRef.getMap();
    }

    fetchPOIs() {
        const bounds = this.map.getBounds();
        const _this = this;
        this.props.fetchPOIs({
            viewport: {
                north: bounds._ne.lat,
                south: bounds._sw.lat,
                west: bounds._sw.lng,
                east: bounds._ne.lng,
            }
        }, function(json) {
            _this.setState({visiblePOIs: json});
        });
        console.log("fetching")
    }

	render() {

		const {viewport, marker} = this.state;
		const mapStyle = this.props.mapStyle ? this.props.mapStyle : "mapbox://styles/mapbox/streets-v9";
		return (
			<ReactMapGL
                ref={ map => this.mapRef = map }
                onMouseUp={() => this.fetchPOIs()}
				{...viewport}
				width="100%"
				height="100%"
				mapStyle={mapStyle}
				onViewportChange={this.updateViewport}
				mapboxApiAccessToken={MAPBOX_TOKEN} >
                <div>
                    {this.state.visiblePOIs.map(function(POI, i){
                        return (<Marker longitude={POI.location.coordinates[0]} latitude={POI.location.coordinates[1]}>
                                <Pin size={20} />
                                </Marker>)
                    })}
				<Marker
					longitude={marker.longitude}
					latitude={marker.latitude}
					draggable>
					<Pin size={20} />
				</Marker></div>
                <DraggableMarker longitude={2.34} latitude={48.86}/>
				<Popup latitude={37.78} longitude={-122.41} closeButton={true} closeOnClick={true} anchor="top">
		      		<div>Point d intérêt</div>
		    	</Popup>
			</ReactMapGL>
		);
	}
}

const Map = connect(mapStateToProps, mapDispatchToProps)(ConnectedMap);

export default Map;
