import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, Card, CardHeader, Divider, makeStyles } from "@material-ui/core";
// import GenericMoreButton from "src/components/GenericMoreButton";
import Chart from "./Chart";
// import useIsMountedRef from "src/hooks/useIsMountedRef";

const useStyles = makeStyles(() => ({
	root: {},
	chart: {
		height: 400,
	},
}));

function DocumentStats({ className, ...rest }) {
	const classes = useStyles();
	// const isMountedRef = useIsMountedRef();
	const organizations = useSelector((state) => state.organizations.organizations);
	const documents = useSelector((state) => state.documents.documents);

	console.log("document stats ", documents);
	if (!documents) {
		return null;
	}

	const labels = [];
	organizations.map((organization) => {
		labels.push(organization.title);
	});

	const stats = [];
	for (let i = 0; i < organizations.length; i++) {
		let num = 0;
		for (let j = 0; j < documents.length; j++) {
			if (organizations[i].id === documents[j].organizationID) {
				num++;
			}
		}
		// console.log(num);
		stats.push(num);
	}

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			{/* <CardHeader action={<GenericMoreButton />} title="Financial Stats" /> */}
			<CardHeader title="Documents Stats" />
			<Divider />
			<PerfectScrollbar>
				<Box minWidth={700} pt={4} pr={2} pl={2}>
					{/* <Chart className={classes.chart} data={stats} labels={labels} /> */}
					<Chart className={classes.chart} data={stats} labels={labels} />
				</Box>
			</PerfectScrollbar>
		</Card>
	);
}

DocumentStats.propTypes = {
	className: PropTypes.string,
};

export default DocumentStats;
