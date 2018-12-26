import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/index";
import { loginWithToken } from "../actions/index"

// we initialize the store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
const unsubscribe = store.subscribe(() => console.log("Store was updated :\n" + JSON.stringify(store.getState())));

// if a token and username are in localStorage, validate them and login
let username = localStorage.getItem('username');
let token = localStorage.getItem('jwtAuthenticationToken');
if(username && token) {
	store.dispatch(loginWithToken(username, token));
}

export default store;
