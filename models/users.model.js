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
