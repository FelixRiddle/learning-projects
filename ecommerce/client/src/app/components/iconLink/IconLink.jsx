/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";

function IconLink(props) {
	const { classes, linkref, title, iconName, iconClasses, textClass, fn } =
		props;
	const [isImage, setIsImage] = useState(false);
	const url = "http://localhost:3001/public/icons/";

	useEffect(() => {
		if (isImage) return;
		console.log(`Requesting images`);
		axios
			.get(url + iconName)
			.then((res) => setIsImage(true))
			.catch((err) => "");
	}, [isImage, iconName]);

	return (
		<span>
			<a href={linkref} className={classes} onClick={fn}>
				{isImage && <img className={iconClasses} src={url + iconName} />}
				{!isImage && <span className={textClass}>{title}</span>}
			</a>
		</span>
	);
}

export default IconLink;
