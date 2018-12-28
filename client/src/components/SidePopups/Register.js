import React, { Component } from 'react';
import Button from "./UI/Button";
import TextField from "./UI/TextField";
import { connect } from "react-redux";
import { registerNewUser } from "../../actions/index"

function Message(props) {
	if(!props.children) return null;
	return (
		<span style={{color: "red", fontSize: "0.8em"}}>{props.children}</span>
	);
}

function mapDispatchToProps(dispatch) {
	return function(dispatch) {
		return {
			register: (username, password, callback) => dispatch(registerNewUser(username, password, callback))
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
			usernameAlreadyTaken: true,
			responseErrorMessage: "",
		}
		this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleRegisterButtonClick() {
		if(this.state.password !== this.state.passwordConfirmation) return;
		if(this.state.usernameAlreadyTaken) return;
		let _this = this;
		this.props.register(this.state.username, this.state.password, function(error) {
			_this.setState({responseErrorMessage: error ? error.message : ""});
		});
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value, responseErrorMessage: ""});
		fetch('/users/exists?username=' + event.target.value , {
	  		method: 'GET',
	  		headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
	  		},
		})
		.then(response => response.text())
		.then(response => this.setState({usernameAlreadyTaken: response === "true"}));
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value, responseErrorMessage: ""});
	}

	handlePasswordConfirmationChange(event) {
		this.setState({passwordConfirmation: event.target.value, responseErrorMessage: ""})
	}

	handleKeyPress(event) {
		if(event.key === "Enter") {
			if(!this.state.usernameAlreadyTaken) {
				let _this = this;
				this.props.register(this.state.username, this.state.password, function(error) {
					_this.setState({responseErrorMessage: error ? error.message : ""});
				});
			}
		}
	}

	render() {
		return (
			<div>
				<h4 style={{display: "inline-block", marginRight: 10}}>Register</h4><Message>{this.state.responseErrorMessage}</Message>
				<TextField
					color="primary"
					placeholder="Username"
					onChange={this.handleUsernameChange}
					value={this.state.username}
					error={this.state.username !== "" && this.state.usernameAlreadyTaken}
					helperText={this.state.username ? this.state.usernameAlreadyTaken ? "Username already taken...":" ":" "}
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
					onKeyPress={this.handleKeyPress}
				/>
				<br/><div style={{height: 8, width:"100%"}}></div>
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
