var express = require('express');
var router = express.Router();
var User = require('../models/user');


//POST route for updating data
router.post('/create', function (req, res, next) {
	// confirm that user typed same password twice
	console.log('received post request')
	if (req.body.password !== req.body.passwordConfirmation) {
		console.log('passwords dont match !')
		var err = new Error('Passwords do not match.');
		err.status = 400;
		res.send("passwords dont match");
		return next(err);
	}

	if (req.body.username &&
		req.body.password &&
		req.body.passwordConfirmation) {

		console.log('trying to create new user')

		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
		}

		User.create(userData, function (error, user) {
			if (error) {
				console.log(error)
				return next(error);
			} else {
				console.log('new user created')
				req.session.userId = user._id;
				return res.send('user created')
				//return res.redirect('/profile');
			}
		});

	} else if (req.body.loguser && req.body.logpassword) {
		console.log('else if')
		User.authenticate(req.body.loguser, req.body.logpassword, function (error, user) {
			if (error || !user) {
				var err = new Error('Wrong username or password.');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				//return res.redirect('/profile');
			}
		});
	} else {
		console.log('All fields required')
		return res.send('All fields required')
		//var err = new Error('All fields required.');
		//err.status = 400;
		//return next(err);
	}
})

// check if user exists
router.get('/exists', function (req, res, next) {

	User.findOne({username: req.query.username}, (error, user) => {
		if (user === null) {
			console.log('user doesnt exist yet')
			return res.send('false');
		} else {
			console.log('username already take')
			return res.send('true');
		}
	})
	/*.exec(function (error, user) {
		return;
		console.log(req.query)
		if (error) {
			console.log('error...')
			return;
		} else {
			if (user === null) {
				console.log('user doesnt exist yet')
				return res.send('false');
			} else {
				console.log('username already take')
				return res.send('true');
			}
		}
	});*/
});

// GET route after registering
router.get('/profile', function (req, res, next) {
	User.findById(req.session.userId)
	.exec(function (error, user) {
		if (error) {
			return next(error);
		} else {
			if (user === null) {
				var err = new Error('Not authorized! Go back!');
				err.status = 400;
				return next(err);
			} else {
				return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
			}
		}
	});
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;





// OLD
/*var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
  //res.send('respond with a resource');
  response.json([{
	  id: 1,
	  username: "test_usera"
  }, {
	  id: 2,
	  username: "test_password"
  }]);
});

module.exports = router;*/
