import React, { useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import qs from "query-string";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import Axios from "axios";

function OAuth2({ location }) {
	const isMountedRef = useIsMountedRef();
	const organization = JSON.parse(localStorage.getItem("organization"));

	// console.log(JSON.parse(organization));

	let { code } = qs.parse(location.search);
	// console.log("OAuth2's code ", code);

	const getToken = useCallback(async () => {
		const data = {
			code: code,
			grant_type: "authorization_code",
			redirect_uri: organization.redirectURI,
		};

		console.log(1);

		const client = Buffer.from(`${organization.clientID}:${organization.clientSecret}`, "utf8").toString("base64");

		console.log(2);
		const config = {
			method: "post",
			url: organization.tokenURL,
			headers: {
				Authorization: `Basic ${client}`,
			},
			data: data,
			withCredentials: true,
		};

		console.log(3, config);
		await Axios(config)
			.then(async (response) => {
				// if (isMountedRef.current) {
				console.log(4, response.data);
				localStorage.setItem("oauth2Token", JSON.stringify(response.data.access_token));

				console.log(5, response.data.access_token);
				const oauth2 = response.data.access_token;
				console.log(51, organization);

				const token_config = {
					method: "post",
					url: "http://localhost:3100/token/save",
					data: {
						userID: oauth2.patientNumber,
						organizationID: organization.id,
						token: oauth2.value,
					},
				};
				console.log(6, token_config);
				await Axios(token_config)
					.then((response) => {
						console.log(7, response);
					})
					.catch((err) => {
						console.log(8, err);
					});
				// }
			})
			.catch((err) => {
				console.log("error ", err);
			});
	}, [isMountedRef]);

	useEffect(() => {
		getToken();
	}, [getToken]);

	return <Redirect to="/phr" />;
	// return <div></div>;
}

export default OAuth2;
