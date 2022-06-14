import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Container, Backdrop, CircularProgress, Dialog, DialogContent, DialogTitle, DialogActions, Divider, Button, makeStyles } from "@material-ui/core";
import Axios from "axios";
import Page from "src/components/Page";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import Header from "./Header";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

function Organization() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isMountedRef = useIsMountedRef();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [count, setCount] = React.useState(0);
	const [tokenURL, setTokenURL] = React.useState(0);
	const [organizations, setOrganizations] = useState([]);

	const getOrganizations = useCallback(() => {
		Axios.get("http://localhost:3100/organizations").then((response) => {
			if (isMountedRef.current) {
				// console.log(response.data);
				setOrganizations(response.data.organizations);
			}
		});
	}, [isMountedRef]);

	useEffect(() => {
		getOrganizations();
	}, [getOrganizations]);

	if (organizations.length < 1) {
		return null;
	} else {
		// console.log("org index.js", organizations);
		dispatch({ type: "SET_ORGANIZATIONS", payload: { organizations } });
	}

	// console.log("/records index.js", organizations);
	const handleProgress = (status) => {
		// console.log("status", status);
		setLoading(status);
		setOpen(!status);
	};

	const handleReceivedDocumentCount = (count) => {
		setCount(count);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleToken = (url) => {
		// console.log(url);
		setTokenURL(url);
	};

	return (
		<Page className={classes.root} title="Project List">
			<Container maxWidth="lg">
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color="inherit" />
				</Backdrop>

				<Header />
				<Box mt={6}>
					<Results
						organizations={organizations}
						handleProgress={handleProgress}
						handleReceivedDocumentCount={handleReceivedDocumentCount}
						handleToken={handleToken}
					/>
				</Box>
			</Container>

			{count > 0 ? (
				<Dialog onClose={handleClose} open={open}>
					<DialogTitle>{count} documents are received</DialogTitle>
					<Divider />

					{/* <DialogContent>{cardDetail}</DialogContent>
				<Divider /> */}
					<DialogActions>
						<Button onClick={handleClose}>Close</Button>
					</DialogActions>
				</Dialog>
			) : (
				<Dialog onClose={handleClose} open={open}>
					<DialogTitle>There is not Token. Do you want to get token?</DialogTitle>
					<Divider />

					{/* <DialogContent>{cardDetail}</DialogContent>
				<Divider /> */}
					<DialogActions>
						<Button href={tokenURL}>Move</Button>
						<Button onClick={handleClose}>Close</Button>
					</DialogActions>
				</Dialog>
			)}
			{/* <Dialog onClose={handleClose} open={open}>
				<DialogTitle>{count} documents are received</DialogTitle>
				<Divider />

				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog> */}
		</Page>
	);
}

export default Organization;
