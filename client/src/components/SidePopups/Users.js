import React, {Component} from 'react';

class Users extends Component {

	constructor(props) {
		super(props)
		this.state = {
			users: []
		}
	}

	componentDidMount() {
      	fetch('/users')
        	.then(res => res.json())
        	.then(users => this.setState({ users: users }));
    }

	render() {
		const users = this.state.users ? this.state.users : []
		return (
			<div className="Users">
				{this.state.users.map(user =>
	  				<div key={user.id}>{user.username}</div>
				)}
			</div>
		)
	}
}

export default Users;
