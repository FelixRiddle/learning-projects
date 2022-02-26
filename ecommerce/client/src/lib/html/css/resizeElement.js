import { resizeByPercentage } from "../../images/resizer";

export const resizeElement = (elementId, percentages, viewportSize) => {
	// For resizing the parent element
	if (!percentages) return;
	if (!viewportSize) return;

	// Resizes the canvas width and height if the user
	// resizes the window
	const element = document.getElementById(elementId);

	// The one that wasn't provided won't change
	const newPercentages = {
		width: (percentages && percentages.width) || 1,
		height: (percentages && percentages.height) || 1,
	};

	if (element) {
		resizeByPercentage(newPercentages, viewportSize, (newWidth, newHeight) => {
			// Set the new width and height
			const widthResult = newWidth + "px";
			const heightResult = newHeight + "px";

			if (percentages.width) element.style.width = widthResult;
			if (percentages.height) element.style.height = heightResult;
		});
	}
};
