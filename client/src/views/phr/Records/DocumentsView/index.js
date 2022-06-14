/* eslint-disable arrow-parens */
import React from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Header from "./Header";
import Details from "./Details";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

function DocumentsView({ match }) {
	const classes = useStyles();
	const documents = useSelector((state) => state.documents.documents);

	// console.log(1, documents);

	if (!documents) {
		return <Redirect to="/phr/records/categorization" />;
	}

	const document = documents.filter((result) => result.documentID === match.params.id);
	// console.log(11, match.params.id, document);
	return (
		<Page className={classes.root} title="Customer Details">
			<Container maxWidth={false}>
				<Header document={document[0].document} />

				<Box mt={3}>
					<Details document={document} />
				</Box>
			</Container>
		</Page>
	);
}

export default DocumentsView;
