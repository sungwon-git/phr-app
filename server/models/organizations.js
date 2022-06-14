var mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

var OrganizationSchema = new mongoose.Schema({
	order: {
		type: String,
		trim: true,
	},
	id: {
		type: String,
		trim: true,
		unique: true,
	},
	title: {
		type: String,
		trim: true,
	},
	media: {
		type: String,
		trim: true,
	},
	address: {
		type: String,
		trim: true,
	},
	postalCode: {
		type: String,
		trim: true,
	},
	telecom: {
		type: String,
		trim: true,
	},
	fhirURL: {
		type: String,
		trim: true,
	},
	oauth2URL: {
		type: String,
		trim: true,
	},
	tokenURL: {
		type: String,
		trim: true,
	},
	clientID: {
		type: String,
		trim: true,
	},
	clientSecret: {
		type: String,
		trim: true,
	},
	responseType: {
		type: String,
		trim: true,
	},
	redirectURI: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model("Organization", OrganizationSchema);
