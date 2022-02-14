/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { CreateProductContext } from "../../CreateProduct";
import { image_resizer } from "../../lib/image_resizer";

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
	// imageComponents depends on resized images.
	const [imageComponents, setImageComponents] = useState([]);

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

	useEffect(() => {
		// Get the motherf**ing files
		const totalFiles = [...input.images];

		const newComponentArray = [];
		for (let i in totalFiles) {
			i = parseInt(i);

			// The two latest elements are index and a function
			if (typeof totalFiles[i] !== "object") continue;

			// To create an image url from a file
			const imgUrl = URL.createObjectURL(totalFiles[i]);

			// I'm using images to store more information
			const img = new Image();

			// Wait till the image loads
			img.onload = () => {
				console.log(`Image width: ${img.width}`);
				const imageName = totalFiles[i]["name"];

				// Resize images to fit the canvas
				image_resizer(img, config, (width, height) => {
					console.log(`Width: ${width}`);
					console.log(`Height: ${height}`);
					img.style.width = width + "px";
					img.style.height = height + "px";
					console.log(`Image style: ${img.style.width}`);
				});
				console.log(`Image style: ${img.style.width}`);

				newComponentArray.push(
					<img
						alt={(imageName && imageName) || title}
						className={
							(img.src === defaultImage && "-------") ||
							(outline && "image") ||
							""
						}
						hidden={!(images[i].src === selectedImage)}
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
			img.src = imgUrl;
			// img.id = uuidv4();
			// img.alt = totalFiles[i]["name"];

			// newImages.push(img);
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
					onChange={changeFn}
					style={{ position: "absolute" }}
					type="file"
				/>
			</form>
		</span>
	);
}

export default UploadImage;
