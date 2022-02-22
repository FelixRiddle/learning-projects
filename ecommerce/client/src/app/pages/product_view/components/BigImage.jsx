import React from "react";

function BigImage(props) {
	const { name, serverUrl, selectedImage } = props;

	return (
		<div>
			<img
				alt={name}
				className={"product-image"}
				src={serverUrl + selectedImage}
			/>
		</div>
	);
}

export default BigImage;
