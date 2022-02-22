import React, { useState } from "react";

import BigImage from "./components/BigImage";
import "./ProductView.css";

function ProductView(props) {
	const { description, name, images } = props;

	const [serverUrl] = useState("http://localhost:3001/");
	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<div>
			<p>{name}</p>
			<BigImage
				name={name}
				selectedImage={selectedImage}
				serverUrl={serverUrl}
			/>
			<p>{description}</p>
		</div>
	);
}

export default ProductView;
