import React from "react";

function BigImage(props) {
	const { name, imageClasses, selectedImage } = props;

	return (
		<div>
			<img
				alt={name}
				className={imageClasses}
				src={selectedImage}
			/>
		</div>
	);
}

export default BigImage;
