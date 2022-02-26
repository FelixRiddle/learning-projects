import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { resizeByPercentage } from "../../../../lib/images/resizer";
import { useCssDetails } from "../../../../lib/misc/useCssDetails";
import { updateViewportSize } from "../../../../lib/viewport/updateViewportSize";
import { useViewportSize } from "../../../../lib/viewport/useViewportSize";
import ParentSizeOrSmallerImage from "../../../components/images/parent_size_or_smaller_image/ParentSizeOrSmallerImage";

function BigImage(props) {
	const { divClasses, images, imageClasses, selectedImage } = props;

	// States
	const { cssDetails } = useCssDetails();
	const [config, setConfig] = useState();
	const [divId] = useState(uuidv4());
	const [imageComponents, setImageComponents] = useState([]);
	const { viewportSize, setViewportSize } = useViewportSize();

	updateViewportSize(setViewportSize);

	// For resizing the parent element
	useEffect(() => {
		if (!cssDetails) return;
		if (!viewportSize) return;

		// Resizes the canvas width and height if the user
		// resizes the window
		const parentElement = document.getElementById(divId);
		if (parentElement) {
			const resizeImagePercentage = cssDetails.bigImage;

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
	}, [cssDetails, divId, viewportSize]);

	// Create the image components
	useEffect(() => {
		const resizeImagePercentage = cssDetails.bigImage;

		// console.log(`Viewport size changed:`);
		// console.log(viewportSize);
		if (!resizeImagePercentage) return;
		if (!viewportSize) return;

		// Resizes the canvas width and height if the user
		// resizes the window
		const parentElement = document.getElementById(divId);
		if (parentElement) {
			const tempImageElements = [];

			// console.log(`Selected image:`, selectedImage);
			for (let i in images) {
				i = parseInt(i);

				// console.log(`Current image:`, images[i]);
				// console.log(`Eval result:`, images[i] === selectedImage);

				tempImageElements.push(
					<ParentSizeOrSmallerImage
						config={config}
						extraStyling={{ position: "absolute" }}
						hidden={images[i] === selectedImage}
						id={uuidv4()}
						imageAlt={""}
						imageClasses={imageClasses}
						imageUrl={images[i]}
						key={uuidv4()}
					/>
				);
			}

			setImageComponents(tempImageElements);
		}
	}, [
		cssDetails,
		config,
		divId,
		images,
		imageClasses,
		selectedImage,
		viewportSize,
	]);

	return (
		<div className={divClasses} id={divId}>
			{imageComponents.map((e) => {
				return e;
			})}
		</div>
	);
}

export default BigImage;
