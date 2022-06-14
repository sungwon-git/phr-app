/* eslint-disable arrow-parens */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, makeStyles } from "@material-ui/core";

import DocumentInfo from "./DocumentInfo";
// import Emails from './Emails';
// import Invoices from './Invoices';
// import OtherActions from './OtherActions';

const useStyles = makeStyles(() => ({
	root: {},
}));

function Details({ className, document, ...rest }) {
	const classes = useStyles();
	// console.log(documents);

	return (
		<Grid className={clsx(classes.root, className)} container spacing={3} {...rest}>
			<Grid item lg={4} md={6} xl={3} xs={12} key={document.documentID}>
				<DocumentInfo document={document[0].document} />
			</Grid>
		</Grid>
	);
}

Details.propTypes = {
	className: PropTypes.string,
	document: PropTypes.array.isRequired,
};

export default Details;
