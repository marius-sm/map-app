import store from '../store';

const CHANGE_MAP_STYLE = "CHANGE_MAP_STYLE";
const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT_SUCCEEDED = "LOGOUT_SUCCEEDED";
const LOGOUT_FAILED = "LOGOUT_FAILED";
const MOVE_DRAGGABLE_MARKER = "MOVE_DRAGGABLE_MARKER";

export function changeMapStyle(mapStyle) {
	return { type: CHANGE_MAP_STYLE, mapStyle };
}

export function loginSucceeded(username, token) {
	return { type: LOGIN_SUCCEEDED, username, token }
}

export function loginFailed(error) {
	return { type: LOGIN_FAILED, error }
}

export function loginWithPassword(username, password, callback) {
	return function(dispatch) {
		fetch('/users/login', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
    			username: username,
    			password: password,
  			}),
		})
		.then(response => response.json())
		.then(response => {
			if(!response.error) {
				localStorage.setItem("jwtAuthenticationToken", response.token);
				localStorage.setItem("username", username);
				dispatch(loginSucceeded(username, response.token));
				if(typeof callback === "function") callback(false);
			} else {
				dispatch(loginFailed(response.error));
				if(typeof callback === "function") callback(response.error);
			}
		})
	}
}

export function loginWithToken(username, token) {
	return function(dispatch) {
		fetch('/users/token_is_valid_and_matches_username?username=' + username, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		})
		.then(response => response.json())
		.then(response => {
			if(!response.error) {
				dispatch(loginSucceeded(username, token))
			} else {
				dispatch(loginFailed(response.error));
			}
		}).catch(function(error) {console.log(error)})
	}
}

export function logoutSucceeded() {
	return { type: LOGOUT_SUCCEEDED };
}

export function logoutFailed() {
	return { type: LOGOUT_FAILED };
}

export function logout() {
	return function(dispatch) {
		// remove the jwt
		localStorage.removeItem('jwtAuthenticationToken');
		localStorage.removeItem('username');

		// notify the server that the user logged out
		fetch('/users/logout', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		});

		dispatch(logoutSucceeded());
	}
}

export function registerNewUser(username, password, callback) {
	return function(dispatch) {
		fetch('/users/create', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
				username: username,
				password: password,
  			}),
		})
		.then(response => response.json())
		.then(response => {
			if(response.error) {
				if(typeof callback === "function") callback(response.error);
			} else {
				if(typeof callback === "function") callback(false);
				dispatch(loginWithPassword(username, password));
			}
		});
	}
}

export function moveDraggableMarker(newCoordinates) {
    return { type: MOVE_DRAGGABLE_MARKER, newCoordinates }
}

export function addPOI(coords, name) {
    return function(dispatch) {
        console.log("adding POI at longitude " + coords[0] + ", latitude " + coords[1] + " with name " + name)
        const username = store.getState().loggedInUser.username;
        const token = store.getState().loggedInUser.jwtToken;
        console.log(username + " " + token)
        fetch('/POI/create', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
				name: name,
				longitude: coords[0],
                latitude: coords[1],
                token: token
  			}),
		})
		/*.then(response => response.json())
		.then(response => {

		});*/
    }
}

export function fetchPOIs(queryObject, callback) {
    return function(dispatch) {
        if(!queryObject) return undefined;
        fetch("POI/get", {
            method: 'POST',
            headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
				viewport: queryObject.viewport,
  			})
        }).then(res => res.json())
        .then(json => callback(json))
        .catch(err => console.log(err));
    }
}
