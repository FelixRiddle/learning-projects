import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { resizeElement } from "../../../../lib/html/css/resizeElement";

import TinyImage from "./tiny_image/TinyImage";

function ImageSelector(props) {
	const {
		// Callbacks for more control
		cbImageClasses,
		cbImageSrc,
		cbDisabled,

		divClasses,
		divId,
		extraStyling,
		handleTinyImageClick,
		images,
		imageClasses,
		selectedImage,
		resize,
		viewportSize,
		tinyImageDivClasses,
	} = props;

	const [alternativeDivId] = useState(uuidv4());

	useEffect(() => {
		// Error proof
		if (!viewportSize || (!viewportSize.width && !viewportSize.height)) return;
		if (!resize || (!resize.width && !resize.height)) return;

		const settings = {};
		settings.id = divId || alternativeDivId;

		resizeElement(settings.id, resize, viewportSize);
	}, [alternativeDivId, divId, resize, viewportSize]);

	useEffect(() => {
		if (!images)
			console.warn(
				`No images provided on src/app/components/images/image_selector`
			);
	}, [images]);

	return (
		<div
			className={divClasses}
			id={divId || alternativeDivId}
			style={{ ...extraStyling }}
		>
			{images &&
				images.map((e, index) => {
					const settings = {
						imageSrc: "",
						isDisabled: false,
						isLastImage: index === images.length - 1,
						isPenultimateImage: index === images.length - 2,
						isSelected: false,
						cbImageClassesResult: "",
						cbImageSrcResult: "",
					};

					// Check if the images given are objects or strings.
					if (typeof e === "object" && e.src) {
						// Set this image as the image to display
						settings.imageSrc = e.src;
					} else if (typeof e === "string") {
						// Set this image as the image to display
						settings.imageSrc = e;
					}

					// Check if it's the selected image
					if (settings.imageSrc === selectedImage) settings.isSelected = true;

					// Get the result of the callback if it was provided
					if (cbImageClasses)
						settings.cbImageClassesResult = cbImageClasses(settings);
					if (cbImageSrc) settings.cbImageSrcResult = cbImageSrc(settings);
					if (cbDisabled) settings.isDisabled = cbDisabled(settings);

					return (
						<TinyImage
							key={uuidv4()}
							imageSrc={settings.cbImageSrcResult || settings.imageSrc}
							index={index}
							clickFn={handleTinyImageClick}
							classes={tinyImageDivClasses}
							imageClasses={settings.cbImageClassesResult || imageClasses}
							isDisabled={settings.isDisabled}
							selectedImage={selectedImage}
						/>
					);
				})}
		</div>
	);
}

export default ImageSelector;
