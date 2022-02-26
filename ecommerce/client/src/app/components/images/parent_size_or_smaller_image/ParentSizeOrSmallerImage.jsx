import React, { useState, useEffect } from "react";

import { useViewportSize } from "../../../../lib/viewport/useViewportSize";
import { image_resizer } from "../../../pages/createProduct/lib/image_resizer";

function ParentSizeOrSmallerImage(props) {
	const { config, extraStyling, hidden, imageClasses, imageUrl, imageAlt } =
		props;

	const { viewportSize } = useViewportSize;
	const [showImage, setShowImage] = useState(false);
	const [imageWidth, setImageWidth] = useState();
	const [imageHeight, setImageHeight] = useState();

	useEffect(() => {
		let isMounted = true;
		const image = new Image();

		new Promise((resolve, reject) => {
			image.onload = () => resolve();
			image.onerror = reject;
			image.src = imageUrl;
		}).then(() => {
			if (isMounted) {
				// Resize images to fit the canvas
				image_resizer(image, config, (width, height) => {
					// image.style.width = width + "px";
					// image.style.height = height + "px";
					setImageWidth(width);
					setImageHeight(height);
				});
				setShowImage(true);
			}
		});

		// To prevent state updates when the component is not mounted)?
		return () => {
			isMounted = false;
		};
	}, [config, imageUrl, viewportSize]);

	useEffect(() => {
		// console.log(`For: ${imageUrl}`);
		// console.log(`Show image:`, showImage);
		// console.log(`Hidden:`, hidden);
		// console.log(`Eval:`, !hidden && !showImage);
	}, [showImage, hidden, imageUrl]);

	return (
		<div>
			{showImage && (
				<img
					alt={imageAlt}
					className={imageClasses}
					hidden={!hidden || !showImage}
					src={imageUrl}
					style={{ ...extraStyling, width: imageWidth, height: imageHeight }}
				/>
			)}
		</div>
	);
}

export default ParentSizeOrSmallerImage;