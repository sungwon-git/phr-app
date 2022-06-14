// import moment from "moment";
import mock from "src/utils/mock";

mock.onGet("/api/organizations/organizations").reply(200, {
	organizations: [
		{
			id: "5e8dcef8f95685ce21f16f3e",
			title: "Kaiser Permanente Manteca Medical Center",
			media: "/static/images/organizations/organization_1.jpg",
			address: "Address: 1950 W Main St Oxford, AL",
			postalCode: "Postal Code: 13045",
			telecom: "Telecom: 02-7364-6367",
			fhir: "http://localhost:4000/4_0_0",
			oauth2URL: "https://localhost:8000/oauth2/authorize",
			clientID: "RIOGVKNtnVQN1vpm",
			responseType: "code",
			redirectURI: "http://localhost:3000/oauth2",
		},
		{
			id: "5e8dcef8f95685ce21f16f3f",
			title: "Kingsbrook Jewish Medical Center",
			media: "/static/images/organizations/organization_2.jpg",
			address: "Address: 3222 State Rt 11 Framingham, AL",
			postalCode: "Postal Code: 36426",
			telecom: "Telecom: 02-5222-8872",
			fhir: "http://localhost:4100/4_0_0",
			oauth2URL: "https://localhost:8000/oauth2/authorize",
			clientID: "RIOGVKNtnVQN1vpm",
			responseType: "code",
			redirectURI: "http://localhost:3000/oauth2",
		},
		{
			id: "48651",
			title: "Baystate Medical Center",
			media: "/static/images/organizations/organization_3.jpg",
			address: "Address: 742 Main Street Fairhope, AL",
			postalCode: "Postal Code: 35570",
			telecom: "Telecom: 02-3386-2757",
			fhir: "http://localhost:4200/4_0_0",
			oauth2URL: "https://localhost:8000/oauth2/authorize",
			clientID: "RIOGVKNtnVQN1vpm",
			responseType: "code",
			redirectURI: "http://localhost:3000/oauth2",
		},
		// 		{
		// 			id: "5e8dcef8f95685ce21f16f3d",
		// 			title: "Kaiser Permanente Manteca Medical Center",
		// 			media: "/static/images/organizations/organization_1.jpg",
		// 			description: `
		//       Address: 1950 W Main St Oxford, AL 13045
		//       Telecom: 02-7364-6367
		//       `,
		// 			author: {
		// 				// id: "5e887b7602bdbc4dbb234b27",
		// 				// name: "Kaiser Permanente Manteca Medical Center",
		// 				// avatar: "/static/images/avatars/avatar_5.png",
		// 			},
		// 			type: "Full-Time",
		// 			location: "Europe",
		// 			technology: "Vue JS",
		// 			isLiked: true,
		// 			likes: 7,
		// 			rating: 5,
		// 			subscribers: 2,
		// 			updatedAt: moment()
		// 				.subtract(24, "minutes")
		// 				.toDate()
		// 				.getTime(),
		// 		},
		// 		{
		// 			id: "5e8dcf076c50b9d8e756a5a2",
		// 			title: "Dashboard Design",
		// 			media: "/static/images/projects/project_2.png",
		// 			description: `
		// We're looking for experienced Developers and Product Designers to
		// come aboard and help us build succesful businesses through software.
		//       `,
		// 			author: {
		// 				id: "5e887d0b3d090c1b8f162003",
		// 				name: "Emilee Simchenko",
		// 				avatar: "/static/images/avatars/avatar_9.png",
		// 			},
		// 			type: "Full-Time",
		// 			location: "Europe",
		// 			technology: "Angular",
		// 			isLiked: false,
		// 			likes: 12,
		// 			rating: 4.5,
		// 			subscribers: 3,
		// 			updatedAt: moment()
		// 				.subtract(1, "hour")
		// 				.toDate()
		// 				.getTime(),
		// 		},
		// 		{
		// 			id: "5e8dcf105a6732b3ed82cf7a",
		// 			title: "Ten80 Web Design",
		// 			media: "/static/images/projects/project_3.png",
		// 			description: `
		// We're looking for experienced Developers and Product Designers to
		// come aboard and help us build succesful businesses through software.
		//       `,
		// 			author: {
		// 				id: "5e88792be2d4cfb4bf0971d9",
		// 				name: "Elliott Stone",
		// 				avatar: "/static/images/avatars/avatar_10.png",
		// 			},
		// 			type: "Full-Time",
		// 			location: "Europe",
		// 			technology: "Ember JS",
		// 			isLiked: true,
		// 			likes: 18,
		// 			rating: 4.7,
		// 			subscribers: 8,
		// 			updatedAt: moment()
		// 				.subtract(16, "hour")
		// 				.toDate()
		// 				.getTime(),
		// 		},
		// 		{
		// 			id: "5e8dcf1cc7155d0e947dc27f",
		// 			title: "Neura e-commerce UI Kit",
		// 			media: "/static/images/projects/project_4.png",
		// 			description: `
		// We're looking for experienced Developers and Product Designers to
		// come aboard and help us build succesful businesses through software.
		//       `,
		// 			author: {
		// 				id: "5e8877da9a65442b11551975",
		// 				name: "Shen Zhi",
		// 				avatar: "/static/images/avatars/avatar_11.png",
		// 			},
		// 			type: "Full-Time",
		// 			location: "Europe",
		// 			technology: "Java Spring",
		// 			isLiked: false,
		// 			likes: 1,
		// 			rating: 2,
		// 			subscribers: 10,
		// 			updatedAt: moment()
		// 				.subtract(3, "days")
		// 				.toDate()
		// 				.getTime(),
		// 		},
		// 		{
		// 			id: "5e8dcf252313876001e83221",
		// 			title: "Administrator Dashboard",
		// 			media: "/static/images/projects/project_5.jpg",
		// 			description: `
		// We're looking for experienced Developers and Product Designers to
		// come aboard and help us build succesful businesses through software.
		//       `,
		// 			author: {
		// 				id: "5e887ac47eed253091be10cb",
		// 				name: "Cao Yu",
		// 				avatar: "/static/images/avatars/avatar_3.png",
		// 			},
		// 			type: "Full-Time",
		// 			location: "Europe",
		// 			technology: "Django",
		// 			isLiked: false,
		// 			likes: 7,
		// 			rating: 5,
		// 			subscribers: 2,
		// 			updatedAt: moment()
		// 				.subtract(7, "days")
		// 				.toDate()
		// 				.getTime(),
		// 		},
		// 		{
		// 			id: "5e8dcf4250d77c954b04902e",
		// 			title: "Kalli UI Kit",
		// 			media: "",
		// 			description: `
		// We're looking for experienced Developers and Product Designers to
		// come aboard and help us build succesful businesses through software.
		//       `,
		// 			author: {
		// 				id: "5e887b7602bdbc4dbb234b27",
		// 				name: "Anje Keizer",
		// 				avatar: "/static/images/avatars/avatar_5.png",
		// 			},
		// 			type: "Full-Time",
		// 			location: "Europe",
		// 			technology: "React JS",
		// 			isLiked: true,
		// 			likes: 4,
		// 			rating: 4.2,
		// 			subscribers: 12,
		// 			updatedAt: moment()
		// 				.subtract(8, "days")
		// 				.toDate()
		// 				.getTime(),
		// 		},
	],
});
