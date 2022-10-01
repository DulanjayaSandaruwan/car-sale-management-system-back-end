const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

usersSchema.pre('save', function(next) {
	const users = this;
	if (!users.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(users.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			users.password = hash;
			next();
		});
	});
});

usersSchema.methods.comparePassword = function(candidatePassword) {
	const users = this;
	return new Promise((resolver, reject) => {
		bcrypt.compare(candidatePassword, users.password, (err, isMatch) => {
			if (err) {
				return reject(err);
			}
			if (!isMatch) {
				return reject(err);
			}
			resolver(true);
		});
	});
};

module.exports = mongoose.model("Users", usersSchema);
