import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import styles from './Register.css'

class Register extends Component{

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
		if(this.state.password != this.state.passwordConfirmation) return;
		if(this.state.usernameAlreadyTaken) return;
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
			<div>
				<MuiThemeProvider>
					<div>
						<TextField
							FormHelperTextProps={{ style: { color: 'white'} }}
							placeholder="Enter a username"
							onChange={this.handleUsernameChange}
							value={this.state.username}
						/>
						{this.state.username == '' ? null :
							this.state.usernameAlreadyTaken ? <p style={{color: 'red'}}>Username already taken...</p> : <p style={{color: 'green'}}>Username free !</p>}
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
						{this.state.passwordConfirmation == '' ? null : this.state.passwordConfirmation == this.state.password ? null : <p style={{color: 'red'}}>Passwords do not match.</p>}
						<br/><br/>
						<Button variant="contained" onClick={(event) => this.handleRegisterButtonClick(event)}>Register</Button>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
export default Register;
