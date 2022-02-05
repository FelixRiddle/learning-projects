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
	const [showImage, setShowImage] = useState(defaultUploadImage);
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
		const { name, value } = await e.target;

		// If the input were files
		if (e.target.files && e.target.files[0]) {
			const files = await e.target.files;
			setLoading(true);

			console.log(`Uploading image...`);

			if (input.images.length >= 10) {
				return setStatus({
					error: true,
					message: "You cannot upload more than 10 images",
					field: "images",
					state: "danger",
				});
			}

			return setInput((prevInput) => {
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

	useEffect(() => {
		if (input && input.images && input.images[0]) {
			// If it's not loading return
			if (!loading) return;
			if (!isFirstUpload) setIsFirstUpload(true);

			console.log(`Images`);
			console.log(input.images);
			console.log(`Image paths`);
			console.log(imagePaths);

			// Create a temp array and traverse user images
			const imageUrls = [defaultImage];
			console.log(`Inserting image`);
			for (let i in input.images) {
				// Convert the file to url and push it to the begionning of the array
				imageUrls.unshift(URL.createObjectURL(input.images[i]));
			}
			console.log(`Image urls`);
			console.log(imageUrls);
			// If there are less than 10 inserted images
			if (imagePaths.length < 10) {
				setImagePaths([...imageUrls]);
			}

			setLoading(false);
		}
	}, [input, imagePaths, loading, isFirstUpload]);

	useEffect(() => {
		if (isFirstUpload) {
			setShowImage(imagePaths[0]);
		}
	}, [isFirstUpload]);

	return (
		<div className="create-product">
			<h2 className="title">Create a product</h2>
			<form action="submit" className="form">
				<UploadImage
					classes="image-input"
					linkref={showImage}
					classCondition={isFirstUpload}
					type="file"
					name="images"
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
					return <ShowTinyImage key={uuidv4()} imageSrc={e} index={index} />;
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
