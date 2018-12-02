import React, {Component} from 'react';

class MapStyleSelector extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		if(props.settings)
			this.state = {
				value: props.settings.mapStyle
			}
	}

	handleChange(e) {
		if(!this.props.settings) return;
		this.setState({value: e.target.value}, function() {
			this.props.settings.changeMapStyle(this.state.value);
		});
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

function Settings(props) {
	return (
		<div className="Settings">
			<MapStyleSelector settings={props.settings} />
		</div>
	)
}

export default Settings;
