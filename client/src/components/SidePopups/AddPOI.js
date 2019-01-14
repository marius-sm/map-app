import React, {Component} from 'react';
import Button from "./UI/Button";
import TextField from "./UI/TextField";

class AddPOI extends Component {
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

	}

    render() {
		return (
			<div className={null}>
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

export default AddPOI;
