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
		// An object like this {width: 60, height: 40}
		resizeImagePercentage,
	} = props;

	// Constants
	const spanId = uuidv4();
	const imgId = uuidv4();

	// States
	// For a bug where, when you change the image it shows
	// a resized image for some milliseconds.
	const [hidden, setHidden] = useState(true);
	const [viewportSize, setViewportSize] = useState({
		width: Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		),
		height: Math.max(
			document.documentElement.clientHeight || 0,
			window.innerHeight || 0
		),
	});

	const promptInput = (e) => {
		document.getElementById("file-input").click();
	};

	useEffect(() => {
		const realImg = new Image();
		if (!linkref) return;
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
	}, [imgId, linkref, spanId, resizeImagePercentage]);

	useEffect(() => {
		if (!resizeImagePercentage) return;

		console.log(viewportSize);
		const parentElement = document.getElementById(spanId);
		if (parentElement) {
			const newWidth = (resizeImagePercentage.width / 100) * viewportSize.width;
			const newHeight =
				(resizeImagePercentage.height / 100) * viewportSize.height;
			parentElement.style.width = newWidth + "px";
			parentElement.style.height = newHeight + "px";
		}
	}, [resizeImagePercentage, spanId, viewportSize]);

	window.onresize = () => {
		setViewportSize({
			width: Math.max(
				document.documentElement.clientWidth || 0,
				window.innerWidth || 0
			),
			height: Math.max(
				document.documentElement.clientHeight || 0,
				window.innerHeight || 0
			),
		});
	};

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
