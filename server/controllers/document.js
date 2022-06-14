const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");
const Documents = require("../models/documents");
const Token = require("../models/tokens");
const Organization = require("../models/organizations");
const util = require("../utils/utils");

module.exports.insert = (req, res) => {
	// console.log("document insert", req.body);
	let document = {
		userID: req.body.userID,
		organizationID: req.body.organizationID,
		documentID: req.body.documentID,
		document: req.body.document,
		isTransfer: req.body.isTransfer,
	};

	const new_document = new Documents(document);
	new_document.save(async (err) => {
		if (err) {
			console.log("document save error :", err);
			res.status(400).json({
				success: false,
				message: "there are something error",
			});
		}
		res.status(200).json({
			message: "document is inserted",
		});
	});
};

module.exports.save = (req, res) => {
	let compositionData = {
		userID: req.body.userID,
		organizationID: req.body.organizationID,
		encounterDate: req.body.encounterDate,
		encounterType: req.body.encounterType,
		document: req.body.document,
		isTransfer: req.body.isTransfer,
	};

	const newComposition = new Composition(compositionData);
	newComposition.save(async (err) => {
		if (err) {
			console.log("composition resource save error :", err);
			res.status(400).json({
				success: false,
				message: "there are something error",
			});
		}

		const privateKey = fs.readFileSync("./private.key", "utf8");
		// console.log(privateKey);

		var issuer = "A Hospital";
		var subject = "phr@a_hospital.org";
		var audience = "https://localhost:9100";
		var signOptions = {
			issuer: issuer,
			subject: subject,
			audience: audience,
			expiresIn: 60,
			algorithm: "RS256", // RSASSA [ "RS256", "RS384", "RS512" ]
		};
		// expire time = 60초 * 15 = 15분
		// const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, req.app.get(process.env.PRIVATE_KEY), { expiresIn: 60 * 15 });
		// const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.PRIVATE_KEY, signOptions);
		const token = jwt.sign({ userId: req.body.userId }, privateKey, signOptions);

		// console.log(token);
		process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

		const config = {
			method: "post",
			url: "https://localhost:9100/cds-services/crs",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${token}`,
			},
			data: {
				hookInstance: "123456789",
				fhirServer: "",
				hook: "patient-view",
				fhirAuthorization: {
					access_token: "",
					token_type: "Bearer",
					expire_in: 300,
					scope: "patient/Patient.read patient/Observation.read",
					subject: "cds-service4",
				},
				context: {
					patientId: compositionData.userId,
				},
				prefetch: {
					patientToGreet: JSON.parse(compositionData.compositionResource),
				},
			},
			withCredentials: true,
		};

		await axios(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				// composition = response.data;
				const card = JSON.stringify(response.data);

				res.status(200).json({
					message: "composition resource is saved",
					cards: card,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

// const sendDocument = async (documents) => {
// 	// let cards = [];
// 	// console.log(1);
// 	// documents.map(async (document) => {
// 	// 	console.log(2);
// 	// 	const privateKey = fs.readFileSync("./key.pem", "utf8");
// 	// 	// console.log(0, "privateKey", privateKey);
// 	// 	var issuer = "PHR App";
// 	// 	var subject = "phr@healthdata.com";
// 	// 	var audience = "https://localhost:5000";
// 	// 	var signOptions = {
// 	// 		issuer: issuer,
// 	// 		subject: subject,
// 	// 		audience: audience,
// 	// 		expiresIn: 60,
// 	// 		algorithm: "RS256", // RSASSA [ "RS256", "RS384", "RS512" ]
// 	// 	};
// 	// 	// console.log(1, "signOptions", signOptions);
// 	// 	// expire time = 60초 * 15 = 15분
// 	// 	// const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, req.app.get(process.env.PRIVATE_KEY), { expiresIn: 60 * 15 });
// 	// 	// const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.PRIVATE_KEY, signOptions);
// 	// 	// console.log(2, document.userID);
// 	// 	const token = jwt.sign({ userId: document.userID }, privateKey, signOptions);
// 	// 	// console.log(3, token);
// 	// 	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// 	// 	const send_config = {
// 	// 		method: "post",
// 	// 		url: "https://localhost:5000/cds-services/crs",
// 	// 		headers: {
// 	// 			"Content-Type": "application/x-www-form-urlencoded",
// 	// 			Authorization: `Bearer ${token}`,
// 	// 		},
// 	// 		data: {
// 	// 			hookInstance: "123456789",
// 	// 			fhirServer: "",
// 	// 			hook: "patient-view",
// 	// 			fhirAuthorization: {
// 	// 				access_token: "",
// 	// 				token_type: "Bearer",
// 	// 				expire_in: 300,
// 	// 				scope: "patient/Patient.read patient/Observation.read",
// 	// 				subject: "cds-service4",
// 	// 			},
// 	// 			context: {
// 	// 				patientId: document.userID,
// 	// 			},
// 	// 			prefetch: {
// 	// 				patientToGreet: document.document,
// 	// 			},
// 	// 		},
// 	// 		withCredentials: true,
// 	// 	};
// 	// 	// console.log(4, send_config);
// 	// 	console.log(3);
// 	// 	axios(send_config)
// 	// 		.then(async (response) => {
// 	// 			console.log(4);
// 	// 			// console.log(JSON.stringify(response.data));
// 	// 			// composition = response.data;
// 	// 			// cards.push(JSON.stringify(response.data));
// 	// 			cards.push(response.data);
// 	// 			console.log(5);
// 	// 			Documents.updateOne({ _id: document._id }, { isTransfer: !document.isTransfer }, (err, docs) => {
// 	// 				console.log(6);
// 	// 				if (err) {
// 	// 					console.log("document update error :", err);
// 	// 					res.status(400).json({
// 	// 						success: false,
// 	// 						message: "there are something error",
// 	// 					});
// 	// 				}
// 	// 				// console.log(docs);
// 	// 			});
// 	// 			console.log(7);
// 	// 		})
// 	// 		.catch((err) => {
// 	// 			console.log(err);
// 	// 		});
// 	// 	console.log(8);
// 	// });
// 	// console.log(9);
// 	// resolve(cards);
// };

const getToken = (userID, organizationID) =>
	new Promise((resolve, reject) => {
		Token.findOne({ userID: userID, organizationID: organizationID }, (err, token) => {
			if (err) {
				reject(err);
			}

			resolve(token);
		});
	});

const getFhirServerURL = (id) =>
	new Promise((resolve, reject) => {
		Organization.findOne({ id: id }, (err, organization) => {
			if (err) {
				reject(err);
			}

			resolve(organization);
		});
	});

const setStatus = (documentID, status) =>
	new Promise((resolve, reject) => {
		Documents.updateOne({ _id: documentID }, { isTransfer: !status }, (err, docs) => {
			if (err) {
				console.log("document update error :", err);
				return reject(err);
			}
			return resolve(docs);
		});
	});

module.exports.update = async (req, res) => {
	const documents = req.body;

	let errorStatus = 0;
	let errorMessage;
	let cards = [];
	let card;
	const privateKey = fs.readFileSync("./key.pem", "utf8");

	for (let i = 0; i < documents.length; i++) {
		process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

		const access_token = await getToken(documents[i].userID, documents[i].organizationID);
		const organization = await getFhirServerURL(documents[i].organizationID);

		// console.log(i, "access_token", access_token.token);

		const private_claim = {
			hookInstance: util.getUid(64),
			fhirServer: organization.fhirURL,
			hook: "document donation hook",
			fhirAuthorization: {
				access_token: access_token.token,
				token_type: "Bearer",
				expire_in: 60,
				scope: "Bundle.read",
				subject: "cds-service4",
			},
			context: {
				userID: documents[i].userID,
				documentID: documents[i].documentID,
				organizationID: documents[i].organizationID,
			},
			prefetch: {
				document: `/Composition/${documents[i].documentID}/$document`,
			},
		};
		console.log(1, private_claim);

		var issuer = "PHR App";
		var subject = "phr@healthdata.com";
		var audience = "https://localhost:5000";
		var signOptions = {
			issuer: issuer,
			subject: subject,
			audience: audience,
			expiresIn: 60,
			algorithm: "RS256", // RSASSA [ "RS256", "RS384", "RS512" ]
		};
		const token = jwt.sign(private_claim, privateKey, signOptions);

		const send_config = {
			method: "post",
			url: "https://localhost:5000/sharing",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		};

		// console.log(2, send_config);

		await axios(send_config)
			.then(async (response) => {
				cards.push(response.data);
				card = response.data;

				await setStatus(documents[i]._id, documents[i].isTransfer);
			})
			.catch((err) => {
				console.log(err);
				errorStatus = 1;
				errorMessage = {
					message: i + "th stop",
					err: err,
				};
				res.status(500).json({
					status: "error",
					message: errorMessage,
				});
			});
	}

	if (!errorStatus) {
		console.log(errorStatus);
		res.status(200).json({
			message: "document is sended and saved",
			card_length: cards.length,
			card: card,
		});
	}
};

module.exports.document = async (req, res) => {
	// console.log(req.body);
	await Documents.find(
		{
			documentID: req.body.documentID,
			userID: req.body.userID,
			organizationID: req.body.organizationID,
		},
		async (err, document) => {
			if (err) {
				res.status(404).json({
					message: "there are something error in composition",
				});
			} else {
				await res.status(200).json({
					document,
				});
			}
		}
	);
};

module.exports.documents = (req, res) => {
	// console.log(req.body);
	Documents.find({ userID: req.body.userID }, (err, documents) => {
		if (err) {
			res.status(400).json({
				message: "there are something error in composition",
			});
		}

		// console.log(documents.length);

		res.status(200).json({
			message: "composition resources are selected",
			length: documents.length,
			documents,
		});
	}).sort({ documentID: 1 });
};
