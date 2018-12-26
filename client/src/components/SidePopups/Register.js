import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

				<TextField
					FormHelperTextProps={{ style: { color: 'white'} }}
					placeholder="Enter a username"
					onChange={this.handleUsernameChange}
					value={this.state.username}
					/>
				{this.state.username == '' ? null :
					this.state.usernameAlreadyTaken ?
					<p style={{color: 'red'}}>
						Username already taken...
					</p>
					:
					<p style={{color: 'green'}}>
						Username free !
					</p>
				}

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
				{this.state.passwordConfirmation == '' ? null : this.state.passwordConfirmation == this.state.password ? null :
					<p style={{color: 'red'}}>
						Passwords do not match.
					</p>
				}

				<br/>
				<br/>

				<Button
					variant="contained"
					disabled={!this.state.password || !this.state.username || !this.state.password === '' || this.state.username === '' || this.state.password !== this.state.passwordConfirmation}
					onClick={(event) => this.handleRegisterButtonClick(event)}>Register</Button>

			</div>
		);
	}
}

const Register = connect(null, mapDispatchToProps)(ConnectedRegister);
export default Register;
