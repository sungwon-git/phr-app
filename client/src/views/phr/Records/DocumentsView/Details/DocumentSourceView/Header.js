/* eslint-disable arrow-parens */
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Breadcrumbs, Button, Grid, Link, SvgIcon, Typography, makeStyles } from "@material-ui/core";
import { Edit as EditIcon } from "react-feather";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
	root: {},
	actionIcon: {
		marginRight: theme.spacing(1),
	},
}));

function Header({ className, ...rest }) {
	const classes = useStyles();
	const document = useSelector((state) => state.document.document);
	// console.log('view header', composition.entry);
	// const entries = composition.entry;
	// let patientId = "";
	// let compositionId = "";
	// for (let i = 0; i < entries.length; i++) {
	// 	// console.log('view header', entries[i].resource.resourceType);
	// 	if (entries[i].resource.resourceType === "Patient") {
	// 		patientId = entries[i].resource.id;
	// 	}

	// 	if (entries[i].resource.resourceType === "Composition") {
	// 		compositionId = entries[i].resource.id;
	// 	}
	// }

	// console.log('view header', patientId);

	return (
		<Grid container spacing={3} justify="space-between" className={clsx(classes.root, className)} {...rest}>
			<Grid item>
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					<Link variant="body1" color="inherit" to="/phr" component={RouterLink}>
						PHR
					</Link>
					<Link variant="body1" color="inherit" to="/phr/records" component={RouterLink}>
						Document Dashboard
					</Link>
					<Link variant="body1" color="inherit" to="/phr/records/categorization" component={RouterLink}>
						Categorized Document
					</Link>
					<Link variant="body1" color="inherit" to={`/phr/record/${document.id}`} component={RouterLink}>
						Document
					</Link>
					<Typography variant="body1" color="textPrimary">
						Document Source View
					</Typography>
				</Breadcrumbs>
				<Typography variant="h3" color="textPrimary">
					{/* {customer.fullName} */}
					Source - Bundle Resources
				</Typography>
			</Grid>
			<Grid item>
				<Button color="secondary" variant="contained" component={RouterLink} to={`/phr/record/${document.id}/preview`}>
					<SvgIcon fontSize="small" className={classes.actionIcon}>
						<EditIcon />
					</SvgIcon>
					Preview
				</Button>
			</Grid>
		</Grid>
	);
}

Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
