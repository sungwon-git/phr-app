var mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Should be a vaild email address!"],
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		// required:[true,'Password is required!']
		//비밀번호 조회 여부 세팅
		// select:false
	},
	// organizationID: {
	// 	type: String,
	// 	trim: true,
	// },
});

module.exports = mongoose.model("User", UserSchema);
