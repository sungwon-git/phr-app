import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Divider, Tab, Tabs, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
// import axios from "src/utils/axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import Header from "./Header";
import CategorizedDocuments from "./CategorizedDocuments";
import { Redirect } from "react-router";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}));

function DocumentCategorizationView() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isMountedRef = useIsMountedRef();
	const [organizations, setOrganizations] = useState(useSelector((state) => state.organizations.organizations));
	// let organizations = useSelector((state) => state.organizations.organizations);
	const [documents, setDocuments] = useState(useSelector((state) => state.documents.documents));
	// const documents = useSelector((state) => state.documents.documents);
	const [currentTab, setCurrentTab] = useState("total");

	// const userID = "113610";
	const { user } = useSelector((state) => state.account);
	const userID = user.userID;

	// console.log(0, organizations);
	const getOrganizations = useCallback(() => {
		Axios.get("http://localhost:3100/organizations").then((response) => {
			if (isMountedRef.current) {
				// console.log(response.data);
				setOrganizations(response.data.organizations);
			}
		});
	}, [isMountedRef]);

	if (!organizations) {
		getOrganizations();
		// console.log(2, organizations);
		dispatch({ type: "SET_ORGANIZATIONS", payload: { organizations } });
	}

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
			.then((response) => {
				if (isMountedRef.current) {
					// console.log(response.data.documents);
					setDocuments(response.data.documents);
				}
			})
			.catch((err) => {
				console.log(0, err);
			});
	}, [isMountedRef]);

	if (!documents) {
		// console.log(11, documents);
		getDocuments();

		// console.log(12, documents);
	}

	// console.log(3, organizations);
	const tabs = [];
	if (organizations) {
		tabs.push({ value: "total", label: "Total" });

		organizations.map((organization) => {
			tabs.push({ value: organization.id, label: organization.title });
		});
	}

	const handleTabsChange = (event, value) => {
		setCurrentTab(value);
	};

	// console.log(13, documents);
	dispatch({ type: "SET_DOCUMENTS", payload: { documents } });

	return (
		<Page className={classes.root} title="Customer Details">
			<Container maxWidth={false}>
				<Header />
				<Box mt={3}>
					<Tabs onChange={handleTabsChange} scrollButtons="auto" value={currentTab} variant="scrollable" textColor="secondary" className={classes.tabs}>
						{tabs.map((tab) => (
							<Tab key={tab.value} label={tab.label} value={tab.value} />
						))}
					</Tabs>
				</Box>
				<Divider />
				<Box mt={3}>
					{currentTab === "total" && <CategorizedDocuments categorizedDocuments={documents} />}
					{currentTab === "4578" && <CategorizedDocuments categorizedDocuments={documents.filter((result) => result.organizationID === "4578")} />}
					{currentTab === "4596" && <CategorizedDocuments categorizedDocuments={documents.filter((result) => result.organizationID === "4596")} />}
					{currentTab === "48651" && <CategorizedDocuments categorizedDocuments={documents.filter((result) => result.organizationID === "48651")} />}
				</Box>
			</Container>
		</Page>
	);
}

export default DocumentCategorizationView;
