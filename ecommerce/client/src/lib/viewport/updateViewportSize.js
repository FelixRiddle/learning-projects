export const updateViewportSize = (cbSetViewportSize, from) => {
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

export const updateViewportSizeFn = (cbSetViewportSize) => {
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
