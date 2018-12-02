import React, {Component} from 'react';
import { Route,NavLink,HashRouter as Router} from "react-router-dom";
import './App.css';
import Map from './Map/Map.js'
import SidePopups from './SidePopups/SidePopups.js'

function Overlay(props) {
	return (
		<div className="overlay">
			<SidePopups settings={props.settings} users={props.users} />
		</div>
	)
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.changeMapStyle = this.changeMapStyle.bind(this);
		this.state = {
			settings: {
				mapStyle: "mapbox://styles/mapbox/streets-v9",
				changeMapStyle: this.changeMapStyle
			},
			test_data: []
		}
	}

	componentDidMount() {
      	fetch('/users')
        	.then(res => res.json())
        	.then(users => this.setState({ test_data: users }));
    }

	changeMapStyle(newMapStyle) {
		this.setState(previousState => ({settings: {...previousState.settings, mapStyle: newMapStyle}}));
	}

    render() {
        return (
		    <Router>
      			<div className="app">
					<Map mapStyle={this.state.settings.mapStyle} />
					<Overlay settings={this.state.settings} users={this.state.test_data}/>
      			</div>
	  		</Router>
    	)
  	}
};

export default App;

{/*
Structure du DOM virtuel :
<App>
	<Map />
	<Overlay>
		<SidePopups>
			<Popup>
				<Toggle />
				<Content />
			</Popup>
		</SidePopups>
	</Overlay>
</App>
*/}


//MODIF
