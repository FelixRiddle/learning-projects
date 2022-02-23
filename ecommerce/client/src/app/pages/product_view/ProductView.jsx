import React, { useEffect, useState } from "react";

import BigImage from "./components/BigImage";
import "./ProductView.css";
import ImageSelector from "../../components/images/image_selector/ImageSelector";

const serverUrl = "http://localhost:3001/";

function ProductView(props) {
	const { description, name, images } = props;

	const [selectedImage, setSelectedImage] = useState(
		serverUrl + images[0].replaceAll(" ", "%20")
	);
	const [fullImageUrls, setFullImageUrls] = useState([]);

	const handleTinyImageClick = (imageSrc) => {
		setSelectedImage(imageSrc);
	};

	useEffect(() => {
		images.map((e) => {
			setFullImageUrls((prevInput) => {
				return [...prevInput, serverUrl + e];
			});
			return e;
		});
	}, [images]);

	return (
		<div>
			<p>{name}</p>
			<BigImage
				name={name}
				imageClasses={"product-image"}
				selectedImage={selectedImage}
			/>

			{/* For selecting the image with point and click */}
			<ImageSelector
				divClasses={"image-selector"}
				handleTinyImageClick={handleTinyImageClick}
				images={fullImageUrls}
				selectedImage={selectedImage}
				imageClasses={"tiny-image"}
				tinyImageDivClasses={"image-element"}
			/>
			<p>{description}</p>
		</div>
	);
}

export default ProductView;
