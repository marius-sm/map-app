import React, { Component } from 'react';
import Button from "./UI/Button";
import TextField from "./UI/TextField";
import { connect } from "react-redux";
import { registerNewUser } from "../../actions/index"

function mapDispatchToProps(dispatch) {
	return function(dispatch) {
		return {
			register: (username, password) => dispatch(registerNewUser(username, password))
		}
	}
}

class ConnectedRegister extends Component{

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			passwordConfirmation: '',
			usernameAlreadyTaken: true
		}
		this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this)
	}

	handleRegisterButtonClick() {
		if(this.state.password !== this.state.passwordConfirmation) return;
		if(this.state.usernameAlreadyTaken) return;
		this.props.register(this.state.username, this.state.password);
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value}, function() {
			fetch('/users/exists?username=' + this.state.username , {
	  			method: 'GET',
	  			headers: {
	    			'Accept': 'application/json',
	    			'Content-Type': 'application/json',
	  			},
			}).then(response => response.text()).then(data => this.setState({usernameAlreadyTaken: data == 'true'}))
		})
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value})
	}

	handlePasswordConfirmationChange(event) {
		this.setState({passwordConfirmation: event.target.value})
	}

	render() {
		return (
			<div>
				<h4>Register</h4>

				<TextField
					color="primary"
					placeholder="Username"
					onChange={this.handleUsernameChange}
					value={this.state.username}
					error={this.state.username !== '' && this.state.usernameAlreadyTaken}
					helperText={this.state.username ? this.state.usernameAlreadyTaken ? "Username already taken...":"Username free !":" "}
					fullWidth
				/>
				<br/>
				<TextField
					color="primary"
					type="password"
					placeholder="Password"
					fullWidth
					onChange={this.handlePasswordChange}
					value={this.state.password}
					helperText=" "
				/>
				<br/>
				<TextField
					type="password"
					placeholder="Confirm your password"
					fullWidth
					error={this.state.password !== this.state.passwordConfirmation && this.state.passwordConfirmation !== ""}
					onChange = {this.handlePasswordConfirmationChange}
					value={this.state.passwordConfirmation}
					helperText={this.state.passwordConfirmation === " " ? null : this.state.passwordConfirmation == this.state.password ? " " : "Passwords do not match."}
				/>
				<br/>
				<Button
					fullWidth
					disabled={!this.state.password || !this.state.username || !this.state.password === '' || this.state.username === '' || this.state.password !== this.state.passwordConfirmation}
					onClick={(event) => this.handleRegisterButtonClick(event)}>
					Register
				</Button>
				
			</div>
		);
	}
}

const Register = connect(null, mapDispatchToProps)(ConnectedRegister);
export default Register;
