import React, {Component} from 'react'
import { Route,NavLink,BrowserRouter as Router} from 'react-router-dom'
import './App.css'
import Map from './Map/Map.js'
import SidePopups from "./SidePopups/SidePopups.js";

class App extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
        return (
			<Router>
				<div className="app">
					<Map />
					<div className="overlay">
						<SidePopups/>
					</div>
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
