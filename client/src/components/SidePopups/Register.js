import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './Login.css'

class Register extends Component{
	constructor(props) {
		super(props)
		this.state = {
			username: 'j',
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
		console.log(this.state)
		fetch('/users/create', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				passwordConfirmation: this.state.passwordConfirmation
  			})
		}, function(res) {
			console.log(res)
		})
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
			<div className={styles.Login}>
				<MuiThemeProvider>
					<div>
						<TextField
							FormHelperTextProps={{ style: { color: 'white'} }}
							placeholder="Enter a username"
							onChange={this.handleUsernameChange}
							value={this.state.username}
						/>
						<p>{this.state.usernameAlreadyTaken ? 'Username already taken...' : 'Username free !'}</p>
						<br/>
						<TextField
							FormHelperTextProps={{ style: { color: 'white'} }}
							type="password"
							placeholder="Enter a password"
							onChange={this.handlePasswordChange}
							value={this.state.password}
						/>
						<br/>
						<TextField
							FormHelperTextProps={{ style: { color: 'white'} }}
							type="password"
							placeholder="Confirm your password"
							onChange = {this.handlePasswordConfirmationChange}
							value={this.state.passwordConfirmation}
						/>
						<br/><br/>
						<Button variant="contained" onClick={(event) => this.handleRegisterButtonClick(event)}>Register</Button>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
export default Register;
