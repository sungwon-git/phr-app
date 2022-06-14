const Organization = require("../models/organizations");

module.exports.save = (req, res) => {
	const organizations = req.body;
	// console.log(organizations);

	organizations.map((organization) => {
		// console.log(2, hospital);
		var new_organization = {
			order: organization.order,
			id: organization.id,
			title: organization.title,
			media: organization.media,
			address: organization.address,
			postalCode: organization.postalCode,
			telecom: organization.telecom,
			fhirURL: organization.fhirURL,
			oauth2URL: organization.oauth2URL,
			tokenURL: organization.tokenURL,
			clientID: organization.clientID,
			clientSecret: organization.clientSecret,
			responseType: organization.responseType,
			redirectURI: organization.redirectURI,
		};

		// [
		// 	{
		// 		"order": "1",
		// 		"id": "4578",
		// 		"title": "Kaiser Permanente Manteca Medical Center",
		// 		"media": "/static/images/organizations/organization_1.jpg",
		// 		"address": "1950 W Main St Oxford, AL",
		// 		"postalCode": "13045",
		// 		"telecom": "02-7364-6367",
		// 		"fhirURL": "http://localhost:4000/4_0_0",
		// 		"oauth2URL": "https://localhost:8000/oauth2/authorize",
		// 		"tokenURL": "",
		// 		"clientID": "RIOGVKNtnVQN1vpm",
		// 		"clientSecret": "",
		// 		"responseType": "code",
		// 		"redirectURI": "http://localhost:3000/oauth2"
		// 	},
		// 	{
		// 		"order": "2",
		// 		"id": "4596",
		// 		"title": "Kingsbrook Jewish Medical Center",
		// 		"media": "/static/images/organizations/organization_2.jpg",
		// 		"address": "3222 State Rt 11 Framingham, AL",
		// 		"postalCode": "36426",
		// 		"telecom": "02-5222-8872",
		// 		"fhirURL": "http://localhost:4100/4_0_0",
		// 		"oauth2URL": "https://localhost:8000/oauth2/authorize",
		// 		"tokenURL": "",
		// 		"clientID": "RIOGVKNtnVQN1vpm",
		// 		"clientSecret": "",
		// 		"responseType": "code",
		// 		"redirectURI": "http://localhost:3000/oauth2"
		// 	},
		// 	{
		// 		"order": "3",
		// 		"id": "48651",
		// 		"title": "Baystate Medical Center",
		// 		"media": "/static/images/organizations/organization_3.jpg",
		// 		"address": "742 Main Street Fairhope, AL",
		// 		"postalCode": "35570",
		// 		"telecom": "02-3386-2757",
		// 		"fhirURL": "http://localhost:4200/4_0_0",
		// 		"oauth2URL": "https://localhost:8000/oauth2/authorize",
		// 		"tokenURL": "",
		// 		"clientID": "RIOGVKNtnVQN1vpm",
		// 		"clientSecret": "",
		// 		"responseType": "code",
		// 		"redirectURI": "http://localhost:3000/oauth2"
		// 	}
		// ]

		var new_item = new Organization(new_organization);
		new_item.save(function (err, organization) {
			if (err) {
				res.status(204).json({
					message: "organization insert fail",
				});
			}
		});
	});
	res.status(200).json({
		message: "organization insert success",
	});
};

module.exports.organizations = (req, res) => {
	Organization.find({}, (err, organizations) => {
		if (err) {
			res.status(409).json({
				message: "organizations select fail",
			});
		}
		// console.log(hospitals);
		res.status(200).json({
			message: "success",
			organizations,
		});
	}).sort({ order: 1 });
};

module.exports.organization = (req, res) => {
	const organizationID = req.params.id;
	// console.log(organizationID);

	Organization.findOne({ id: organizationID }, function (err, organization) {
		res.status(200).json({
			message: "success",
			organization,
		});
	});
};
