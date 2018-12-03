import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
//import Geocoder from 'react-map-gl-geocoder'
import Pin from './Pin.js'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFyaXVzc20iLCJhIjoiY2pvZThiOGdqMDB3azNrbG1ybDRwMXFoayJ9.VhpcScQB1k33pHFtw0T9mg';

class Map extends Component {

	constructor(props) {
      	super(props);
      	this.state = {
        	viewport: {
          		latitude: 43.785164,
          		longitude: -1.3,
          		zoom: 5,
          		bearing: 0,
          		pitch: 0
        	},
        	marker: {
          		latitude: 37.785164,
          		longitude: -100,
        	},
        	events: {}
      	};
		this.mapRef = React.createRef();
		console.log(this.mapRef)
    }

	updateViewport = (viewport) => {
      	this.setState({viewport});
    }

	render() {

		const {viewport, marker} = this.state;
		const mapStyle = this.props.mapStyle ? this.props.mapStyle : "mapbox://styles/mapbox/streets-v9";

		return (
			<ReactMapGL
				{...viewport}
				width="100%"
				height="100%"
				mapStyle={mapStyle}
				onViewportChange={this.updateViewport}
				mapboxApiAccessToken={MAPBOX_TOKEN} >
				{/*<Geocoder
          			mapRef={this.mapRef}
          			onViewportChange={this.updateViewport}
          			mapboxApiAccessToken={MAPBOX_TOKEN}
        		/>*/}
				{

				}
				<Marker
					longitude={marker.longitude}
					latitude={marker.latitude}
					draggable>
					<Pin size={20} />
				</Marker>
				<Popup latitude={37.78} longitude={-122.41} closeButton={true} closeOnClick={true} anchor="top">
		      		<div>Point d intérêt</div>
		    	</Popup>
			</ReactMapGL>
		);
	}
}

export default Map;
