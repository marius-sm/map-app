import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeMapStyle } from "../../actions/index"

function mapDispatchToProps(dispatch) {
	return {
		changeMapStyle: mapStyle => dispatch(changeMapStyle(mapStyle))
	}
}

function mapStateToProps(state) {
	return {
		mapStyle: state.mapStyle
	}
}

class ConnectedMapStyleSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.mapStyle ? props.mapStyle : "mapbox://styles/mapbox/streets-v9"
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.props.changeMapStyle(event.target.value)
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<div className="MapStyleSelector">
				<input type="radio" name="MapStyleSelector" id="MapStyleSelectorLight"
					   value="mapbox://styles/mapbox/streets-v9"
					   checked={this.state.value === 'mapbox://styles/mapbox/streets-v9'}
					   onChange={this.handleChange} />
				<label htmlFor="MapStyleSelectorLight">Light</label>
				<input type="radio" name="MapStyleSelector" id="MapStyleSelectorDark"
				       value="mapbox://styles/mapbox/dark-v9"
					   checked={this.state.value === 'mapbox://styles/mapbox/dark-v9'}
					   onChange={this.handleChange} />
				<label htmlFor="MapStyleSelectorDark">Dark</label>
			</div>
		)
	}
}

const MapStyleSelector = connect(mapStateToProps, mapDispatchToProps)(ConnectedMapStyleSelector);

function Settings(props) {
	return (
		<div className="Settings">
			<MapStyleSelector settings={props.settings} />
		</div>
	)
}

export default Settings;
