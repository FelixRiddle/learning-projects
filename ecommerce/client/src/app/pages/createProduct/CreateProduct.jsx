import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { GlobalContext } from "../../App";
import { handleMessageValidationv2 } from "../../../lib/handleMessageValidation";
import "./CreateProduct.css";
import ShowTinyImage from "./components/ShowTinyImage";
import { v4 as uuidv4 } from "uuid";
import Form from "./components/form/Form";
import BigImageWrapper from "./components/big-image-wrapper/BigImageWrapper";
import { remove_images } from "./lib/transform_input";
import Description from "./components/description/Description";
import AlertV2 from "../../components/alertv2/AlertV2";

export const CreateProductContext = React.createContext();

// Constant values
const defaultImage = "http://localhost:3001/public/iconsx64/image_1.png";
const arrowIcon = "http://localhost:3001/public/iconsx64/arrow_right_1.png";
const defaultUploadImage = "http://localhost:3001/public/iconsx64/upload_1.png";
const disabledImage =
	"http://localhost:3001/public/iconsx64/disabled_image_1.png";
const maxImages = 15;
const cssDetails = {
	bigImage: {
		width: 60,
		height: 70,
	},
	productInputSize: {
		width: 40,
		height: 70,
	},
};

function CreateProduct() {
	// Global context(from App.jsx)
	const { user } = useContext(GlobalContext);

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
	const [viewportSize, setViewportSize] = useState({
		width: Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		),
		height: Math.max(
			document.documentElement.clientHeight || 0,
			window.innerHeight || 0
		),
	});

	const alertClick = () => {
		setStatus((prevInput) => {
			return {
				...prevInput,
				show: !prevInput.show,
			};
		});
	};

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
			// if (key === "images") continue;
			formData.append(key, input[key]);
		}
		formData.append("_id", user._id);

		await axios
			.post("http://localhost:3001/api/products/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"X-Content-Type-Options": "nosniff",
				},
			})
			.then((res) => handleResponse(res, res.data, formData))
			.catch((err) => handleError(err));
	};

	const handleResponse = async (res, data, formData) => {
		console.log(`Res status:`, res.status);
		console.log(`Data:`, data);
		console.log(`Joi message:`, data.joiMessage);
		console.log(`Message`, data.message);
		if (data.joiMessage && data.error) {
			const newMessage = handleMessageValidationv2(input, res, [
				"Description",
				"Images",
				"Name",
				"Price",
				"Stock",
			]);
			console.log(`New message:`, newMessage);
			setStatus({
				...status,
				message: newMessage,
				error: data.error,
				field: data.field,
				state: data.state,
				show: true,
			});
		} else if (data.message) {
			setStatus({
				...status,
				message: data.message,
				error: data.error,
				field: data.field,
				state: data.state,
				show: true,
			});
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		return setInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	const handleTinyImageClick = (imageSrc) => {
		setSelectedImage(() => imageSrc);
	};

	// When the user resizes the window
	window.onresize = () => {
		setViewportSize({
			width: Math.max(
				document.documentElement.clientWidth || 0,
				window.innerWidth || 0
			),
			height: Math.max(
				document.documentElement.clientHeight || 0,
				window.innerHeight || 0
			),
		});
	};

	useEffect(() => {
		const image = new Image();
		image.src = defaultImage;
		setImages([image]);
	}, []);

	useEffect(() => {
		// If there is no image selected, set the selected image as
		// the first image
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
					cssDetails,
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
					viewportSize,
				}}
			>
				<AlertV2
					state={(status.error && "danger") || (!status.error && "success")}
					description={status.message}
					center={true}
					clickFn={() => alertClick()}
					hidden={!status.show}
					title={status.error && "Error"}
					viewportSize={viewportSize}
					extraStyle={{ position: "fixed" }}
				/>

				<h2 className="title">Create a product</h2>
				<div className="form-and-image">
					<BigImageWrapper />
					<Form />
				</div>

				{/* One default image is always at the end of the array. */}
				<div className="images-container">
					{images.map((e, index) => {
						const isSelected = e.src === selectedImage;
						// Check if current image is the last image
						const isLastImage =
							images.length > maxImages && e.src === defaultImage;
						return (
							<ShowTinyImage
								key={uuidv4()}
								imageSrc={(isLastImage && disabledImage) || e.src}
								index={index}
								clickFn={handleTinyImageClick}
								classes={"images "}
								imageClasses={
									"tiny-image " +
									// If it is not the last image, it can be selected by the user
									((!isLastImage && isSelected && "selected-image") ||
										(isLastImage && "last-image"))
								}
								isDisabled={isLastImage}
								defaultImage={defaultUploadImage}
								selectedImage={selectedImage}
							/>
						);
					})}
				</div>

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
