import React, {Component} from 'react';
import Button from "./UI/Button";
import TextField from "./UI/TextField";
import styles from './Login.css';
import { loginWithPassword, logout } from '../../actions/index';
import { connect } from 'react-redux';

function Message(props) {
	if(!props.children) return null;
	return (
		<span style={{color: "red", fontSize: "0.8em"}}>{props.children}</span>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		login: (username, password, callback) => dispatch(loginWithPassword(username, password, callback)),
		logout: () => dispatch(logout()),
	};
}

function mapStateToProps(state) {
	return {
		error: state.loginError,
	}
}

class ConnectedLogin extends Component{

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			usernameExists: false,
			responseErrorMessage: "",
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value,
			responseErrorMessage: ""
		});
		fetch('/users/exists?username=' + event.target.value, {
	  		method: 'GET',
	  		headers: {
	   			'Accept': 'application/json',
				'Content-Type': 'application/json',
	  		},
		})
		.then(response => response.text())
		.then(response => {
			if(response === "true") {
				this.setState({usernameExists: true});
			} else {
				this.setState({usernameExists: false});
			}
		});
	}

	handlePasswordChange(event) {
		this.setState({
			password: event.target.value,
			responseErrorMessage: ""
		});
	}

	handleLoginButtonClick() {
		let _this = this;
		this.props.login(this.state.username, this.state.password, function(error) {
			_this.setState({responseErrorMessage: error ? error.message : ""});
		});
	}

	handleKeyPress(event) {
		if(event.key === "Enter") {
			let _this = this;
			this.props.login(this.state.username, this.state.password, function(error) {
				_this.setState({responseErrorMessage: error ? error.message : ""});
			});
		}
	}

	render() {
		return (
			<div className={styles.Login}>
				<h4 style={{display: "inline-block", marginRight: 10}}>Login</h4><Message>{this.state.responseErrorMessage}</Message>
				<TextField
					color="primary"
					placeholder="Username"
					onChange={this.handleUsernameChange}
					value={this.state.username}
					error={(this.state.username !== '' && !this.state.usernameExists)}
					helperText={this.state.username ? !this.state.usernameExists ? "Can't find this username...":" ":" "}
					fullWidth
				/>
				<br/>
				<TextField
					color="primary"
					type="password"
					placeholder="Password"
					fullWidth
					error={this.state.responseErrorMessage === "Wrong password" ? true : false}
					helperText={this.state.responseErrorMessage === "Wrong password" ? "Wrong password" : " "}
					onChange={this.handlePasswordChange}
					value={this.state.password}
					onKeyPress={this.handleKeyPress}
				/>
			<br/><div style={{height: 8, width:"100%"}}></div>
				<Button
					fullWidth
					disabled={!this.state.password || !this.state.username || !this.state.usernameExists}
					onClick={(event) => this.handleLoginButtonClick(event)}>
					Login
				</Button>
				<br/>
			</div>
		);
	}
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);
export default Login;
