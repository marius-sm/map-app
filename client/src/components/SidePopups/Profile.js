import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { logout } from "../../actions/index"

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {
			console.log('dispatching logout()');
			dispatch(logout())
		},
	};
}

function ConnectedLogout(props) {
	return (
		<Button variant="contained" onClick={() => {props.logout()}}>Logout</Button>
	)
}

const Logout = connect(null, mapDispatchToProps)(ConnectedLogout);

class ConnectedProfile extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
			<Logout />
		)
	}
}

const Profile = connect(null, null)(ConnectedProfile);
export default Profile;
