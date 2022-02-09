/* eslint-disable jsx-a11y/alt-text */
import React from "react";

function Icon(props) {

	const { classes, imageId, icon, clickFn } = props;

	return <div className={classes}>
		<img src={icon} onClick={clickFn} id={imageId}/>
	</div>;
}

export default Icon;
