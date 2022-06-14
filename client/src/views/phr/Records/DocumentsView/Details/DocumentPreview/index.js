/* eslint-disable arrow-parens */
import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
// import useIsMountedRef from "src/hooks/useIsMountedRef";
import Page from "src/components/Page";
import DocumentView from "./DocumentView";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}));

// eslint-disable-next-line react/prop-types
function DocumentPreview() {
	const classes = useStyles();
	// const isMountedRef = useIsMountedRef();
	// const [composition, setComposition] = useState(null);

	// const compositionid = match.params.id;
	// const url = `http://localhost:4000/4_0_0/Composition/${compositionid}/$document`;

	// const getComposition = useCallback(async () => {
	//   // eslint-disable-next-line react/prop-types
	//   console.log(match.params.id);

	//   const config = {
	//     method: 'get',
	//     url
	//     // headers: {
	//     //   Authorization:
	//     //     'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAyMjAxZTA1ZjI1MzgwMDE1Zjk4MDU3IiwiaWF0IjoxNjE0MTQxMjE1LCJleHAiOjE2MTY3MzMyMTUsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJzYW1zdW5nIG1lZGljYWwgY2VudGVyIiwic3ViIjoiYWRtaW5Ac21jLmNvbSJ9.1ykOVKtab7g9dUUCg5_tDzR4yYz-TVf3g5Giv4IHJlJXcfF8624yL9KBBnkKoKdsHBtmBO3Eu7BQ4YWSBFHK08NmV3w9Ukub5jSElTuRKggk8_HJeQ4_aqDrHvygwiEDntMiBQujUTKIapWgnz_WfVLJerPe31_xCgco7wAAdtY'
	//     // }
	//   };

	//   await axios(config)
	//     .then(response => {
	//       // console.log(response.data);
	//       if (isMountedRef.current) {
	//         // console.log(response.data);
	//         setComposition(response.data);
	//       }
	//     })
	//     .catch(error => {
	//       console.log(error);
	//     });
	// }, [isMountedRef]);

	// useEffect(() => {
	//   getComposition();
	// }, [getComposition]);

	// if (!composition) {
	//   return null;
	// }

	return (
		<Page
			className={classes.root}
			// title="Invoice Details"
		>
			<Container maxWidth="lg">
				<Header />
				<Box mt={3}>
					<DocumentView />
				</Box>
			</Container>
		</Page>
	);
}

export default DocumentPreview;
