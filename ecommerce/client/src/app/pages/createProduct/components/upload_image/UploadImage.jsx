/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { files_to_images } from "../../../../../lib/files/images/files_to_images";
import { change_child_elements } from "../../../../../lib/html/change_child_elements";

import { CreateProductContext } from "../../CreateProduct";
import { print_sizes, resize_all } from "../../lib/image_resizer";

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
		viewportSize,
		extraStyling,
		stackImages,
		images, // Array of images
		outline,
	} = props;
	
	const [spanId] = useState(uuidv4());
	const [resizedImages, setResizedImages] = useState([]);
	// imageComponents depends on resized images.
	const [imageComponents, setImageComponents] = useState([]);
	const [imgIds, setImgIds] = useState([]);

	const promptInput = (e) => {
		document.getElementById("file-input").click();
	};

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

	// Create a new array of images, this images, will be shown.
	useEffect(() => {
		const newArray = files_to_images(input.images);
		console.log(`New array`);
		console.log(newArray);
		
		console.log(`New images`);
		const newImages = [...resize_all(newArray, config)];
		print_sizes(newImages);

		setResizedImages(() => newImages);
	}, [input.images, config]);

	useEffect(() => {
		const newComponentsId = [];
		const newComponentArray = [];

		for (let i in resizedImages) {
			i = parseInt(i);
			
			const newId = uuidv4();
			newComponentsId.push(newId);

			newComponentArray.push(
				<img
					alt={(resizedImages[i].alt && resizedImages[i].alt) || title}
					className={
						(resizedImages[i].src === defaultImage && "-------") ||
						(outline && "image") ||
						""
					}
					hidden={!(images[i].src === selectedImage)}
					id={newId}
					key={uuidv4()}
					src={
						(resizedImages[i].src === defaultImage && defaultUploadImage) ||
						resizedImages[i].src
					}
					style={{
						...extraStyling,
						width: resizedImages[i].width,
						height: resizedImages[i].height,
					}}
				/>
			);
		}

		setImgIds(() => [...newComponentsId]);

		setImageComponents(() => {
			return [...newComponentArray];
		});
	}, [
		resizedImages,
		defaultImage,
		defaultUploadImage,
		extraStyling,
		images,
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
					onChange={changeFn}
					style={{ position: "absolute" }}
					type="file"
				/>
			</form>
		</span>
	);
}

export default UploadImage;
