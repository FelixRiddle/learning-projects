/* eslint-disable jsx-a11y/alt-text */
import React from "react";

function Icon(props) {
	const { classes, imageClasses, imageId, icon, clickFn } = props;

	return (
		<div className={classes}>
			<img className={imageClasses} src={icon} onClick={clickFn} id={imageId} />
		</div>
	);
}

export default Icon;
