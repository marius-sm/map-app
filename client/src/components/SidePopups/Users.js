import React, {Component} from 'react';

function Users(props) {
	const users = props.users ? props.users : []
	return (
		<div className="Users">
		{props.users.map(user =>
	  	<div key={user.id}>{user.username}</div>

	)}
	</div>
)
}

export default Users;
