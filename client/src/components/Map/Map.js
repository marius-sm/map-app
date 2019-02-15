import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import { connect } from "react-redux";
import Pin from './Pin'
import DraggableMarker from './DraggableMarker'
import {fetchPOIs} from '../../actions/index'
import POI from './POI';
import ProtectedRoute, { AntiProtectedRoute } from "../ProtectedRoute";

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
            visiblePOIs: [],
            lastFetchPOIsTime: new Date().getTime()
      	};
        this.updateViewport = this.updateViewport.bind(this);
        this.fetchPOIs = this.fetchPOIs.bind(this);
        this.mapRef = React.createRef()
        this.is_mounted = false;
    }

	updateViewport = (viewport) => {
        if(this.is_mounted) {
            const time = new Date().getTime();
            if(time - this.state.lastFetchPOIsTime > 500) {
                this.fetchPOIs();
                this.setState({lastFetchPOIsTime: time})
            }
        }
      	this.setState({viewport});
    }

    componentDidMount() {
        this.is_mounted = true;
        this.map = this.mapRef.getMap();
        const _this = this;
        setTimeout(function() {
            _this.fetchPOIs();
        }, 10);

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
            _this.setState({visiblePOIs: json, lastFetchPOIsTime: new Date().getTime()});
        });
    }

	render() {

		const {viewport} = this.state;
		const mapStyle = this.props.mapStyle ? this.props.mapStyle : "mapbox://styles/mapbox/streets-v9";
        const draggableMarker = () => <DraggableMarker longitude={2.34} latitude={48.86} />;
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
                    {
                        this.state.visiblePOIs.map(function(poi, i) {
                            let k = Math.floor(poi.location.coordinates[0]*1000000)+ "" +Math.floor(poi.location.coordinates[1]*1000000)
                            k = parseInt(k);
                            return (
                                <div>
                                    <POI key={k} poiObject={poi} />
                                </div>
                            )
                        })
                    }
                </div>

                <ProtectedRoute component={draggableMarker} />
				<Popup latitude={37.78} longitude={-122.41} closeButton={true} closeOnClick={true} anchor="top">
		      		<div>Point d'intérêt</div>
                    <button>Bouton</button>
		    	</Popup>
			</ReactMapGL>
		);
	}
}

const Map = connect(mapStateToProps, mapDispatchToProps)(ConnectedMap);

export default Map;
