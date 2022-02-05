import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { GlobalContext } from "../../App";
import { handleMessageValidationv2 } from "../../../lib/handleMessageValidation";
import "./CreateProduct.css";
import UploadImage from "../../components/upload_image/UploadImage";
import ShowTinyImage from "./components/ShowTinyImage";
import { v4 as uuidv4 } from "uuid";

function CreateProduct() {
	// Global context(from App.jsx)
	const { user, token } = useContext(GlobalContext);

	// Constant values
	const defaultImage = "http://localhost:3001/public/iconsx64/image_1.png";
	const defaultUploadImage =
		"http://localhost:3001/public/iconsx64/upload_1.png";
	const disabledImage =
		"http://localhost:3001/public/iconsx64/disabled_image_1.png";
	const maxImages = 15;

	// States
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
	const [isFirstUpload, setIsFirstUpload] = useState(false);
	const [images, setImages] = useState([]);

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

	const handleChange = async (e) => {
		setLoading(true);
		const { name, value } = await e.target;

		// If the input were files
		if (e.target.files) {
			const files = await e.target.files;

			console.log(`Uploading image...`);

			const totalLength = input.images.length + files.length;
			if (totalLength > maxImages) {
				return setStatus({
					error: true,
					message: "You cannot upload more than 10 images",
					field: "images",
					state: "danger",
				});
			}

			if (!isFirstUpload) setIsFirstUpload(true);
			return setInput((prevInput) => {
				console.log([...prevInput.images, ...files]);
				return {
					...prevInput,
					[name]: [...prevInput.images, ...files],
				};
			});
		}

		return setInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	const handleTinyImageClick = (imageSrc) => {
		setSelectedImage(imageSrc);
	};

	useEffect(() => {
		if (input && input.images) {
			if (!isFirstUpload) return;
			// To prevent an infinite loop, only return when the images
			// length is different
			if (images.length - 1 === input.images.length) return;

			// Create a temp array and traverse user images
			const newImages = [];
			for (let i in input.images) {
				const imgUrl = URL.createObjectURL(input.images[i]);

				// I'm using images to store more information
				const img = new Image();
				img.src = imgUrl;
				newImages.push(img);
			}

			// If there are less than 10 inserted images
			setImages([...newImages, images[images.length - 1]]);
			console.log(`Created image elements.`);
			console.log([...newImages, images[images.length - 1]]);

			setLoading(false);
		}
	}, [input, isFirstUpload, images]);

	useEffect(() => {
		if (isFirstUpload) {
			setSelectedImage(images[0].src);
		}
	}, [isFirstUpload, images]);

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

	return (
		<div className="create-product">
			<h2 className="title">Create a product</h2>
			<form action="submit" className="form">
				<UploadImage
					classes={"image-input"}
					linkref={selectedImage}
					classCondition={isFirstUpload}
					key={uuidv4()}
					type="file"
					name="images"
					title="Uploaded image"
					changeFn={handleChange}
				/>

				<span className="labels">
					<label htmlFor="name">Name</label>
					<label htmlFor="images">Images</label>
					<label htmlFor="stock">Stock</label>
					<label htmlFor="price">Price</label>
				</span>
				<span className="inputs">
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={input.name}
						onChange={handleChange}
					/>
					<input
						type="file"
						name="images"
						accept="image/*"
						multiple={true}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="stock"
						placeholder="Stock"
						value={input.stock}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="price"
						placeholder="Price"
						value={input.price}
						onChange={handleChange}
					/>
				</span>
				{/* <span className="extra"></span> */}
			</form>

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
						/>
					);
				})}
			</div>

			<span className="button-position">
				<button className="btn" type="submit" onSubmit={handleSubmit}>
					Submit product
				</button>
			</span>
		</div>
	);
}

export default CreateProduct;
