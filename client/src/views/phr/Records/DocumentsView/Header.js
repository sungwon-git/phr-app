/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
	Breadcrumbs,
	// Button,
	Grid,
	Link,
	// SvgIcon,
	Typography,
	makeStyles,
} from "@material-ui/core";
// import { Edit as EditIcon } from 'react-feather';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
	root: {},
	actionIcon: {
		marginRight: theme.spacing(1),
	},
}));

function Header({ className, document, ...rest }) {
	const classes = useStyles();
	// console.log(document);
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
					<Typography variant="body1" color="textPrimary">
						Document
					</Typography>
				</Breadcrumbs>
				<Typography variant="h3" color="textPrimary">
					{document.entry[0].resource.type.coding[0].display}
				</Typography>
			</Grid>
		</Grid>
	);
}

Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
