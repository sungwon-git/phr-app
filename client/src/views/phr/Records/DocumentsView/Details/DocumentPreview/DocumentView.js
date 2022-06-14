import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, Paper, Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router";
// import Logo from 'src/components/Logo';

const useStyles = makeStyles(() => ({
	root: {},
}));

function DocumentView({ className, ...rest }) {
	const classes = useStyles();
	const document = useSelector((state) => state.document.document);
	// console.log(useSelector((state) => state));
	// console.log("0", document);

	// const [title, setTitle] = useState();

	// if (!document) {
	// 	return <Redirect to="/phr/records/categorization" />;
	// }

	const bundle = document;
	const entries = bundle.entry;
	let title = "";
	let engTitle = "";
	let documentNumber = "";
	let authoringDate = bundle.timestamp;

	let confidentiality = "";

	let encounterType = "";
	let encounterTypeCode = "";
	let encounterStartDate = "";
	let encounterEndDate = "";

	let patientNumber = "";
	let patientName = "";
	let patientGender = "";
	let patientAddress = "";
	let patientTelecom = "";
	let patientBirthdate = "";
	let patientCommunication = "";

	let practitionerRole = "";
	let practitionerDept = "";
	let practitionerDeptCode = "";
	let practitionerName = "";
	let practitionerTelecom = "";

	let organName = "";
	let organTelecom = "";
	let organAddress = "";

	const conditions = [];
	const medications = [];
	const procedures = [];
	// console.log(1, entries);
	for (let i = 0; i < entries.length; i++) {
		// console.log(entries[i].resource.resourceType);
		const entry = entries[i].resource;

		if (entry.resourceType === "Composition") {
			title = `${entry.title}`;
			engTitle = `(${entry.type.coding[0].display})`;
			documentNumber = entry.identifier.value;
			patientNumber = entry.subject.reference;
			confidentiality = entry.confidentiality;
		}

		if (entry.resourceType === "Encounter") {
			encounterType = entry.class.display;
			encounterTypeCode = entry.class.code;
			encounterStartDate = moment(entry.period.start).format("YYYY-MM-DD");
			encounterEndDate = moment(entry.period.end).format("YYYY-MM-DD");
		}

		if (entry.resourceType === "Patient") {
			patientName = entry.name[0].text;
			patientGender = entry.gender;
			patientAddress = entry.address[0].text;
			patientTelecom = entry.telecom[0].value;
			patientBirthdate = entry.birthDate;
			patientCommunication = entry.communication[0].language.coding[0].display;
		}

		if (entry.resourceType === "PractitionerRole") {
			practitionerRole = entry.code[0].coding[0].code;
			practitionerDeptCode = entry.specialty[0].coding[0].code;
			practitionerDept = entry.specialty[0].coding[0].display;
		}

		if (entry.resourceType === "Practitioner") {
			practitionerName = entry.name[0].text;
			practitionerTelecom = entry.telecom[0].value;
		}

		if (entry.resourceType === "Organization") {
			organName = entry.name;
			organTelecom = entry.telecom[0].value;
			organAddress = `${entry.address[0].text}`;
		}

		if (entry.resourceType === "Condition") {
			conditions.push({
				id: entry.id,
				recordedDate: entry.recordedDate,
				code: entry.code,
			});
		}

		if (entry.resourceType === "MedicationRequest") {
			entry.dosageInstruction.id = entry.id;
			let medRefId = entry.medicationReference.reference;
			medRefId = medRefId.split("/");
			entry.dosageInstruction.medicationReferenceId = medRefId[1];
			medications.push(entry.dosageInstruction);
		}

		if (entry.resourceType === "Medication") {
			for (let i = 0; i < medications.length; i++) {
				// console.log(medications[i].medicationReferenceId);
				if (medications[i].medicationReferenceId === entry.id) {
					medications[i].code = entry.code;
				}
			}
		}

		if (entry.resourceType === "Procedure") {
			procedures.push({
				id: entry.id,
				performedDateTime: entry.performedDateTime,
				code: entry.code,
			});
		}
	}
	// console.log(medications);

	return (
		<Paper className={clsx(classes.root, className)} {...rest}>
			<PerfectScrollbar>
				<Box minWidth={800} p={6}>
					<Grid container justify="space-between">
						<Grid item>
							<Typography align="left" variant="h1" color="textPrimary">
								{title}
							</Typography>
							<Typography align="left" variant="h3" color="textPrimary">
								{engTitle}
							</Typography>
							<Typography align="left" variant="h5" color="textPrimary">
								Document # : {documentNumber}
							</Typography>
						</Grid>
						<Grid item>
							<Typography align="right" variant="h1" color="textPrimary">
								{patientName}
							</Typography>
							<Typography align="right" variant="h5" color="textPrimary">
								Patient # : {patientNumber}
							</Typography>
						</Grid>
					</Grid>
					<Box my={4}>
						<Grid container justify="space-between">
							<Grid item>
								<Typography gutterBottom variant="h4" color="textPrimary">
									내원정보 (Encounter Information)
								</Typography>
								<Typography variant="body1" color="textSecondary">
									타입(Encounter Type) : {encounterType} ({encounterTypeCode}) <br />
									진료일자(Encounter Date) : {encounterStartDate} ~ {encounterEndDate} <br />
									기밀성(Confidentiality) : {confidentiality} <br />
								</Typography>
							</Grid>
							<Grid item>
								<Typography gutterBottom variant="h4" color="textPrimary">
									인적정보 (Patient Information)
								</Typography>
								<Typography variant="body1" color="textSecondary">
									성별(Gender) : {patientGender} <br />
									생년월일(Birthdate) : {patientBirthdate} <br />
									언어(Preferred Language) : {patientCommunication} <br />
									전화번호(Telecom) : {patientTelecom} <br />
									주소 (Address) : {patientAddress}
								</Typography>
							</Grid>
						</Grid>
					</Box>

					<Box my={4}>
						<Grid container justify="space-between">
							<Grid item>
								<Typography gutterBottom variant="h4" color="textPrimary">
									작성자 정보 (Practitioner Information)
								</Typography>
								<Typography variant="body1" color="textSecondary">
									이름(Name) : {practitionerName} ({practitionerRole}) <br />
									진료과(Dept) : {practitionerDept} ({practitionerDeptCode})
									<br />
									전화번호(Telecom) : {practitionerTelecom}
								</Typography>
							</Grid>
							<Grid item>
								<Typography gutterBottom variant="h4" color="textPrimary">
									병원정보 (Custodian Information)
								</Typography>
								<Typography variant="body1" color="textSecondary">
									기관명(Organization Name) : {organName} <br />
									전화번호(Telecom) : {organTelecom} <br />
									주소 (Address) : {organAddress}
								</Typography>
							</Grid>
						</Grid>
					</Box>

					{conditions.length > 0 && (
						<Box my={4}>
							<Typography gutterBottom variant="h4" color="textPrimary">
								진단명 (Diagnosis)
							</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Recorded Date</TableCell>
										<TableCell>System</TableCell>
										<TableCell>Code</TableCell>
										<TableCell>Code Name</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{conditions.map((condition) => (
										<TableRow key={condition.id}>
											<TableCell>{condition.recordedDate}</TableCell>
											<TableCell>{condition.code.coding[0].system}</TableCell>
											<TableCell>{condition.code.coding[0].code}</TableCell>
											<TableCell>{condition.code.coding[0].display}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					)}

					{medications.length > 0 && (
						<Box my={4}>
							<Typography gutterBottom variant="h4" color="textPrimary">
								약물처방내역 (Medications)
							</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Start Date</TableCell>
										<TableCell>End Date</TableCell>
										<TableCell>frequency</TableCell>
										<TableCell>Period</TableCell>
										<TableCell>Medication</TableCell>
										<TableCell>Code System</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{medications.map((medication) => (
										<TableRow key={medication.id}>
											<TableCell>{medication[0].timing.repeat.boundsPeriod.start}</TableCell>
											<TableCell>{medication[0].timing.repeat.boundsPeriod.end}</TableCell>
											<TableCell></TableCell>
											<TableCell>
												{medication[0].timing.repeat.period} ({medication[0].timing.repeat.periodUnit})
											</TableCell>
											<TableCell>
												({medication.code.coding[0].code}) {medication.code.coding[0].display}
											</TableCell>
											<TableCell>{medication.code.coding[0].system}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					)}

					{procedures.length > 0 && (
						<Box my={4}>
							<Typography gutterBottom variant="h4" color="textPrimary">
								수술 및 처치 (Procedures)
							</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Recorded Date</TableCell>
										<TableCell>System</TableCell>
										<TableCell>Code</TableCell>
										<TableCell>Code Name</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{procedures.map((procedure) => (
										<TableRow key={procedure.id}>
											<TableCell>{moment(procedure.performedDateTime).format("YYYY-MM-DD")}</TableCell>
											<TableCell>{procedure.code.coding[0].system}</TableCell>
											<TableCell>{procedure.code.coding[0].code}</TableCell>
											<TableCell>{procedure.code.coding[0].display}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					)}
					<Box mt={2}>
						<Typography gutterBottom variant="h5" color="textPrimary">
							작성일자
						</Typography>
						<Typography variant="body1" color="textSecondary">
							{authoringDate}
						</Typography>
					</Box>
				</Box>
			</PerfectScrollbar>
		</Paper>
	);
}

DocumentView.propTypes = {
	className: PropTypes.string,
	// composition: PropTypes.object.isRequired,
};

export default DocumentView;
