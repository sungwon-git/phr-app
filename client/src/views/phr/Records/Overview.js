import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Box, Card, Typography, makeStyles } from "@material-ui/core";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {
	// User as UserIcon,
	Users as UsersIcon,
} from "react-feather";
// import Label from "src/components/Label";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	label: {
		marginLeft: theme.spacing(1),
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		height: 48,
		width: 48,
	},
}));

function Overview({ className, id, ...rest }) {
	const classes = useStyles();
	const organizations = useSelector((state) => state.organizations.organizations);
	const documents = useSelector((state) => state.documents.documents);

	const organization = organizations.filter((result) => result.id === id);
	const document = documents.filter((result) => result.organizationID === id);
	// console.log(organization);

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<Box flexGrow={1}>
				<Typography component="h3" gutterBottom variant="overline" color="textSecondary">
					{organization[0].title}
				</Typography>
				<Box display="flex" alignItems="center" flexWrap="wrap">
					{document.length > 1 ? (
						<Typography variant="h3" color="textPrimary">
							{document.length} Documents
						</Typography>
					) : (
						<Typography variant="h3" color="textPrimary">
							{document.length} Document
						</Typography>
					)}
				</Box>
			</Box>
			<Avatar className={classes.avatar}>
				<UsersIcon />
			</Avatar>
		</Card>
	);
}

Overview.propTypes = {
	className: PropTypes.string,
};

export default Overview;
