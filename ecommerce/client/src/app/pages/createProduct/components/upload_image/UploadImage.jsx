/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { CreateProductContext } from "../../CreateProduct";

function UploadImage(props) {
	const { selectedImage } = useContext(CreateProductContext);

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
		setHidden(true);
		// Use .clientWidth to exclude scrollbars
		// https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
		const parentElement = document.getElementById(spanId);
		const parentWidth = parentElement.clientWidth;
		const parentHeight = parentElement.clientHeight;
		// console.log(`Parent width: ${parentWidth}`);
		// console.log(`Parent height: ${parentHeight}`);

		if (parentElement) {
			const allImages = parentElement.children;
			// console.log(`Children elements`);
			// console.log(allImages);
			if (allImages) {
				for (let i in allImages) {
					if (allImages[i].id && allImages[i].localName !== "input") {
						const img = allImages[i];
						// console.log(`Individual Image`);
						// console.log(img);
						if (!img) continue;

						const realImg = new Image();
						if (!linkref) return;
						realImg.src = img.src;
						// Debug
						// console.log(`Real width: ${realImg.width}`);
						// console.log(`Real height: ${realImg.width}`);
						// console.log(`Current width: ${img.clientWidth}`);
						// console.log(`Current height: ${img.clientHeight}`);

						// The image is smaller than parent width
						if (realImg.width < parentWidth) {
							img.style.width = realImg.width + "px";
							// console.log(`New width`);
							// console.log(img.style.width);
						}
						// The image is smaller than parent height
						if (realImg.height < parentHeight) {
							img.style.height = realImg.height + "px";
							// console.log(`New height`);
							// console.log(img.style.height);
						}

						if (realImg.width > parentWidth) {
							img.style.width = parentWidth + "px";
							// console.log(`The image is too big, reducing width to canvas:`);
							// console.log(img.style.width);
						}
						if (realImg.height > parentHeight) {
							img.style.height = parentHeight + "px";
							// console.log(`The image is too big, reducing height to canvas:`);
							// console.log(img.style.height);
						}
						
						setHidden(false);
					}
				}
			}
		}
	}, [imgId, linkref, spanId, resizeImagePercentage, selectedImage]);

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
					style={{ ...extraStyling }}
				/>
			)) ||
				(stackImages &&
					images &&
					images.map((e, index) => (
						<img
							key={uuidv4()}
							alt={title}
							className={(outline && "image") || ""}
							hidden={!(e.src === selectedImage) && !hidden}
							id={imgId}
							src={e.src}
							style={{ ...extraStyling }}
						/>
					)))}
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
