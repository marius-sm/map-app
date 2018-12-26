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

class ConnectedLogin extends Component{

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			usernameExists: false,
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this)
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value}, function() {
			fetch('/users/exists?username=' + this.state.username , {
	  			method: 'GET',
	  			headers: {
	    			'Accept': 'application/json',
	    			'Content-Type': 'application/json',
	  			},
			}).then(response => response.text()).then(data => this.setState({usernameExists: data == 'true'}))
		})
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value})
	}

	handleLoginButtonClick() {
		this.props.login(this.state.username, this.state.password);
	}

	render() {
		return (
			<div className={styles.Login}>
				<TextField
					color="primary"
					placeholder="Username"
					onChange={this.handleUsernameChange}
					value={this.state.username}
					error={this.state.username !== '' && !this.state.usernameExists}
					helperText={this.state.username ? !this.state.usernameExists ? "Can't find this username...":" ":" "}
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
				<Button
					fullWidth
					disabled={!this.state.password || !this.state.username || !this.state.usernameExists}
					onClick={(event) => this.handleLoginButtonClick(event)}>
					Login
				</Button>
			</div>
		);
	}
}

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);
export default Login;
