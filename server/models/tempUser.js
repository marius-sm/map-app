var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: false, // pour l'instant on met false... à corriger dans le futur
		required: false,
		trim: true
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	}
})

//authenticate input against database
UserSchema.statics.authenticate = function(username, password, callback) {
	User.findOne({ username: username })
		.exec(function(error, user) {
			if(error) {
				callback({message: "Internal server error", status: 500}, null);
			} else if (!user) {
				callback({message: "User not found", status: 400}, null)
			}
			bcrypt.compare(password, user.password, function(error, result) {
				if(error) {
					callback({message: "Internal server error", status: 500}, null)
				}
				else if(result === true) {
					callback(null, user)
				} else {
					callback({message: "Wrong password", status: 401}, null)
				}
			})
		});
}

//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(error, hash) {
		if(error) {
			return next(error);
		}
		user.password = hash;
		next();
	})
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
