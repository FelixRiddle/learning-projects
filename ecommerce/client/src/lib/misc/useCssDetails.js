import { useState } from "react";

export const useCssDetails = () => {
	const [cssDetails] = useState({
		bigImage: {
			width: 60,
			height: 70,
		},
		productInputSize: {
			width: 40,
			height: 70,
		},
	});

	return { cssDetails };
};
