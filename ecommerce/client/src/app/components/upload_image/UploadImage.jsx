/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function UploadImage(props) {
	// Component properties
	const {
		classes,
		linkref,
		title,
		changeFn,
		name,
		defaultImage,
		// An object like this {width: 60, height: 40}
		resizeImagePercentage,
		viewportSize,
		extraStyling,
		isHidden,
		stackImages, // Bool, if true, stacks images on top of each other
		images, // Array of images
		selectedImage, // Image to show
		outline,
	} = props;

	// Constants
	const spanId = uuidv4();
	const imgId = uuidv4();

	const [hidden, setHidden] = useState(true);

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
		if (!viewportSize) return;
		// Resizes the canvas width and height if the user
		// resizes the window
		const parentElement = document.getElementById(spanId);
		if (parentElement) {
			const newWidth = (resizeImagePercentage.width / 100) * viewportSize.width;
			const newHeight =
				(resizeImagePercentage.height / 100) * viewportSize.height;
			parentElement.style.width = newWidth + "px";
			parentElement.style.height = newHeight + "px";
		}
	}, [resizeImagePercentage, spanId, viewportSize]);

	return (
		<span id={spanId} className={classes} onClick={promptInput}>
			{(!stackImages && (
				<img
					alt={title}
					className={(outline && "image") || ""}
					hidden={isHidden}
					id={imgId}
					src={(!hidden && linkref) || defaultImage}
					style={{ width: "100%", height: "100%", ...extraStyling }}
				/>
			)) ||
				(stackImages &&
					images &&
					images.map((e) => {
						// console.log(`Source`);
						// console.log(e.src);
						// console.log(`Selected image: ${selectedImage}`);
						return (
							<img
								key={uuidv4()}
								alt={title}
								className={(outline && "image") || ""}
								hidden={e.src === selectedImage}
								id={imgId}
								src={e.src}
								style={{ width: "100%", height: "100%", ...extraStyling }}
							/>
						);
					}))}
			<input
				id="file-input"
				name={name}
				hidden={true}
				multiple={true}
				onChange={changeFn}
				style={{ position: "absolute" }}
				type="file"
			/>
		</span>
	);
}

export default UploadImage;
