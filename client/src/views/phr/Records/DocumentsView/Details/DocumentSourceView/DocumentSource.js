/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
	// Box,
	// Chip,
	Card,
	CardContent,
	// Grid,
	// Typography,
	makeStyles,
	CardHeader,
} from "@material-ui/core";
// import Markdown from 'react-markdown/with-html';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
import ReactJson from "react-json-view";
// import axios from 'axios';

const useStyles = makeStyles(() => ({
	root: {},
	// markdown: {
	//   fontFamily: theme.typography.fontFamily,
	//   '& p': {
	//     marginBottom: theme.spacing(2)
	//   }
	// }
}));

// eslint-disable-next-line object-curly-newline
function DocumentSource({ className, url, ...rest }) {
	const classes = useStyles();
	const document = useSelector((state) => state.document.document);
	// console.log(document);
	// if (!document) {
	// 	return <Redirect to="/phr/records/categorization" />;
	// }

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader title={document.entry[0].resource.type.coding[0].display} />
			<CardContent>
				{/* <Box mt={3}> */}
				<ReactJson src={document} theme="monokai" />
				{/* </Box> */}
			</CardContent>
		</Card>
	);
}

DocumentSource.propTypes = {
	className: PropTypes.string,
	url: PropTypes.string,
};

export default DocumentSource;
