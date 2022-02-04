import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { GlobalContext } from "../../App";
import { handleMessageValidationv2 } from "../../../lib/handleMessageValidation";
import "./CreateProduct.css";
import UploadImage from "../../components/upload_image/UploadImage";

function CreateProduct() {
	const { user, token } = useContext(GlobalContext);
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

	const handleUploadImage = () => {};

	useEffect(() => {
		/*
		console.log(`Input length`);
		console.log(input.images.length);*/
	}, [input]);

	return (
		<div className="create-product">
			<h2 className="title">Create a product</h2>
			<form action="submit" className="form">
				<UploadImage
					classes="image-input"
					type="file"
					name="images"
					fn={handleUploadImage}
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
			<button className="btn" type="submit" onSubmit={handleSubmit}>
				Submit product
			</button>
		</div>
	);
}

export default CreateProduct;
