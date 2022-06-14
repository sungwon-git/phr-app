import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Axios from "axios";
// import moment from "moment";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardMedia,
	Divider,
	// Grid,
	// IconButton,
	Link,
	// SvgIcon,
	// Tooltip,
	Typography,
	colors,
	makeStyles,
} from "@material-ui/core";
// import { Rating } from "@material-ui/lab";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import { Users as UsersIcon } from "react-feather";
import GetAppIcon from "@material-ui/icons/GetApp";
// import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import getInitials from "src/utils/getInitials";

const useStyles = makeStyles((theme) => ({
	root: {},
	media: {
		height: 200,
		backgroundColor: theme.palette.background.dark,
	},
	likedButton: {
		color: colors.red[600],
	},
	subscribersIcon: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(1),
	},
	getAppIcon: {
		marignRight: theme.spacing(1),
	},
}));

function OrganizationCard({ organization, handleProgress, handleReceivedDocumentCount, className, handleToken, ...rest }) {
	const classes = useStyles();

	const handleLoginButtonClick = (e) => {
		console.log("handleLoginButtonClick", organization);
		localStorage.setItem("organization", JSON.stringify(organization));
	};

	const handleDownloadButtonClick = async (event) => {
		handleProgress(true);
		const oauth2 = JSON.parse(localStorage.getItem("oauth2Token"));
		// console.log(oauth2);
		console.log("organization", organization);

		const fhir_server = organization.fhirURL;
		const organizationID = organization.id;
		const userID = oauth2.patientNumber;
		const token = oauth2.value;

		// console.log(fhir_server);
		// console.log(0, oauth2.organizationID);
		// console.log(1, event.currentTarget.value);
		// // console.log(userID);
		// console.log(token);

		if (oauth2.organizationID !== event.currentTarget.value) {
			console.log("handleLoginButtonClick", organization);
			localStorage.setItem("organization", JSON.stringify(organization));
			handleProgress(false);
			handleReceivedDocumentCount(0);
			handleToken(
				`${organization.oauth2URL}?client_id=${organization.clientID}&response_type=${organization.responseType}&redirect_uri=${organization.redirectURI}`
			);
		} else {
			const config = {
				method: "get",
				url: `${fhir_server}/Composition/$documents/${userID}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			};

			console.log(12, config);

			await Axios(config)
				.then(async (response) => {
					// console.log(response.data);
					const documents = response.data;
					// console.log(12, documents);
					for (let i = 0; i < documents.length; i++) {
						// console.log(document.id);
						const phr_server = "http://localhost:3100";

						let data = {
							documentID: documents[i].id,
							userID: userID,
							organizationID: organizationID,
						};

						let phr_config = {
							method: "post",
							url: `${phr_server}/document`,
							data: data,
						};
						// console.log(i);
						await Axios(phr_config)
							.then(async (phr_response) => {
								// console.log(phr_response);
								// console.log(phr_response.data.document.length);
								if (phr_response.data.document.length < 1) {
									const insert_data = {
										documentID: documents[i].id,
										userID: userID,
										organizationID: organizationID,
										document: documents[i],
										isTransfer: false,
									};

									const insert_config = {
										method: "post",
										url: `${phr_server}/documents/insert`,
										data: insert_data,
									};
									// console.log(insert_data, insert_config);

									await Axios(insert_config).then((insert_response) => {
										// console.log(insert_response.data);
									});
								}
								handleProgress(false);
							})
							.catch((err) => {
								console.log(err);
							});
					}
					handleReceivedDocumentCount(documents.length);
				})
				.catch((error) => {
					console.log("fhir server error", error);
				});
		}
	};

	// console.log("organizationCard", organization);

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<Box p={3}>
				<CardMedia className={classes.media} image={organization.media} />
				<Box display="flex" alignItems="center" mt={2}>
					<Avatar alt="Author">{getInitials(organization.title)}</Avatar>
					<Box ml={2}>
						<Link color="textPrimary" component={RouterLink} to="#" variant="h5">
							{organization.title}
						</Link>
					</Box>
				</Box>
			</Box>
			<Box pb={2} px={3}>
				<Typography color="textSecondary" variant="body2">
					Address: {organization.address}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					Postal Code: {organization.postalCode}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					Telecom: {organization.telecom}
				</Typography>
			</Box>
			<Divider />
			<CardActions>
				<Button
					fullWidth
					onClick={handleLoginButtonClick}
					href={`${organization.oauth2URL}?client_id=${organization.clientID}&response_type=${organization.responseType}&redirect_uri=${organization.redirectURI}`}
				>
					<AccountCircle className={classes.getAppIcon} />
					Log in
				</Button>
			</CardActions>
			<Divider />
			<CardActions>
				<Button fullWidth onClick={handleDownloadButtonClick} value={organization.id}>
					<GetAppIcon className={classes.getAppIcon} />
					Download
				</Button>
			</CardActions>
		</Card>
	);
}

OrganizationCard.propTypes = {
	className: PropTypes.string,
	organization: PropTypes.object.isRequired,
};

export default OrganizationCard;
