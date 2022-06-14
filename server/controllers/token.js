const Token = require("../models/tokens");

/***********************************************************************************

***********************************************************************************/
module.exports.save = (req, res) => {
	const userID = req.body.userID;
	const organizationID = req.body.organizationID;

	Token.findOne({ userID: userID, organizationID: organizationID }, (err, token) => {
		if (err) {
			res.status(404).json({
				message: "there are something wrong",
			});
		}

		if (token) {
			Token.deleteOne({ _id: token._id }, (err, token) => {
				if (err) {
					res.status(404).json({
						message: "there are something wrong",
					});
				}
				console.log(token);
			});
		}

		const data = {
			userID: userID,
			organizationID: organizationID,
			token: req.body.token,
		};

		const newToken = new Token(data);
		newToken.save((err, token) => {
			if (err) {
				res.status(204).json({
					message: "token insert fail",
				});
			}
			res.status(200).json({
				message: "token insert success",
			});
		});
	});
};

module.exports.token = (req, res) => {
	let userID = req.body.userID;
	let organizationID = req.body.organizationID;
	Token.findOne({ userID: userID, organizationID: organizationID }, (err, token) => {
		if (err) {
			res.status(404).json({
				message: "there is not token",
			});
		}

		if (token) {
			res.status(200).json(token);
		} else {
			res.status(404).json({
				message: "there is not token",
			});
		}
	});
};
