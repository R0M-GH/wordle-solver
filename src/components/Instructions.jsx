import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';

export default function Instructions() {
	const BootstrapDialog = styled(Dialog)(({ theme }) => ({
		"& .MuiDialogContent-root": {
			padding: theme.spacing(2),
		},
		"& .MuiDialogActions-root": {
			padding: theme.spacing(1),
		},
	}));

	const BootstrapDialogTitle = (props) => {
		const { children, onClose, ...other } = props;

		return (
			<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
				{children}
				{onClose ? (
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				) : null}
			</DialogTitle>
		);
	};

	BootstrapDialogTitle.propTypes = {
		children: PropTypes.node,
		onClose: PropTypes.func.isRequired,
	};
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	}
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>

						<Box sx={{ flexGrow: 1 }} >
							<Typography variant="h6" component="div" >
								Wordle Solver
							</Typography>
						</Box>
						<Button color="inherit" onClick={handleOpen}>Show Instructions</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					Instructions
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						To use this wordle solver, first type in audio and crest into your wordle game. Then match the colors in the game with the solver, by clicking on each of the letters. After that, click the Add button to generate a prediction. Repeat this until you win.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Start
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}