import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { GlobalContext } from "../../App";
import { handleMessageValidationv2 } from "../../../lib/handleMessageValidation";
import "./CreateProduct.css";
import ShowTinyImage from "./components/ShowTinyImage";
import { v4 as uuidv4 } from "uuid";
import Form from "./components/form/Form";
import BigImageWrapper from "./components/big-image-wrapper/BigImageWrapper";

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
	const { user, token } = useContext(GlobalContext);

	// States
	const [config, setConfig] = useState({
		bigImageContainerSize: {
			width: 0,
			height: 0,
		},
	});
	const [input, setInput] = useState({
		name: "",
		stock: "",
		images: [],
		price: "",
	});
	const [status, setStatus] = useState({
		message: "",
		error: false,
		field: "",
		state: "",
	});

	const [loading, setLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState(defaultUploadImage);
	const [images, setImages] = useState([]);

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

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:3001/api/products/createProduct", {
				_id: user._id,
				token,
				...input,
			})
			.then((res) => handleResponse(res, res.data))
			.catch((err) => handleError(err));
	};

	const handleResponse = (res, data) => {
		if (data.joiMessage && data.error) {
			const newMessage = handleMessageValidationv2(input, res, [
				"Name",
				"Images",
				"Stock",
				"Price",
			]);
			setStatus({
				...status,
				message: newMessage,
				error: data.error,
				field: data.field,
				state: data.state,
			});
		} else if (data.message) {
			setStatus({
				...status,
				message: data.message,
				error: data.error,
				field: data.field,
				state: data.state,
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

	// If the image is the default one, show an upload icon
	useEffect(() => {
		if (selectedImage === defaultImage) {
			setSelectedImage(defaultUploadImage);
		}
	}, [selectedImage]);

	useEffect(() => {
		const image = new Image();
		image.src = defaultImage;
		setImages([image]);
	}, []);

	useEffect(() => {
		console.log(`New input`);
		console.log(input);
	}, [input]);

	return (
		<div className="create-product">
			<CreateProductContext.Provider
				value={{
					arrowIcon,
					config,
					cssDetails,
					handleInputChange,
					input,
					images,
					loading,
					maxImages,
					setConfig,
					selectedImage,
					setInput,
					setImages,
					setLoading,
					setSelectedImage,
					setStatus,
					status,
					viewportSize,
				}}
			>
				<h2 className="title">Create a product</h2>
				<div className="form-and-image">
					<BigImageWrapper />
					<Form />
				</div>

				{/* One default image is always at the end of the array
			When default image is the last, disable input. */}
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

				<span className="button-position">
					<button className="btn" type="submit" onSubmit={handleSubmit}>
						Submit product
					</button>
				</span>
			</CreateProductContext.Provider>
		</div>
	);
}

export default CreateProduct;
