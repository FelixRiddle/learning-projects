/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { CreateProductContext } from "../../CreateProduct";

function UploadImage(props) {
	const { selectedImage, setConfig } = useContext(CreateProductContext);

	// Component properties
	const {
		classes,
		linkref,
		title,
		changeFn,
		name,
		// An object like this {width: 60, height: 40}
		resizeImagePercentage,
		viewportSize,
		extraStyling,
		stackImages,
		images, // Array of images
		outline,
	} = props;

	const [hidden, setHidden] = useState(true);
	const [spanId] = useState(uuidv4());
	const [imgId] = useState(uuidv4());

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

		// TODO: Idea: Save the sizes on a new array of images to keep it
		// easy, and to prevent a new bug, where the images are of original
		// size for a few milliseconds.
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
			// Get the new width and height, by dividing the percentage and multiplying it
			// by width.
			const newWidth = (resizeImagePercentage.width / 100) * viewportSize.width;
			const newHeight =
				(resizeImagePercentage.height / 100) * viewportSize.height;

			// This will be used for the arrows
			setConfig((prevInput) => {
				return {
					...prevInput,
					bigImageContainerSize: {
						width: newWidth,
						height: newHeight,
					},
				};
			});

			// Set the new width and height
			const widthResult = newWidth + "px";
			const heightResult = newHeight + "px";
			parentElement.style.width = widthResult;
			parentElement.style.height = heightResult;
		}
	}, [resizeImagePercentage, spanId, viewportSize, setConfig]);

	return (
		<span id={spanId} className={classes} onClick={promptInput}>
			{stackImages &&
				images &&
				images.map((e) => (
					<img
						key={uuidv4()}
						alt={title}
						className={(outline && "image") || ""}
						hidden={!(e.src === selectedImage) && !hidden}
						id={imgId}
						src={e.src}
						style={{ ...extraStyling }}
					/>
				))}
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
