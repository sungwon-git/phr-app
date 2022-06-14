import React, { useRef, useState, memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { ListItemIcon, ListItemText, Tooltip, IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
// import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
// import AchiveIcon from '@material-ui/icons/ArchiveOutlined';

const useStyles = makeStyles(() => ({
	menu: {
		width: 256,
		maxWidth: "100%",
	},
}));

function DocumentMoreButton(props) {
	const classes = useStyles();
	const moreRef = useRef(null);
	const [openMenu, setOpenMenu] = useState(false);
	// console.log('props is ' + props.compositionid);

	const viewPath = `/app/reports/dashboard/composition/document/view/${props.compositionid}`;
	const sourcePath = `/app/reports/dashboard/composition/document/source/${props.compositionid}`;

	const handleMenuOpen = () => {
		setOpenMenu(true);
	};

	const handleMenuClose = () => {
		setOpenMenu(false);
	};

	return (
		<>
			<Tooltip title="More options">
				<IconButton {...props} onClick={handleMenuOpen} ref={moreRef}>
					<MoreIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={moreRef.current}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				onClose={handleMenuClose}
				open={openMenu}
				PaperProps={{ className: classes.menu }}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<MenuItem component={RouterLink} to={viewPath}>
					<ListItemIcon>
						<PictureAsPdfIcon />
					</ListItemIcon>
					<ListItemText primary="View" />
				</MenuItem>

				{/* <MenuItem>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Import" />
        </MenuItem> */}
				<MenuItem component={RouterLink} to={sourcePath}>
					<ListItemIcon>
						<FileCopyIcon />
					</ListItemIcon>
					<ListItemText primary="Source" />
				</MenuItem>

				{/* <MenuItem>
          <ListItemIcon>
            <AchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Achive" />
        </MenuItem> */}
			</Menu>
		</>
	);
}

DocumentMoreButton.propTypes = {
	className: PropTypes.string,
};

export default memo(DocumentMoreButton);
