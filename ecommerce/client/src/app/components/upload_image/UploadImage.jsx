/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function UploadImage(props) {
	// Component properties
	const {
		classes,
		linkref,
		title,
		classCondition,
		changeFn,
		name,
		defaultImage,
	} = props;

	// Constants
	const spanId = uuidv4();
	const imgId = uuidv4();

	// States
	const [hidden, setHidden] = useState(true);

	const promptInput = (e) => {
		document.getElementById("file-input").click();
	};

	useEffect(() => {
		const realImg = new Image();
		realImg.src = linkref;

		// Use .clientWidth to exclude scrollbars
		// https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
		const parentElement = document.getElementById(spanId);
		const img = document.getElementById(imgId);
		if (parentElement && img) {
			const parentWidth = parentElement.clientWidth;
			const parentHeight = parentElement.clientHeight;

			// Debug
			// console.log(`Real width: ${realImg.width}`);
			// console.log(`Real height: ${realImg.width}`);
			// console.log(`Current width: ${img.clientWidth}`);
			// console.log(`Current height: ${img.clientHeight}`);

			// The image is smaller than parent width
			if (realImg.width < parentWidth) {
				img.style.width = realImg.width + "px";
			}
			// The image is smaller than parent height
			if (realImg.height < parentHeight) {
				img.style.height = realImg.height + "px";
			}
		}
		
		setHidden(false);
	}, [imgId, linkref, spanId]);

	return (
		<span id={spanId} className={classes} onClick={promptInput}>
			<img
				id={imgId}
				className={(classCondition && "image") || ""}
				src={(!hidden && linkref) || defaultImage}
				alt={title}
				hidden={hidden}
			/>
			<input
				id="file-input"
				name={name}
				hidden={true}
				multiple={true}
				type="file"
				onChange={changeFn}
			/>
		</span>
	);
}

export default UploadImage;
