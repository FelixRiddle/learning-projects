import React from "react";
import { useViewportSize } from "../../../../lib/viewport/useViewportSize";

function BigImage(props) {
	const { name, imageClasses, selectedImage } = props;
	const { viewportSize } = useViewportSize();

	return (
		<div>
			<img alt={name} className={imageClasses} src={selectedImage} />
		</div>
	);
}

export default BigImage;
