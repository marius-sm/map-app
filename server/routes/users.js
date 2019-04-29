const express = require('express');
const User = require('/app/models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWTSecret = process.env.JWT_SECRET || "secret vraiment ultra secret";

// insert new user into database
router.post('/create', function (req, res) {
	console.log('users/create received post request')
	if (req.body.username && req.body.password ) {
		console.log('trying to create new user')
		var userData = {
			username: req.body.username,
			password: req.body.password,
		}
		User.create(userData, function(error, user) {
			if(error) {
				console.log(error)
				return res.json({
					error: {
						message: "Server error while creating user",
					},
				}).status(500);
			} else {
				console.log('new user successfully created !')
				return res.status(201).json({error: false});
			}
		});

	} else {
		console.log('All fields required')
		return res.json({
			error: {
				message: "No username or password provided",
			},
		}).status(400);
	}
})

// login
router.post('/login', function(req, res) {
	if(req.body.username && req.body.password) {
		console.log('Trying to login')
		User.authenticate(req.body.username, req.body.password, function(error, user) {
			if(error) {
				res.json({
					error: error
				}).status(error.status);
			} else if(!user) {
				res.json({
					error: {message: "Internal server error", status: 500}
				}).status(500);
			} else {
				const token = jwt.sign({ id: user.id, username: user.username }, JWTSecret, { expiresIn: 3600 });
				res.json({
					token
				}).status(200);
			}
			return;
		});
	} else {
		console.log('All fields required')
		return res.status(400).json({
			success: false
		})
	}
});

// check if user exists in database
router.get('/exists', function (req, res) {
	User.findOne({username: req.query.username}, (error, user) => {
		if (user === null) {
			console.log('user doesnt exist yet')
			return res.send('false');
		} else {
			console.log('username already taken')
			return res.send('true');
		}
	})
})

function verifyToken(token, callback) {
    jwt.verify(token, JWTSecret, function(error, decoded) {
		if(error) {
            console.log('token invalid');
            callback({result: true, error: error, decoded: decoded});
            return {result: false, error: error, decoded: decoded};
		} else {
			console.log(decoded);
			console.log('token valid');
            callback({result: true, error: null, decoded: decoded});
            return {result: true, error: null, decoded: decoded};
		}
	})
}

// check if user is logged in
router.get('/check', function (req, res) {
	console.log('get /users/check')
	let token = ''
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else {
		return res.status(400).json({loggedIn: false})
	}
	console.log('token : ' + token)
    const verification = verifyToken(token, function(result) {
        if(result.error) {
    		res.status(401).json({loggedIn: false});
    	} else {
    		console.log(decoded);
    		console.log('token valid');
    		res.status(200).json({loggedIn: true})
    	}
    });

});

// check of the jwt token belongs to given user
router.get('/token_is_valid_and_matches_username', function(req, res) {
	let token = '';
	let username = '';
	if (req.headers.authorization && req.query.username && req.headers.authorization.split(' ')[0] === 'Bearer') {
		username = req.query.username;
        token = req.headers.authorization.split(' ')[1];
    } else {
		return res.json({
			error: {message: "No token provided"}
		}).status(400);
	}
	jwt.verify(token, JWTSecret, function(error, decoded) {
		if(error) {
			if(error.name === "TokenExpiredError") {
				return res.json({
					error: {message: "Login expired"}
				}).status(401);
			}
			return res.json({
				error: {message: "Token invalid"}
			}).status(401);
		} else {
			console.log(decoded);
			if(decoded.username === username) {
				return res.json({
					error: false,
				}).status(200);
			}
			else {
				return res.json({
					error: {message: "Token invalid"}
				}).status(401);
			}
		}
	});
});

// logout
router.get('/logout', function (req, res, next) {

});

module.exports = {router, verifyToken};
