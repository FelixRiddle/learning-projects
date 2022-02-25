export const updateViewportSize = (cbSetViewportSize) => {
	// When the user resizes the window
	window.onresize = () => {
		cbSetViewportSize({
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
};
