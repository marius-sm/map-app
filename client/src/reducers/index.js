const initialState = {
	mapStyle: "mapbox://styles/mapbox/streets-v9",
	userIsLoggedIn: false, // by default, the user is logged out
	loggedInUser: {
		username: '',
		jwtToken: '',
	},
	loginError: false,
};

function rootReducer(state = initialState, action) {
  	if (action.type === "CHANGE_MAP_STYLE") {
		const newState = Object.assign({}, state, {
      		mapStyle: action.mapStyle
    	});
    	return newState;
  	}
	if (action.type === "LOGIN_SUCCEEDED") {
		const newState = Object.assign({}, state, {
      		userIsLoggedIn: true,
			loggedInUser: {
				username: action.username,
				jwtToken: action.token,
			},
			loginError: false,
    	});
		return newState;
	}
	if (action.type === "LOGIN_FAILED") {
		const newState = Object.assign({}, state, {
      		loginError: true,
    	});
		return newState;
	}
	if (action.type === "LOGOUT_SUCCEEDED") {
		const newState = Object.assign({}, state, {
      		userIsLoggedIn: false,
			loggedInUser: {
				username: '',
				jwtToken: '',
			},
    	});
		return newState;
	}
  	return state;
}
export default rootReducer;
