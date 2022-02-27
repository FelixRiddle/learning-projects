import React from "react";

function Title(props) {
	const { classes, extraStyling, height, title, width } = props;

	return (
		<h1 className={classes} style={{ ...extraStyling, width, height }}>
			{title}
		</h1>
	);
}

export default Title;
