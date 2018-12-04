import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
//import RaisedButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './Login.css'

class Login extends Component{
  constructor(props) {
		super(props)
		this.state = {
			username: 'test_user',
      		password: 'test_pswd'
		}
	}

  render() {
    return (
      <div className={styles.Login}>
        <MuiThemeProvider>
          <div>
           <TextField
             FormHelperTextProps={{ style: { color: 'white'} }}
             placeholder="Enter your Username"
             helperText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               FormHelperTextProps={{ style: { color: 'white'} }}
               type="password"
               placeholder="Enter your Password"
               helperText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
          <br/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
export default Login;
