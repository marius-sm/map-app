import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './Login.css'

class Login extends Component{
	constructor(props) {
		super(props)
		this.state = {
			username: 'test_user',
			password: 'test_pswd'
		}
		this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this)
	}

	handleLoginButtonClick() {
		fetch('/users', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
    			loguser: 'yourValue',
    			logpassword: 'yourOtherValue',
  			})
		})
	}

	render() {
		return (
			<div className={styles.Login}>
				<MuiThemeProvider>
					<div>
						<TextField
							FormHelperTextProps={{ style: { color: 'white'} }}
							placeholder="Enter your Username"
							onChange = {(event,newValue) => this.setState({username:newValue})}
						/>
						<br/>
						<TextField
							FormHelperTextProps={{ style: { color: 'white'} }}
							type="password"
							placeholder="Enter your Password"
							onChange = {(event,newValue) => this.setState({password:newValue})}
						/>
						<br/><br />
						<Button variant="contained" onClick={(event) => this.handleLoginButtonClick(event)} >Login</Button>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
export default Login;
