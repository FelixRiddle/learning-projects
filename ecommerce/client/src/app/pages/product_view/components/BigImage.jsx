import React from "react";

function BigImage(props) {
	const { name, selectedImage } = props;

	return (
		<div>
			<img
				alt={name}
				className={"product-image"}
				src={selectedImage}
			/>
		</div>
	);
}

export default BigImage;
