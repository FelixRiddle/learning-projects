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
		const image = new Image();
		image.onload = () => {
			// Resize images to fit the canvas
			image_resizer(image, config, (width, height) => {
				// image.style.width = width + "px";
				// image.style.height = height + "px";
				setImageWidth(width);
				setImageHeight(height);
			});

			setShowImage(true);
		};
		image.src = imageUrl;
	}, [config, imageUrl, viewportSize]);

	return (
		<div>
			{showImage && (
				<img
					alt={imageAlt}
					className={imageClasses}
					hidden={!hidden && !showImage}
					src={imageUrl}
					style={{ ...extraStyling, width: imageWidth, height: imageHeight }}
				/>
			)}
		</div>
	);
}

export default ParentSizeOrSmallerImage;
