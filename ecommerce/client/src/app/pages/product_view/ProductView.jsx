import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import BigImage from "./components/BigImage";
import "./ProductView.css";
import ImageSelector from "../../components/images/image_selector/ImageSelector";
import Title from "../../components/text/title/Title";
import { useFullImageUrls } from "../../../lib/images/useFullImageUrls";
import { useCssDetails } from "../../../lib/misc/useCssDetails";
import { useViewportSize } from "../../../lib/viewport/useViewportSize";

const serverUrl = "http://localhost:3001/";

function ProductView(props) {
	const { description, name, images } = props;

	const { cssDetails } = useCssDetails();
	const [divId] = useState(uuidv4());
	const { fullImageUrls } = useFullImageUrls(images);
	const [selectedImage, setSelectedImage] = useState(serverUrl + images[0]);
	const { viewportSize } = useViewportSize(true);

	const handleTinyImageClick = (imageSrc) => {
		setSelectedImage(imageSrc);
	};

	const cbImageSelectorClasses = (settings) => {
		const isSelected = settings.isSelected;

		const conditionHellResult =
			"tiny-image " + (isSelected && "selected-image");

		return conditionHellResult;
	};

	// useEffect(() => {
	// 	console.log(`Product view, viewportSize:`, viewportSize);
	// }, [viewportSize]);

	return (
		<div className="ProductView">
			<div className="product">
				<div className="images">
					<BigImage
						divClasses={"big-image"}
						images={fullImageUrls}
						imageClasses={"product-image"}
						selectedImage={selectedImage}
						viewportSize={viewportSize}
					/>

					{/* For selecting the image with point and click */}
					<ImageSelector
						cbImageClasses={(settings) => cbImageSelectorClasses(settings)}
						divClasses={"image-selector"}
						// extraStyling={{ width: "200px" }}
						handleTinyImageClick={handleTinyImageClick}
						divId={divId}
						images={fullImageUrls}
						resize={{
							width:
								cssDetails && cssDetails.bigImage && cssDetails.bigImage.width,
						}}
						viewportSize={viewportSize}
						selectedImage={selectedImage}
						imageClasses={"tiny-image"}
						tinyImageDivClasses={"image-element"}
					/>
				</div>
				<div className="info">
					<Title classes={"title"} title={name} width={560} height={50} />
				</div>
			</div>
			<h3>Description</h3>
			<p>{description}</p>
		</div>
	);
}

export default ProductView;
