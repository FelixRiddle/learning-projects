import { useState } from "react";

export const useViewportSize = (update) => {
	const [viewportSize, setViewportSize] = useState({
		width: Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		),
		height: Math.max(
			document.documentElement.clientHeight || 0,
			window.innerHeight || 0
		),
	});

	// When the user resizes the window
	if (update) {
		window.onresize = () => {
			// console.log(`useViewoprtSize, Viewport size:`, viewportSize);
			setViewportSize({
				width: Math.max(
					document.documentElement.clientWidth || 0,
					window.innerWidth || 0
				),
				height: Math.max(
					document.documentElement.clientHeight || 0,
					window.innerHeight || 0
				),
			});
		};
	}

	return { viewportSize, setViewportSize };
};
