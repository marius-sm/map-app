import React, {Component} from 'react';
import Button from "./UI/Button";
import TextField from "./UI/TextField";
import { addPOI } from '../../actions/index';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
	return {
		addPOI: (coords, name) => dispatch(addPOI(coords, name)),
	};
}

function mapStateToProps(state) {
    return {
        draggableMarkerCoordinates: state.draggableMarkerCoordinates
    }
}

class ConnectedAddPOI extends Component {
    constructor(props) {
		super(props)
		this.state = {
			POIName: ''
		}
		this.handlePOINameChange = this.handlePOINameChange.bind(this);
        this.handleValidateClick = this.handleValidateClick.bind(this);
	}

    handlePOINameChange(event) {
		this.setState({
			POIName: event.target.value,
		});
	}

    handleValidateClick() {
        this.props.addPOI(this.props.draggableMarkerCoordinates, this.state.POIName)
	}

    render() {
		return (
			<div className={null}>
                <p>{"Longitude : " + Math.round(this.props.draggableMarkerCoordinates[0]*10000)/10000}</p>
                <p>{"Latitude : " + Math.round(this.props.draggableMarkerCoordinates[1]*10000)/10000}</p>
				<TextField
					color="primary"
					type="text"
					placeholder="Name"
					fullWidth
					onChange={this.handlePOINameChange}
					value={this.state.POIName}
				/>
			<br/><div style={{height: 8, width:"100%"}}></div>
				<Button
					fullWidth
					disabled={!this.state.POIName}
					onClick={(event) => this.handleValidateClick(event)}>
					Add point of interest
				</Button>
				<br/>
			</div>
		);
	}
}

const AddPOI = connect(mapStateToProps, mapDispatchToProps)(ConnectedAddPOI)
export default AddPOI;
