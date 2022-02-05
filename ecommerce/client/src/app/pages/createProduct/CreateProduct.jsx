import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { GlobalContext } from "../../App";
import { handleMessageValidationv2 } from "../../../lib/handleMessageValidation";
import "./CreateProduct.css";
import UploadImage from "../../components/upload_image/UploadImage";
import ShowTinyImage from "./components/ShowTinyImage";
import { v4 as uuidv4 } from "uuid";

function CreateProduct() {
	const { user, token } = useContext(GlobalContext);

	const defaultImage = "http://localhost:3001/public/iconsx64/image_1.png";
	const defaultUploadImage =
		"http://localhost:3001/public/iconsx64/upload_1.png";

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
	const [imagePaths, setImagePaths] = useState([defaultImage]);
	const [selectedImage, setSelectedImage] = useState(defaultUploadImage);
	const [isFirstUpload, setIsFirstUpload] = useState(false);

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

			if (input.images.length >= 10) {
				return setStatus({
					error: true,
					message: "You cannot upload more than 10 images",
					field: "images",
					state: "danger",
				});
			}

			if (!isFirstUpload) setIsFirstUpload(true);
			return setInput((prevInput) => {
				console.log(`Prev images:`);
				console.log(prevInput.images);
				console.log(`New images:`);
				console.log(files);
				console.log(`Result:`);
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
			if (imagePaths.length - 1 === input.images.length) return;

			// Create a temp array and traverse user images
			const imageUrls = [defaultImage];
			for (let i in input.images) {
				// Convert the file to url and push it to the begionning of the array
				imageUrls.unshift(URL.createObjectURL(input.images[i]));
			}

			// If there are less than 10 inserted images
			if (imagePaths.length < 10) {
				setImagePaths([...imageUrls]);
				console.log(`Image paths inserted.`);
			}

			setLoading(false);
		}
	}, [input, imagePaths, isFirstUpload]);

	useEffect(() => {
		if (isFirstUpload) {
			setSelectedImage(imagePaths[0]);
		}
	}, [isFirstUpload, imagePaths]);

	return (
		<div className="create-product">
			<h2 className="title">Create a product</h2>
			<form action="submit" className="form">
				<UploadImage
					classes="image-input"
					linkref={selectedImage}
					classCondition={isFirstUpload}
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
			When default image is the last, disable input, and change it to
			another icon.*/}
			<div className="images-container">
				{imagePaths.map((e, index) => {
					console.log(e);

					const isSelected = e === selectedImage;
					return (
						<ShowTinyImage
							key={uuidv4()}
							imageSrc={e}
							index={index}
							clickFn={handleTinyImageClick}
							classes={"images "}
							imageClasses={
								"tiny-image " + ((isSelected && "selected-image") || "")
							}
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
