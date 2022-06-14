var mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

var AccountSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
	},
	organizationID: {
		type: String,
		trim: true,
	},
	userID: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model("Account", AccountSchema);
