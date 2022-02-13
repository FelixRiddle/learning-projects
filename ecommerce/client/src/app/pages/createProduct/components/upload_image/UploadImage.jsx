/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { CreateProductContext } from "../../CreateProduct";

function UploadImage(props) {
	const {
		config,
		defaultImage,
		defaultUploadImage,
		input,
		selectedImage,
		setConfig,
	} = useContext(CreateProductContext);

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
	const [imageComponents, setImageComponents] = useState([]);
	const [imgIds, setImgIds] = useState([]);

	const promptInput = (e) => {
		document.getElementById("file-input").click();
	};

	/*
	useEffect(() => {
		setHidden(true);
		// Use .clientWidth to exclude scrollbars
		// https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
		const parentElement = document.getElementById(spanId);
		const parentWidth = parentElement.clientWidth;
		const parentHeight = parentElement.clientHeight;
		// console.log(`Parent width: ${parentWidth}`);
		// console.log(`Parent height: ${parentHeight}`);
		
		console.log(`Resizing image`);

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
	}, [linkref, spanId, resizeImagePercentage, selectedImage]);*/

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
		setImageComponents(() => {
			const newComponentsId = [];
			const newComponentArray = [];
			for (let i in images) {
				i = parseInt(i);

				const image = new Image();
				image.src = images[i].src;

				// Get the name error-proof
				if (
					i < images.length &&
					input &&
					input.images &&
					input.images[i] &&
					input.images[i]["name"]
				) {
					// console.log(`Current image`);
					// console.log(input.images[i]);
					// console.log(`Its name`);
					// console.log(input.images[i]["name"]);
					image.alt = input.images[i]["name"];
					images[i].alt = input.images[i]["name"];
				}

				// const imageWidth = image.width;
				// const imageHeight = image.height;

				// console.log(`Image width: ${imageWidth}`);
				// console.log(`Image height: ${imageHeight}`);
				// console.log(`Canvas width: ${canvasWidth}`);
				// console.log(`Canvas height: ${canvasHeight}`);

				// if (imageWidth < canvasWidth) {
				// 	console.log(`Rezising image to original size: ${image.width}`);
				// 	widthResult = image.width;
				// }

				// if (imageHeight < canvasHeight) {
				// 	heightResult = image.height;
				// }

				const newId = uuidv4();
				newComponentsId.push(newId);

				newComponentArray.push(
					<img
						alt={(image.alt && image.alt) || title}
						className={
							(images[i].src === defaultImage && "-------") ||
							(outline && "image") ||
							""
						}
						hidden={!(images[i].src === selectedImage) && !hidden}
						id={newId}
						key={uuidv4()}
						src={
							(images[i].src === defaultImage && defaultUploadImage) ||
							images[i].src
						}
						// style={{
						// 	...extraStyling,
						// 	width: widthResult + "px",
						// 	height: heightResult + "px",
						// }}
					/>
				);
			}

			setImgIds(() => [...newComponentsId]);
			return [...newComponentArray];
		});
		// const newComponent = <div className="test"></div>;
		// console.log(newComponent.key);
		// console.log(newComponent.props);
		// console.log(newComponent.props.className);
		// console.log(Object.entries(newComponent.props));
		// console.log(newComponent.type);
	}, [
		config,
		extraStyling,
		defaultImage,
		defaultUploadImage,
		hidden,
		images,
		input,
		outline,
		selectedImage,
		title,
	]);

	/*
	The problem: When the user uploads an image for the first time, it is
	not being shown.
	*/
	// Get the image components of the span element and resize those
	// to fit the canvas.
	useEffect(() => {
		// Get the span element
		const spanElement = document.getElementById(spanId);
		// console.log(`Span element`);
		// console.log(spanElement);

		// If span element exists
		if (spanElement) {
			// console.log(`Every children`);
			// console.log(spanElement.children);
			const elements = spanElement.children;
			const indexes = Object.entries(elements);
			// console.log(`Object entries`);
			// console.log(indexes);

			// Traverse keys and elements, but we are only going to use
			// the keys.
			for (let i in indexes) {
				// i is a string, so we convert it to a number
				i = parseInt(i);

				// .children collection, returns weird things, so we filter only
				// the elements that we need, for that we check if the key of
				// the element can be of type number.
				if (typeof parseInt(indexes[i][0]) === "number") {
					// console.log(`Element type: ${elements[i].tagName}`);

					// We check the type of the tag, we only want the images
					// so we convert it to lowercase and check if its an image.
					if (elements[i].tagName.toLowerCase() === "img") {
						// Get the current image
						// This image is already resized.
						const image = elements[i];
						if (image.src === selectedImage) {
							image.hidden = false;
						} else {
							image.hidden = true;
						}
						// console.log(`Image element`);
						// console.log(image);
						// console.log(`The image, in the image state`);
						// console.log(images[i]);

						// When the image loads
						image.onload = () => {
							// If the image is smaller than the canvas, resize it
							// to its original size.
							const imageWidth = images[i].width;
							const imageHeight = images[i].height;

							// Get the width and height of the canvas
							const canvasWidth = parseInt(config.bigImageContainerSize.width);
							const canvasHeight = parseInt(
								config.bigImageContainerSize.height
							);

							// Get the name error-proof
							if (
								i < images.length &&
								input &&
								input.images &&
								input.images[i] &&
								input.images[i]["name"]
							) {
								console.log(`Its name`);
								console.log(input.images[i]["name"]);
							}

							console.log(`Image width: ${imageWidth}`);
							console.log(`Image height: ${imageHeight}`);
							// If the image width is greater than the canvas width
							if (imageWidth > canvasWidth) {
								console.log(
									`The image is bigger, setting it to the canvas size.`
								);
								image.style.width = canvasWidth + "px";
								console.log(`New size: ${image.style.width}`);
							} else {
								console.log(`The image is smaller, setting the default size.`);
								image.style.width = imageWidth + "px";
								console.log(`New size: ${image.style.width}`);
							}

							if (imageHeight > canvasHeight) {
								image.style.height = canvasHeight + "px";
							} else {
								image.style.height = imageHeight + "px";
							}
						};
					}
				}
			}
		}
	}, [spanId, imageComponents, config, images, input, selectedImage]);

	return (
		<span id={spanId} className={classes} onClick={promptInput}>
			{stackImages && imageComponents && imageComponents.map((e) => e)}

			{/* This has to be the last element, if not, the resize functionality
			will break */}
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
