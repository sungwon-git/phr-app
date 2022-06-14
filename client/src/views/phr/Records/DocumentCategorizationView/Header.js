import React from "react";
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
					<Typography variant="body1" color="textPrimary">
						Catergorized Document
					</Typography>
				</Breadcrumbs>
			</Grid>
			{/* <Grid item>
				<Button color="secondary" variant="contained" component={RouterLink} to="/app/management/customers/1/edit">
					<SvgIcon fontSize="small" className={classes.actionIcon}>
						<EditIcon />
					</SvgIcon>
					Edit
				</Button>
			</Grid> */}
		</Grid>
	);
}

Header.propTypes = {
	className: PropTypes.string,
	// customer: PropTypes.object.isRequired,
};

export default Header;
