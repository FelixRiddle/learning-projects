/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { resizeByPercentage } from "../../../../../../lib/images/resizer";
import { useViewportSize } from "../../../../../../lib/viewport/useViewportSize";
import { CreateProductContext } from "../../../CreateProduct";
import { image_resizer } from "../../../lib/image_resizer";

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
		title,
		changeFn,
		name,
		// An object like this {width: 60, height: 40}
		resizeImagePercentage,
		extraStyling,
		stackImages,
		images, // Array of images
		outline,
	} = props;
	const { viewportSize } = useViewportSize(true);
	const [spanId] = useState(uuidv4());
	// imageComponents depends on resized images.
	const [imageComponents, setImageComponents] = useState([]);

	const promptInput = (e) => {
		document.getElementById("file-input").click();
	};

	// For resizing the parent element
	useEffect(() => {
		if (!resizeImagePercentage) return;
		if (!viewportSize) return;

		// Resizes the canvas width and height if the user
		// resizes the window
		const parentElement = document.getElementById(spanId);
		if (parentElement) {
			resizeByPercentage(
				resizeImagePercentage,
				viewportSize,
				(newWidth, newHeight) => {
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
			);
		}
	}, [resizeImagePercentage, spanId, viewportSize, setConfig, images]);

	useEffect(() => {
		const totalFiles = [...input.images];
		totalFiles.push(defaultUploadImage);

		const newComponentArray = [];
		for (let i in totalFiles) {
			i = parseInt(i);

			// Just in case
			if (
				!(
					typeof totalFiles[i] === "object" || typeof totalFiles[i] === "string"
				)
			) {
				continue;
			}

			const image = {};

			// To create an image url from a file
			if (typeof totalFiles[i] === "object")
				image.src = URL.createObjectURL(totalFiles[i]);
			else image.src = totalFiles[i];

			// I'm using images to store more information
			const img = new Image();

			// Wait till the image loads
			img.onload = () => {
				const imageName = totalFiles[i]["name"];
				const currentImage = images[i];

				// Resize images to fit the canvas
				image_resizer(img, config, (width, height) => {
					img.style.width = width + "px";
					img.style.height = height + "px";
				});

				newComponentArray.push(
					<img
						alt={(imageName && imageName) || title}
						className={
							(selectedImage === defaultImage && "-------") ||
							(outline && "image") ||
							""
						}
						hidden={!(currentImage && currentImage.src === selectedImage)}
						id={uuidv4()}
						key={uuidv4()}
						src={(img.src === defaultImage && defaultUploadImage) || img.src}
						style={{
							...extraStyling,
							width: img.style.width,
							height: img.style.height,
						}}
					/>
				);

				setImageComponents(() => {
					return [...newComponentArray];
				});
			};
			img.src = image.src;
		}
	}, [
		config,
		defaultImage,
		defaultUploadImage,
		extraStyling,
		images,
		input.images,
		outline,
		selectedImage,
		title,
	]);

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
					// value={input.images}
					onChange={changeFn}
					style={{ position: "absolute" }}
					type="file"
				/>
			</form>
		</span>
	);
}

export default UploadImage;
