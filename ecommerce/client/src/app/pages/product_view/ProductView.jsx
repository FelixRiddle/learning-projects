import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./ProductView.css";

import ImageSelector from "../../components/images/image_selector/ImageSelector";
import Title from "../../components/text/title/Title";
import Paragraph from "../../components/text/paragraph/Paragraph";
import Price from "../../components/text/price/Price";
import BigImage from "../../components/images/big_image/BigImage";
import AlertV2 from "../../components/alertv2/AlertV2";

import { useFullImageUrls } from "../../../lib/images/useFullImageUrls";
import { useCssDetails } from "../../../lib/misc/useCssDetails";
import { useViewportSize } from "../../../lib/viewport/useViewportSize";
import { useProduct } from "../../../lib/products/useProduct";
import { getAnyMessage } from "../../../lib/debug/handleMessages";
import { insertVariables } from "../../../lib/redux/actions/variablesSlice";

function ProductView() {
	const { serverUrl } = useSelector((state) => state.constants);
	const variables = useSelector((state) => state.variables);
	const dispatch = useDispatch();

	const { productId, userId } = useParams();
	const { product, resData } = useProduct({ productId, userId });

	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	const { cssDetails } = useCssDetails();
	const [config, setConfig] = useState({});
	const [divId] = useState(uuidv4());
	const { fullImageUrls } = useFullImageUrls(images);
	const [paragraphHeight, setParagraphHeight] = useState();
	const [selectedImage, setSelectedImage] = useState("");
	const [status, setStatus] = useState({});
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

	// For notification messages
	useEffect(() => {
		if (resData) {
			getAnyMessage({
				debug: resData,
				setCB: setStatus,
				options: { noWarn: true },
			});
		}
	}, [resData]);

	// Updating values
	useEffect(() => {
		// console.log(`Product:`, product);
		if (product) {
			setDescription(product.description);
			setImages(product.images);
			setName(product.name);
			setPrice(product.price);
		}
	}, [product]);

	window.onload = () => {
		setSelectedImage(serverUrl + (images && images[0]));
		dispatch(
			insertVariables({
				...variables,
				scrollHeight: document.body.scrollHeight,
			})
		);
	};

	return (
		<div
			className="ProductView"
			style={{
				height:
					viewportSize.height &&
					paragraphHeight &&
					viewportSize.height + paragraphHeight + 10,
			}}
		>
			<AlertV2 center={true} setStatus={setStatus} status={status} />

			<div className="product">
				<div className="left">
					<BigImage
						config={config}
						divClasses={"big-image"}
						images={fullImageUrls}
						imageClasses={"product-image"}
						imageParentDivClasses={"dynamic-image"}
						selectedImage={selectedImage}
						setConfig={setConfig}
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
					<div>
						<h3>Description</h3>
						<Paragraph
							content={description}
							resize={cssDetails.bigImage}
							viewportSize={viewportSize}
							getParagraphHeight={setParagraphHeight}
						/>
					</div>
				</div>
				<div className="right">
					<Title classes={"title"} title={name} />
					<div>
						<p className="small">
							Note: Depending on the payment method, the price may vary.
						</p>
						<Price paragraphClasses={"price"} price={price && price} />
					</div>
					<button className="btn">Buy now</button>
					<div className="separation"></div>
					<button className="btn-1">Add to the cart</button>
				</div>
			</div>
		</div>
	);
}

export default ProductView;
