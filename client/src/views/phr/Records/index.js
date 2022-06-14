import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
// import CustomerActivity from "./CustomerActivity";
import DocumentsSegmentation from "./DocumentSegmentation";
import DocumentStats from "./DocumentStats";

import Header from "./Header";
import Documents from "./Documents";
// import LatestOrders from "./LatestOrders";
// import axios from "src/utils/axios";
import Axios from "axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import Overview from "./Overview";
import TotalDocuments from "./TotalDocuments";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	container: {
		[theme.breakpoints.up("lg")]: {
			paddingLeft: 64,
			paddingRight: 64,
		},
	},
}));

function Records() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isMountedRef = useIsMountedRef();
	let organizations = useSelector((state) => state.organizations.organizations);
	const organization = useSelector((state) => state.organization.organization);
	const [documents, setDocuments] = useState([]);

	const { user } = useSelector((state) => state.account);
	const userID = user.userID;
	// console.log(userID, user);

	console.log(112, documents);

	// console.log("organizations", organizations);
	// console.log("organization", organization);

	const getDocuments = useCallback(async () => {
		const phr_server = "http://localhost:3100";
		const data = {
			userID: userID,
		};
		const config = {
			method: "post",
			url: `${phr_server}/documents`,
			data: data,
		};

		await Axios(config)
			.then(async (response) => {
				console.log("get documents", config);
				if (isMountedRef.current) {
					console.log(response.data.documents);
					setDocuments(response.data.documents);
				}
			})
			.catch((err) => {
				console.log(0, err);
			});
	}, [isMountedRef]);

	const getOrganizations = useCallback(async () => {
		await Axios.get("http://localhost:3100/organizations").then(async (response) => {
			if (isMountedRef.current) {
				// console.log(response.data);
				organizations = response.data.organizations;
				await dispatch({ type: "SET_ORGANIZATIONS", payload: { organizations } });
				// setOrganizations();
			}
		});
	}, [isMountedRef]);

	useEffect(() => {
		getDocuments();
	}, [getDocuments]);

	if (!organizations) {
		// return <Redirect to="/phr" />;
		getOrganizations();
	}

	if (documents.length > 0) {
		dispatch({ type: "SET_DOCUMENTS", payload: { documents } });
	} else {
		dispatch({ type: "SET_DOCUMENTS", payload: {} });
	}

	const documents_4578 = documents.filter((result) => result.organizationID === "4578");
	const documents_4596 = documents.filter((result) => result.organizationID === "4596");
	const documents_48651 = documents.filter((result) => result.organizationID === "48651");

	return (
		<Page className={classes.root} title="Dashboard Alternative">
			<Container maxWidth={false} className={classes.container}>
				<Header />
				<Grid container spacing={3}>
					{documents_4578.length > 0 && (
						<Grid item lg={3} sm={6} xs={12}>
							<Overview id="4578" />
						</Grid>
					)}
					{documents_4596.length > 0 && (
						<Grid item lg={3} sm={6} xs={12}>
							<Overview id="4596" />
						</Grid>
					)}
					{documents_48651.length > 0 && (
						<Grid item lg={3} sm={6} xs={12}>
							<Overview id="48651" />
						</Grid>
					)}

					<Grid item lg={3} sm={6} xs={12}>
						<TotalDocuments length={documents.length} />
					</Grid>

					<Grid item lg={8} xl={6} xs={12}>
						<DocumentStats />
					</Grid>
					<Grid item lg={4} xl={6} xs={12}>
						<DocumentsSegmentation />
					</Grid>
					{/* <Grid item lg={8} xl={9} xs={12}> */}
					<Grid item xs={12}>
						<Documents />
					</Grid>

					{/* <Grid item lg={8} xs={12}>
						<LatestOrders />
					</Grid> */}
					{/* <Grid item lg={4} xs={12}>
						<CustomerActivity />
					</Grid>
					<Grid item lg={8} xs={12}>
						<MostProfitableProducts />
					</Grid>
					<Grid item lg={4} xs={12}>
						<TopReferrals />
					</Grid> */}
				</Grid>
			</Container>
		</Page>
	);
}

export default Records;
