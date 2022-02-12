/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { CreateProductContext } from "../../CreateProduct";

function UploadImage(props) {
	const { config, defaultImage, defaultUploadImage, selectedImage, setConfig } =
		useContext(CreateProductContext);

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
	const [imageComponents, setImageComponents] = useState([]);

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
	}, [resizeImagePercentage, spanId, viewportSize, setConfig, images]);

	useEffect(() => {
		// Resize the image to the canvas size
		let widthResult = parseInt(config.bigImageContainerSize.width);
		let heightResult = parseInt(config.bigImageContainerSize.height);

		setImageComponents((prevInput) => {
			const newComponentArray = [];
			for (let i in images) {
				i = parseInt(i);
				const image = new Image();
				image.src = images[i].src;

				const imageWidth = image.width;
				const imageHeight = image.height;
				const canvasWidth = parseInt(config.bigImageContainerSize.height);
				const canvasHeight = parseInt(config.bigImageContainerSize.height);
				
				if (imageWidth < canvasWidth) {
					console.log(`Rezising image to original size: ${image.width}`);
					widthResult = image.width;
				}

				if (imageHeight < canvasHeight) {
					heightResult = image.height;
				}

				newComponentArray.push(<img />);
			}

			return [...prevInput];
		});
		// const newComponent = <div className="test"></div>;
		// console.log(newComponent.key);
		// console.log(newComponent.props);
		// console.log(newComponent.props.className);
		// console.log(Object.entries(newComponent.props));
		// console.log(newComponent.type);
	}, [images, config]);

	/*
	Posible options to solve the first image not being resized problem:
	1) Create an useState with the selected image as a component, and render it directly
	resized, when it loads(onload event) within an useEffect.
	2) Create an array with every image as a component, and resize those images
	when the user resizes the website.
	*/

	return (
		<span id={spanId} className={classes} onClick={promptInput}>
			{stackImages &&
				images &&
				images.map((e) => {
					// Resize the image to the canvas size
					let widthResult = parseInt(config.bigImageContainerSize.width);
					let heightResult = parseInt(config.bigImageContainerSize.height);
					// console.log(`Element`);
					// console.log(e);

					if (e.src === selectedImage) {
						const image = new Image();
						image.src = e.src;

						const imageWidth = image.width;
						const imageHeight = image.height;
						const canvasWidth = parseInt(config.bigImageContainerSize.height);
						const canvasHeight = parseInt(config.bigImageContainerSize.height);
						// console.log(`Image width: ${imageWidth}`);
						// console.log(`Image height: ${imageHeight}`);
						// console.log(`Typeof: ${typeof imageWidth}`);
						// console.log(`Big image width container size: ${canvasWidth}`);
						// console.log(`Big image height container size: ${canvasHeight}`);
						// console.log(`Typeof: ${typeof canvasWidth}`);

						if (imageWidth < canvasWidth) {
							// console.log(`Rezising image to original size: ${image.width}`);
							widthResult = image.width;
						}

						if (imageHeight < canvasHeight) {
							heightResult = image.height;
						}

						// console.log(`Image width resized to: ${widthResult}`);
						// console.log(`Image height resized to: ${heightResult}`);
					} else if (e.src === defaultImage) {
						const image = new Image();
						image.src = defaultUploadImage;

						const imageWidth = image.width;
						const imageHeight = image.height;

						if (imageWidth < widthResult) {
							widthResult = image.width;
						}

						if (imageHeight < heightResult) {
							heightResult = image.height;
						}
					}

					widthResult += "px";
					heightResult += "px";
					return (
						<img
							key={uuidv4()}
							alt={title}
							className={
								(e.src === defaultImage && "-------") ||
								(outline && "image") ||
								""
							}
							hidden={!(e.src === selectedImage) && !hidden}
							id={imgId}
							src={(e.src === defaultImage && defaultUploadImage) || e.src}
							style={{
								...extraStyling,
								width: widthResult,
								height: heightResult,
							}}
						/>
					);
				})}
			<form id="image-input">
				<input
					id="file-input"
					name={name}
					hidden={true}
					multiple={true}
					onChange={changeFn}
					style={{ position: "absolute" }}
					type="file"
				/>
			</form>
		</span>
	);
}

export default UploadImage;
