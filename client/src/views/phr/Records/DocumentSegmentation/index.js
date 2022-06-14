import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Card, CardHeader, Divider, Typography, makeStyles } from "@material-ui/core";
// import GenericMoreButton from "src/components/GenericMoreButton";
// import axios from "src/utils/axios";
// import useIsMountedRef from "src/hooks/useIsMountedRef";
import Chart from "./Chart";

const useStyles = makeStyles((theme) => ({
	root: {},
	item: {
		textAlign: "center",
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: theme.spacing(3, 2),
		"&:not(:last-of-type)": {
			borderRight: `1px solid ${theme.palette.divider}`,
		},
	},
}));

function DocumentsSegmentation({ className, ...rest }) {
	const classes = useStyles();
	const organizations = useSelector((state) => state.organizations.organizations);
	const documents = useSelector((state) => state.documents.documents);
	// const isMountedRef = useIsMountedRef();
	const [earnings, setEarnings] = useState(null);

	const getEarnings = useCallback(() => {
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
			num = Math.round((num / documents.length) * 100);
			stats.push(num);
		}

		const earnings = {
			datasets: [
				{
					data: stats,
					backgroundColor: ["#3d72eb", "#4b9e86", "#b658f5"],
				},
			],
			labels: labels,
		};
		setEarnings(earnings);
	}, [documents, organizations]);

	useEffect(() => {
		getEarnings();
	}, [getEarnings]);

	if (!earnings) {
		return null;
	}

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			{/* <CardHeader action={<GenericMoreButton />} title="Documents Segmentation" /> */}
			<CardHeader title="Documents Segmentation" />
			<Divider />
			<Box p={3} position="relative" minHeight={320}>
				<Chart data={earnings} />
			</Box>
			<Divider />
			<Box display="flex">
				{earnings.labels.map((label, i) => (
					<div key={label} className={classes.item}>
						<Typography variant="h4" color="textPrimary">
							{earnings.datasets[0].data[i]}%
						</Typography>
						<Typography variant="overline" color="textSecondary">
							{label}
						</Typography>
					</div>
				))}
			</Box>
		</Card>
	);
}

DocumentsSegmentation.propTypes = {
	className: PropTypes.string,
};

export default DocumentsSegmentation;
