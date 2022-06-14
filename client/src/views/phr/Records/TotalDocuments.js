import React from "react";
// import { useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Box, Card, Typography, makeStyles } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.secondary.contrastText,
		backgroundColor: theme.palette.secondary.main,
		padding: theme.spacing(3),
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	avatar: {
		backgroundColor: theme.palette.secondary.contrastText,
		color: theme.palette.secondary.main,
		height: 48,
		width: 48,
	},
}));

function TotalDocuments({ className, length, ...rest }) {
	const classes = useStyles();
	// const documents = useSelector((state) => state.documents.documents);
	// const data = {
	//   value: '25.50',
	//   currency: '$'
	// };

	// console.log(documents);
	// if (!documents) {
	// 	return null;
	// }

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<Box flexGrow={1}>
				<Typography color="inherit" component="h3" gutterBottom variant="overline">
					Total Counts
				</Typography>
				<Box display="flex" alignItems="center" flexWrap="wrap">
					{length > 1 ? (
						<Typography color="inherit" variant="h3">
							{length} Documents
						</Typography>
					) : (
						<Typography color="inherit" variant="h3">
							{length} Document
						</Typography>
					)}
				</Box>
			</Box>
			<Avatar className={classes.avatar} color="inherit">
				<AttachMoneyIcon />
			</Avatar>
		</Card>
	);
}

TotalDocuments.propTypes = {
	className: PropTypes.string,
};

export default TotalDocuments;
