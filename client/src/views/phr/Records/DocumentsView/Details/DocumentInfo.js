/* eslint-disable arrow-parens */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
// import axios from "axios";
import moment from "moment";
import {
	// Box,
	Button,
	Card,
	// CardHeader,
	CardActions,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
	Dialog,
	Link,
	makeStyles,
	DialogContent,
	// DialogContentText,
	DialogTitle,
	DialogActions,
} from "@material-ui/core";
// import Label from "src/components/Label";
// import DocumentMoreButton from "src/components/DocumentMoreButton";
import ReactJson from "react-json-view";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const useStyles = makeStyles((theme) => ({
	root: {},
	fontWeightMedium: {
		fontWeight: theme.typography.fontWeightMedium,
	},
	actionIcon: {
		marginRight: theme.spacing(1),
	},
}));

function DocumentInfo({ document, className, ...rest }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	// const title = `Document ID : ${document.id}`;
	// const encounterDate = moment(document.entry[0].resource.date).format("YYYY-MM-DD HH:mm:SS");
	const sections = document.entry[0].resource.section;

	// console.log(0, document);
	const [open, setOpen] = React.useState(false);
	const [resource, setResource] = React.useState();
	const [dialogTitle, setDialogTitle] = React.useState();
	// let url;
	// let resource;

	// console.log(document);
	useEffect(() => {
		dispatch({ type: "SET_DOCUMENT", payload: { document } });
	});

	const handleButtonClick = async (e) => {
		let resourceInfo = e.target.id;
		// console.log(1, resourceInfo);
		setDialogTitle(resourceInfo);

		const entries = document.entry;
		let fhir_baseURL = entries[0].fullUrl;
		fhir_baseURL = fhir_baseURL.split("/");
		fhir_baseURL = `${fhir_baseURL[0]}//${fhir_baseURL[2]}/${fhir_baseURL[3]}`;
		const fhir_url = `${fhir_baseURL}/${resourceInfo}`;
		const entry = entries.filter((result) => result.fullUrl === fhir_url);

		// console.log(0, entry[0]);
		setResource(entry[0].resource);

		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// console.log(5, document);
	// const title = `Care Record Summary`;

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			{/* <CardHeader action={<DocumentMoreButton />} title="Care Record Summary" /> */}
			{/* <CardHeader title="Care Record Summary" /> */}
			{/* <Divider /> */}

			<Table>
				<TableBody>
					<TableRow>
						<TableCell className={classes.fontWeightMedium}>Document ID</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								<Link color="inherit" id={document.entry[0].resource} variant="h6" onClick={handleButtonClick}>
									{document.entry[0].resource.id}
								</Link>
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={classes.fontWeightMedium}>Subject</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								<Link color="inherit" id={document.entry[0].resource.subject.reference} variant="h6" onClick={handleButtonClick}>
									{document.entry[1].resource.name[0].text}
								</Link>
							</Typography>
							{/* <Label color={document.id ? "success" : "error"}>{document.id ? "Success" : "Fail"}</Label> */}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={classes.fontWeightMedium}>Encounter Date</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{moment(document.entry[0].resource.date).format("YYYY-MM-DD HH:MM:SS")}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={classes.fontWeightMedium}>Practitioner</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								<Link color="inherit" id={document.entry[0].resource.author[0].reference} variant="h6" onClick={handleButtonClick}>
									{document.entry[3].resource.name[0].text}
								</Link>
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={classes.fontWeightMedium}>Department</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								<Link color="inherit" id={document.entry[0].resource.author[0].reference} variant="h6" onClick={handleButtonClick}>
									{document.entry[2].resource.specialty[0].coding[0].display}
								</Link>
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={classes.fontWeightMedium}>Custodian</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								<Link color="inherit" id={document.entry[0].resource.custodian.reference} variant="h6" onClick={handleButtonClick}>
									{document.entry[4].resource.name}
								</Link>
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={classes.fontWeightMedium}>Encounter Type</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{document.entry[0].resource.event[0].code[0].coding[0].code}
							</Typography>
						</TableCell>
					</TableRow>
					{sections.map((section) => (
						<TableRow key={section.code.coding[0].code}>
							<TableCell className={classes.fontWeightMedium}>{section.code.coding[0].display}</TableCell>
							<TableCell>
								{section.entry.map((entry) => (
									<Typography key={entry.reference} variant="body2" color="textSecondary">
										<Link color="inherit" id={entry.reference} variant="h6" onClick={handleButtonClick}>
											{entry.reference}
										</Link>
									</Typography>
								))}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Divider />
			<CardActions>
				<Button fullWidth component={RouterLink} to={`/phr/record/${document.entry[0].resource.id}/preview`}>
					<PictureAsPdfIcon />
					Document View
				</Button>
			</CardActions>
			<Divider />
			<CardActions>
				<Button fullWidth component={RouterLink} to={`/phr/record/${document.entry[0].resource.id}/sourceview`}>
					<FileCopyIcon />
					Document Source
				</Button>
			</CardActions>
			{/* <Box p={1} display="flex" flexDirection="column" alignItems="flex-start"></Box> */}
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<Divider />
				<DialogContent>
					<ReactJson src={resource} theme="monokai" />
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

DocumentInfo.propTypes = {
	className: PropTypes.string,
	document: PropTypes.object.isRequired,
};

export default DocumentInfo;
