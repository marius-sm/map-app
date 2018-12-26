const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

// insert new user into database
router.post('/create', function (req, res) {
	console.log('users/create received post request')

	if (req.body.username && req.body.password ) {

		console.log('trying to create new user')

		var userData = {
			username: req.body.username,
			password: req.body.password,
		}

		User.create(userData, function (error, user) {
			if (error) {
				console.log(error)
				return res.status(500).json({error: 'Server error while creating user'});
			} else {
				console.log('new user successfully created !')
				return res.status(201).send({message: 'user created', error: null});
			}
		});

	} else {
		console.log('All fields required')
		return res.status(400).json({error: 'All fields required'});
	}
})

// login
router.post('/login', function(req, res) {
	if(req.body.username && req.body.password) {
		console.log('Trying to login')
		User.authenticate(req.body.username, req.body.password, function (error, user) {
			if (error || !user) {
				console.log('Wrong username or password.')
				res.status(401).json({
					success: false
				})
			} else {
				let token = jwt.sign({ id: user.id, username: user.username }, 'un secret', { expiresIn: 3600 })
            	res.status(200).json({
                	success: true,
                	err: null,
                	token
            	})
				console.log("token send")
				console.log("user _id : " + user._id)
				console.log('login successful')
			}
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
	jwt.verify(token, 'un secret', function(error, decoded) {
		if(error) {
			console.log('token invalid');
			res.status(200).json({loggedIn: false});
		} else {
			console.log(decoded);
			console.log('token valid');
			res.status(200).json({loggedIn: true})
		}
	})
});

// check of the jwt token belongs to given user
router.get('/token_is_valid_and_matches_username', function(req, res) {
	let token = '';
	let username = '';
	if (req.headers.authorization && req.query.username && req.headers.authorization.split(' ')[0] === 'Bearer') {
		username = req.query.username;
        token = req.headers.authorization.split(' ')[1];
    } else {
		return res.status(400).json({result: false})
	}
	jwt.verify(token, 'un secret', function(error, decoded) {
		if(error) {
			console.log('token invalid');
			res.status(200).json({result: false});
		} else {
			console.log(decoded);
			if(decoded.username === username) {
				console.log('token valid and matches username');
				res.status(200).json({result: true});
			}
			else {
				res.status(401).json({result: false});
			}


		}
	});
});

// logout
router.get('/logout', function (req, res, next) {

})

module.exports = router;
