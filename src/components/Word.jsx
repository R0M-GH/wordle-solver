import React from "react";
import { Box } from "@material-ui/core";
import { Button } from "@mui/material";

export default function Word(props) {
	let letters = [];
	for (let i = 0; i < 5; i++) {
		let tmp = [props.words[props.index].value.charAt(i)];
		if (props.words[props.index].color[i] == 0) {
			tmp.push("gray");
		} else if (props.words[props.index].color[i] == 1) {
			tmp.push("yellow");
		} else {
			tmp.push("green");
		}
		tmp.push(i);
		letters.push(tmp);
	}
	function handleClick(i) {
		let tmp = [...props.words];
		if (tmp[props.index].color[i] == 2) {
			tmp[props.index].color[i] = 0
		} else {
			tmp[props.index].color[i] += 1
		}
		props.setWords(tmp)
	}
	const boxes = letters.map((letter) => (
		<Box m={1}>
			<Button
				style={{
					fontSize: "63px",
					color: "black",
					backgroundColor: letter[1],
					maxWidth: "100px",
					maxHeight: "100px",
					minWidth: "100px",
					minHeight: "100px",
					margin: "5"
				}}
				onClick={() => handleClick(letter[2])}
			>
				{letter[0]}
			</Button>
		</Box>

	));
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{boxes}
		</div>
	);
}