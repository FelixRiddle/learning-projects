/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

function ShowTinyImage(props) {
	const { classes, imageSrc, imageClasses, index, clickFn } = props;
	return (
		<div className={classes} onClick={() => clickFn(imageSrc)}>
			<img src={imageSrc} className={imageClasses} alt={index} />
		</div>
	);
}

export default ShowTinyImage;
