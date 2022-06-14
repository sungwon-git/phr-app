const Account = require("../models/accounts");

module.exports.account = (req, res) => {
	const organizationID = req.body.organizationID;
	const userID = req.body.userID;
	// console.log(organizationID);

	Account.findOne({ organizationID: organizationID, userID: userID }, function (err, account) {
		if (err) {
			res.status(404).json({
				message: "fail",
			});
		}

		res.status(200).json({
			message: "success",
			account,
		});
	});
};

module.exports.insert = (req, res) => {
	data = [
		{ email: "phr@healthdata.com", organizationID: "4578", userID: "113610" },
		{ email: "phr@healthdata.com", organizationID: "4596", userID: "113610" },
		{ email: "phr@healthdata.com", organizationID: "48651", userID: "113610" },
		{ email: "phr_kim@healthdata.com", organizationID: "4578", userID: "75910" },
		{ email: "phr_kim@healthdata.com", organizationID: "4596", userID: "75910" },
		{ email: "phr_kim@healthdata.com", organizationID: "48651", userID: "75910" },
		{ email: "phr_lee@healthdata.com", organizationID: "4578", userID: "68056" },
	];

	const account = new Account(data);
	account.save((err, account) => {
		if (err) {
			res.status(404).json({
				message: "insert fail",
			});
		}
		res.status(200).json({
			message: "success",
			account,
		});
	});
};

// db.accounts.insertMany([
//   {"email":"phr@healthdata.com", "organizationID":"4578", "userID":"113610"},
//   {"email":"phr@healthdata.com", "organizationID":"4596", "userID":"113610"},
//   {"email":"phr@healthdata.com", "organizationID":"48651", "userID":"113610"},
//   {"email":"phr@healthdata.com", "organizationID":"4578", "userID":"75910"},
//   {"email":"phr@healthdata.com", "organizationID":"4596", "userID":"75910"},
//   {"email":"phr@healthdata.com", "organizationID":"48651", "userID":"75910"},
//   {"email":"phr@healthdata.com", "organizationID":"4578", "userID":"68056"},
// ])
