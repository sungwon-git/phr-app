var mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

var DocumentsSchema = new mongoose.Schema({
	userID: {
		// type: mongoose.Schema.Types.ObjectId,
		type: String,
		// ref: "User",
		trim: true,
	},
	organizationID: {
		// type: mongoose.Schema.Types.ObjectId,
		type: String,
		// ref: "Organization",
		trim: true,
	},
	documentID: {
		type: String,
		trim: true,
	},
	// encounterDate: {
	// 	type: String,
	// 	trim: true,
	// },
	// encounterType: {
	// 	type: String,
	// 	trim: true,
	// },
	document: {
		type: Object,
		trim: true,
	},
	isTransfer: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Documents", DocumentsSchema);
