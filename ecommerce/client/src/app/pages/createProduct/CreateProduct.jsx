/* eslint-disable no-new-wrappers */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Css
import "./CreateProduct.css";

// Components
import AlertV2 from "../../components/alertv2/AlertV2";
import BigImageWrapper from "../../components/images/upload/big-image-wrapper/BigImageWrapper";
import Description from "./components/description/Description";
import Form from "./components/form/Form";
import ImageSelector from "../../components/images/image_selector/ImageSelector";

// Others
import { remove_images } from "./lib/transform_input";
import { getAnyMessage } from "../../../lib/debug/handleMessages";

export const CreateProductContext = React.createContext();

function CreateProduct() {
	const user = useSelector((state) => state.user);
	const { maxImages, serverUrl } = useSelector((state) => state.constants);

	// Icons
	const [arrowIcon] = useState(`${serverUrl}public/iconsx64/arrow_right_1.png`);
	const [defaultImage] = useState(`${serverUrl}public/iconsx64/image_1.png`);
	const [defaultUploadImage] = useState(
		`${serverUrl}public/iconsx64/upload_1.png`
	);
	const [disabledImage] = useState(
		`${serverUrl}public/iconsx64/disabled_image_1.png`
	);

	// States
	const [config, setConfig] = useState({
		bigImageContainerSize: {
			width: 0,
			height: 0,
		},
	});
	const [images, setImages] = useState([]);
	const [imgSizes, setImgSizes] = useState([
		{
			width: 0,
			height: 0,
			index: 0,
		},
	]);
	const [input, setInput] = useState({
		description: "",
		images: [],
		name: "",
		price: "",
		stock: "",
	});
	const [loading, setLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState(defaultUploadImage);
	const [status, setStatus] = useState({
		message: "",
		error: false,
		field: "",
		state: "",
		show: false,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (const key in Object.entries(input.images)) {
			// console.log(`Key: ${key}`);
			// console.log(`Appending:`, input.images[key]);
			formData.append("images", input.images[key]);
		}

		const newInput = remove_images(input);
		// console.log(`New Input:`, newInput);
		// console.log(`Images:`, input.images);
		for (const key of Object.keys(newInput)) {
			formData.append(key, input[key]);
		}
		formData.append("_id", user._id);

		await axios
			.post(`${serverUrl}api/products/create`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"X-Content-Type-Options": "nosniff",
				},
			})
			.then((res) => handleResponse(res, res.data, formData))
			.catch((err) => handleError(err));
	};

	const handleResponse = async (res, data, formData) => {
		return getAnyMessage({
			debug: res,
			options: {
				reorganizedKeys: ["description", "images", "name", "price", "stock"],
			},
			placeholderValues: ["Description", "Images", "Name", "Price", "Stock"],
			setCB: setStatus,
		});
	};

	const handleError = (err) => {
		console.error(err);
	};

	const handleInputChange = (e) => {
		const { name, value, type } = e.target;
		const maxNumberOfDecimals = 4;
		const val = {};

		// If the user input is for example: 3.9999999999999999999999999999
		// Limit it to the specified amount in "maxNumberOfDecimals"
		if (type === "number") {
			val.result = new Number(parseFloat(value).toFixed(maxNumberOfDecimals));
		}

		return setInput((prevInput) => {
			return {
				...prevInput,
				[name]: val.result || value,
			};
		});
	};

	const handleTinyImageClick = (imageSrc) => {
		setSelectedImage(() => imageSrc);
	};

	const cbImageSelectorDisabled = (settings) => {
		// Check if current image is the last image
		return images.length > maxImages && settings.imageSrc === defaultImage;
	};

	const cbImageSelectorClasses = (settings) => {
		const isLastImage =
			images.length > maxImages && settings.imageSrc === defaultImage;
		const isSelected = settings.isSelected;

		const conditionHellResult =
			"tiny-image " +
			// If it is not the last image, it can be selected by the user
			((!isLastImage && isSelected && "selected-image") ||
				(isLastImage && "last-image") ||
				"");

		return conditionHellResult;
	};

	const cbImageSelectorImageSrc = (settings) => {
		// Check if current image is the last image
		const isLastImage =
			images.length > maxImages && settings.imageSrc === defaultImage;
		return (isLastImage && disabledImage) || settings.imageSrc;
	};

	useEffect(() => {
		const image = new Image();
		image.src = defaultImage;
		setImages([image]);
	}, [defaultImage]);

	useEffect(() => {
		// If there is no image selected, set the first image as
		// the selected image.
		if (
			typeof images !== "undefined" &&
			typeof images[0] !== "undefined" &&
			typeof images[0].src !== "undefined"
		) {
			let setImageAt0 = true;
			for (let i in images) {
				i = parseInt(i);
				if (images[i].src === selectedImage) {
					setImageAt0 = false;
					break;
				}
			}

			if (setImageAt0) setSelectedImage(images[0].src);
		}
	}, [images, selectedImage]);

	return (
		<div className="create-product">
			<CreateProductContext.Provider
				value={{
					arrowIcon,
					config,
					defaultImage,
					defaultUploadImage,
					handleInputChange,
					input,
					images,
					imgSizes,
					loading,
					maxImages,
					setConfig,
					selectedImage,
					setInput,
					setImages,
					setImgSizes,
					setLoading,
					setSelectedImage,
					setStatus,
					status,
				}}
			>
				{/* TODO: Move the notification as the user scrolls the page */}
				<AlertV2 center={true} setStatus={setStatus} status={status} />

				<h2 className="title">Create a product</h2>
				<div className="form-and-image">
					<BigImageWrapper />
					<Form />
				</div>

				{/* For selecting the image with point and click */}
				<ImageSelector
					cbDisabled={(settings) => cbImageSelectorDisabled(settings)}
					cbImageClasses={(settings) => cbImageSelectorClasses(settings)}
					cbImageSrc={(settings) => cbImageSelectorImageSrc(settings)}
					divClasses={"image-selector"}
					handleTinyImageClick={handleTinyImageClick}
					images={images}
					selectedImage={selectedImage}
					tinyImageDivClasses={"image-element"}
				/>

				{/* Product description */}
				<Description />

				<span className="button-position">
					<button className="btn" type="submit" onClick={handleSubmit}>
						Submit product
					</button>
				</span>
			</CreateProductContext.Provider>
		</div>
	);
}

export default CreateProduct;
