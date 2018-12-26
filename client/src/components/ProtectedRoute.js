import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux";

function mapStateToProps(state) {
	return {
		authenticated: state.userIsLoggedIn
	}
}

// This route is only rendered when the user is logged in
function ConnectedProtectedRoute({ component: Component, authenticated, ...rest }) {
	return (
	   <Route {...rest} render={(props) => (
	      	authenticated ?
	        <Component {...props} /> : <Redirect to="/Login" />
	   )} />
	);
}

// This route is only rendered when the user is NOT logged in
function ConnectedAntiProtectedRoute({ component: Component, authenticated, ...rest }) {
	return (
	   <Route {...rest} render={(props) => (
	      	!authenticated ?
	        <Component {...props} /> : <Redirect to="/" />
	   )} />
	);
}

const ProtectedRoute = connect(mapStateToProps)(ConnectedProtectedRoute);
export const AntiProtectedRoute = connect(mapStateToProps)(ConnectedAntiProtectedRoute);
export default ProtectedRoute;
