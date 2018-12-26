import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
							FormHelperTextProps={{ style: { color: 'white'} }}
							placeholder="Enter your Username"
							onChange = {this.handleUsernameChange}
						/>
						{this.state.username == '' ? null :
							!this.state.usernameExists ?
							(this.state.username != '' ? <p style={{color: 'red'}}>Cant find this username...</p> : <p style={{color: 'green'}}>ok</p>)
							: null
						}

						<br/>
						<TextField
							FormHelperTextProps={{ style: { color: 'white'} }}
							type="password"
							placeholder="Enter your Password"
							onChange = {this.handlePasswordChange}
						/>
						<br/><br />
						<Button variant="contained" onClick={(event) => this.handleLoginButtonClick(event)}>Login</Button>
					</div>
		);
	}
}

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);
export default Login;
