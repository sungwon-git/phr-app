const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const TokenSchema = new mongoose.Schema({
	userID: {
		// type: mongoose.Schema.Types.ObjectId,
		// ref: 'User',
		// trim: true
		type: String,
		trim: true,
	},
	organizationID: {
		// type: mongoose.Schema.Types.ObjectId,
		// ref: 'Hosptial',
		// trim: true
		type: String,
		trim: true,
	},
	token: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model("Token", TokenSchema);
