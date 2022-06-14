import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import {
	Avatar,
	Box,
	Button,
	Card,
	// CardHeader,
	Checkbox,
	Divider,
	IconButton,
	InputAdornment,
	Link,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	// Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	makeStyles,
} from "@material-ui/core";
import {
	Edit as EditIcon,
	// ArrowRight as ArrowRightIcon,
	Search as SearchIcon,
} from "react-feather";
import Label from "src/components/Label";
import getInitials from "src/utils/getInitials";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Axios from "axios";
import fs from "fs";

const sortOptions = [
	{
		value: "updatedAt|desc",
		label: "Last update (newest first)",
	},
	{
		value: "updatedAt|asc",
		label: "Last update (oldest first)",
	},
	{
		value: "orders|desc",
		label: "Total orders (high to low)",
	},
	{
		value: "orders|asc",
		label: "Total orders (low to high)",
	},
];

function applyFilters(documents, query, filters) {
	return documents.filter((documents) => {
		let matches = true;

		if (query) {
			const properties = ["email", "name"];
			let containsQuery = false;

			properties.forEach((property) => {
				if (documents[property].toLowerCase().includes(query.toLowerCase())) {
					containsQuery = true;
				}
			});

			if (!containsQuery) {
				matches = false;
			}
		}

		Object.keys(filters).forEach((key) => {
			const value = filters[key];

			if (value && documents[key] !== value) {
				matches = false;
			}
		});

		return matches;
	});
}

function applyPagination(documents, page, limit) {
	return documents.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}

	if (b[orderBy] > a[orderBy]) {
		return 1;
	}

	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(documents, sort) {
	const [orderBy, order] = sort.split("|");
	const comparator = getComparator(order, orderBy);
	const stabilizedThis = documents.map((el, index) => [el, index]);

	stabilizedThis.sort((a, b) => {
		// eslint-disable-next-line no-shadow
		const order = comparator(a[0], b[0]);

		if (order !== 0) return order;

		return a[1] - b[1];
	});

	return stabilizedThis.map((el) => el[0]);
}

const documentStatusColors = {
	// canceled: 'error',
	false: "warning",
	true: "success",
	// rejected: 'error'
};

const useStyles = makeStyles((theme) => ({
	root: {},
	queryField: {
		width: 500,
	},
	bulkOperations: {
		position: "relative",
	},
	bulkActions: {
		paddingLeft: 4,
		paddingRight: 4,
		marginTop: 6,
		position: "absolute",
		width: "100%",
		zIndex: 2,
		backgroundColor: theme.palette.background.default,
	},
	bulkAction: {
		marginLeft: theme.spacing(2),
	},
	avatar: {
		height: 42,
		width: 42,
		marginRight: theme.spacing(1),
	},
}));

function CategorizedDocuments({ className, categorizedDocuments, ...rest }) {
	const classes = useStyles();
	// const documents = useSelector((state) => state.documents.documents);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState(sortOptions[0].value);
	const [filters, setFilters] = useState({
		isProspect: null,
		isReturning: null,
		acceptsMarketing: null,
	});

	// const [documents, setDocuments] = useState(categorizedDocuments);
	const [selectedDocuments, setSelectedDocuments] = useState([]);
	const [cardSummary, setCardSummary] = React.useState();
	const [cardLength, setCardLength] = React.useState();
	const [cardDetail, setCardDetail] = React.useState();
	const [open, setOpen] = React.useState(false);

	// console.log("categorizedDocuments", categorizedDocuments);

	if (!categorizedDocuments) {
		return null;
	}

	// console.log(1, patients);

	// const handleQueryChange = (event) => {
	// 	event.persist();
	// 	setQuery(event.target.value);
	// };

	// const handleSortChange = (event) => {
	// 	event.persist();
	// 	setSort(event.target.value);
	// };

	const handleSelectAllDocuments = (event) => {
		// setSelectedDocuments(event.target.checked ? documents.map((document) => document.documentID) : []);
		setSelectedDocuments(event.target.checked ? categorizedDocuments.map((categorizedDocument) => categorizedDocument.documentID) : []);
	};

	const handleSelectOneDocument = (event, documentID) => {
		if (!selectedDocuments.includes(documentID)) {
			setSelectedDocuments((prevSelected) => [...prevSelected, documentID]);
		} else {
			setSelectedDocuments((prevSelected) => prevSelected.filter((id) => id !== documentID));
		}
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
		window.location.reload(false);
	};

	const handleSendButtonClick = async (event) => {
		if (!selectedDocuments) {
			return null;
		}

		if (!categorizedDocuments) {
			return null;
		}

		// let updateDocuments = [];
		let sendDocuments = [];
		categorizedDocuments.map((categorizedDocument) => {
			selectedDocuments.map((selectedDocument) => {
				if (categorizedDocument.documentID === selectedDocument) {
					// console.log(categorizedDocument);
					sendDocuments.push(categorizedDocument);
					// updateDocuments.push({ documentID: categorizedDocument._id, isTransfer: categorizedDocument.isTransfer });
				}
			});
		});

		// console.log(sendDocuments);
		// console.log(categorizedDocuments);

		const update_config = {
			method: "post",
			url: "http://localhost:3100/documents/update",
			data: sendDocuments,
		};

		await Axios(update_config)
			.then((response) => {
				console.log(response.data);
				if (response.data) {
					setCardSummary(response.data.card.summary);
					setCardLength(response.data.card_length);
					setCardDetail(response.data.card.detail);
					setOpen(true);
				}

				// window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const handleButtonClick = (event, patientId) => {
	//   // component={RouterLink}
	//   // to={`/app/reports/dashboard/composition/${patient.id}`}
	//   console.log('handleButtonClick - id', event.target.id);
	//   console.log('handleButtonClick - value', event.target.value);
	//   console.log('handleButtonClick - name', event.target.name);

	//   console.log('handleButtonClick - patientId', patientId);
	//   history.push(`/app/reports/dashboard/composition/${event.target.id}`);
	// };

	// Usually query is done on backend with indexing solutions
	// console.log(selectedDocuments.length);

	// let categorizedDocuments;
	// if (organizationID === "total") {
	// 	categorizedDocuments = documents;
	// } else {
	// 	categorizedDocuments = documents.filter((result) => result.organizationID === organizationID);
	// }
	// const categorizedDocuments = documents.filter((result) => result.organizationID === organizationID);
	const filteredDocuments = applyFilters(categorizedDocuments, query, filters);
	// const filteredDocuments = applyFilters(documents, query, filters);
	const sortedDocuments = applySort(filteredDocuments, sort);
	const paginatetDocuments = applyPagination(sortedDocuments, page, limit);
	const enableBulkOperations = selectedDocuments.length > 0;
	// const selectedSomeDocuments = selectedDocuments.length > 0 && selectedDocuments.length < documents.length;
	const selectedSomeDocuments = selectedDocuments.length > 0 && selectedDocuments.length < categorizedDocuments.length;
	const selectedAllDocuments = selectedDocuments.length === categorizedDocuments.length;
	// const selectedAllDocuments = selectedDocuments.length === documents.length;

	// console.log("selectedDocuments", selectedDocuments);

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			{/* <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs> */}
			{/* <CardHeader title="Documents" /> */}
			{/* <Divider /> */}
			{/* <Box p={2} minHeight={56} display="flex" alignItems="center">
				<TextField
					className={classes.queryField}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SvgIcon fontSize="small" color="action">
									<SearchIcon />
								</SvgIcon>
							</InputAdornment>
						),
					}}
					onChange={handleQueryChange}
					placeholder="Search patients"
					value={query}
					variant="outlined"
				/>
				<Box flexGrow={1} />
				<TextField label="Sort By" name="sort" onChange={handleSortChange} select SelectProps={{ native: true }} value={sort} variant="outlined">
					{sortOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</TextField>
			</Box> */}
			{enableBulkOperations && (
				<div className={classes.bulkOperations}>
					<div className={classes.bulkActions}>
						<Checkbox checked={selectedAllDocuments} indeterminate={selectedSomeDocuments} onChange={handleSelectAllDocuments} />
						<Button variant="outlined" className={classes.bulkAction} onClick={handleSendButtonClick}>
							Send
						</Button>
						{/* <Button variant="outlined" className={classes.bulkAction}>
							Delete
						</Button> */}
					</div>
				</div>
			)}
			<PerfectScrollbar>
				<Box minWidth={700}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox checked={selectedAllDocuments} indeterminate={selectedSomeDocuments} onChange={handleSelectAllDocuments} />
								</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Organization</TableCell>
								<TableCell>Document ID</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Encounter Date</TableCell>
								<TableCell>Author</TableCell>
								<TableCell>Dept</TableCell>
								<TableCell>Generated Date</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{paginatetDocuments.map((document) => {
								const isDocumentSelected = selectedDocuments.includes(document.documentID);

								return (
									<TableRow hover key={document.documentID} selected={isDocumentSelected} disable="false">
										<TableCell padding="checkbox">
											<Checkbox
												checked={isDocumentSelected}
												onChange={(event) => handleSelectOneDocument(event, document.documentID)}
												value={isDocumentSelected}
											/>
										</TableCell>
										{/* <TableCell>{JSON.stringify(document.isTransfer)}</TableCell> */}
										<TableCell>
											<Label color={documentStatusColors[JSON.stringify(document.isTransfer)]}>{JSON.stringify(document.isTransfer)}</Label>
										</TableCell>
										<TableCell>
											<Box display="flex" alignItems="center">
												<Avatar className={classes.avatar}>{getInitials(document.document.entry[4].resource.name)}</Avatar>
												<div>
													<Link color="inherit" component={RouterLink} to="/app/management/patients/1" variant="h6">
														{getInitials(document.document.entry[4].resource.name)}
													</Link>
													{/* <Typography variant="body2" color="textSecondary">
														{patient.birthDate}({patient.gender})
													</Typography> */}
												</div>
											</Box>
										</TableCell>

										<TableCell>{document.documentID}</TableCell>
										<TableCell>{document.document.entry[0].resource.event[0].code[0].coding[0].code}</TableCell>
										<TableCell>{moment(document.document.entry[0].resource.date).format("YYYY-MM-DD")}</TableCell>
										<TableCell>{document.document.entry[3].resource.name[0].text}</TableCell>
										<TableCell>{document.document.entry[2].resource.specialty[0].coding[0].display}</TableCell>
										<TableCell>{moment(document.document.timestamp).format("YYYY-MM-DD")}</TableCell>
										<TableCell align="right">
											<IconButton component={RouterLink} to={`/phr/record/${document.documentID}`}>
												<SvgIcon fontSize="small">
													<EditIcon />
												</SvgIcon>
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={filteredDocuments.length}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>

			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>
					{cardSummary} - {cardLength} sended
				</DialogTitle>
				<Divider />

				<DialogContent>{cardDetail}</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

CategorizedDocuments.propTypes = {
	className: PropTypes.string,
	// patients: PropTypes.array,
};

// Documents.defaultProps = {
// 	// patients: [],
// };

export default CategorizedDocuments;
