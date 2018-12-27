import React, {Component} from 'react';
import Button from "./UI/Button";
import TextField from "./UI/TextField";
import styles from './Login.css';
import { loginWithPassword, logout } from '../../actions/index';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
	return {
		login: (username, password) => dispatch(loginWithPassword(username, password)),
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
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value}, function() {
			fetch('/users/exists?username=' + this.state.username , {
	  			method: 'GET',
	  			headers: {
	    			'Accept': 'application/json',
	    			'Content-Type': 'application/json',
	  			},
			})
			.then(response => response.text())
			.then(data => this.setState({usernameExists: data == 'true'}))
		})
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value})
	}

	handleLoginButtonClick() {
		this.props.login(this.state.username, this.state.password);
	}

	handleKeyPress(event) {
		if(event.key === "Enter") {
			if(this.state.usernameExists)
				this.props.login(this.state.username, this.state.password);
		}
	}

	render() {
		return (
			<div className={styles.Login}>
				<TextField
					color="primary"
					placeholder="Username"
					onChange={this.handleUsernameChange}
					value={this.state.username}
					error={(this.state.username !== '' && !this.state.usernameExists) || this.props.error}
					helperText={this.state.username ? !this.state.usernameExists ? "Can't find this username...":" ":" "}
					fullWidth
				/>
				<br/>
				<TextField
					color="primary"
					type="password"
					placeholder="Password"
					fullWidth
					error={this.props.error}
					onChange={this.handlePasswordChange}
					value={this.state.password}
					helperText={this.props.error ? "Wrong password" : " "}
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
