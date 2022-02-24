import React from "react";
import { useViewportSize } from "../../../../lib/viewport/useViewportSize";

function Title(props) {
	const { classes, height, title, width } = props;
	const { viewportSize } = useViewportSize();

	return (
		<h1 className={classes} style={{ width, height }}>
			{title}
		</h1>
	);
}

export default Title;
