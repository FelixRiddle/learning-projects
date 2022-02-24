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

	const cbImageSelectorClasses = (settings) => {
		const isSelected = settings.isSelected;

		const conditionHellResult =
			"tiny-image " + (isSelected && "selected-image");

		return conditionHellResult;
	};

	useEffect(() => {
		images.map((e) => {
			setFullImageUrls((prevInput) => {
				const result = [...prevInput, serverUrl + e];
				setSelectedImage(result[0]);
				return result;
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
				cbImageClasses={(settings) => cbImageSelectorClasses(settings)}
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
