import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CreateProductContext } from "../../CreateProduct";

import Icon from "./components/Icon";

function ControlBar() {
	const {
		defaultImage,
		defaultUploadImage,
		images,
		input,
		selectedImage,
		setImages,
		setSelectedImage,
		setInput,
	} = useContext(CreateProductContext);

	const [move_arrow] = useState(
		"http://localhost:3001/public/icons/control_bar_x32/move_right_arrow_1.png"
	);
	const [next_arrow] = useState(
		"http://localhost:3001/public/icons/control_bar_x32/next_arrow_1.png"
	);
	const [edit] = useState(
		"http://localhost:3001/public/icons/control_bar_x32/edit_1.png"
	);
	const [delete_image] = useState(
		"http://localhost:3001/public/icons/control_bar_x32/delete_1.png"
	);

	const changeImageShown = (direction) => {
		// If it's the first image, invalidate the action
		if (direction === "left" && images[0].src === selectedImage) {
			setSelectedImage(images[images.length - 2].src);
			return;
		}
		if (
			direction === "right" &&
			(images[images.length - 1].src === selectedImage ||
				images[images.length - 2].src === selectedImage)
		) {
			setSelectedImage(images[0].src);
			return;
		}

		for (let i in images) {
			i = parseInt(i);
			if (selectedImage === images[i].src) {
				if (direction === "right") setSelectedImage(images[i + 1].src);
				if (direction === "left") setSelectedImage(images[i - 1].src);
				return;
			}
		}
	};

	const moveImageShown = (direction) => {
		for (let i in images) {
			if (images[i].src === selectedImage) {
				i = parseInt(i);

				// Move one to the left
				let imageElements = [...images];
				let imagesInput = [...input.images];

				// Remove the current image and store it
				// (splice returns an array, that's why the 0)
				const image = imageElements.splice(i, 1)[0];
				const inputImage = imagesInput.splice(i, 1)[0];
				if (direction === "left") {
					// Insert it before the current element
					imageElements.splice(i - 1, 0, image);

					// If it's the first image
					if (i === 0) {
						imagesInput.splice(imagesInput.length, 0, inputImage);
					} else {
						imagesInput.splice(i - 1, 0, inputImage);
					}

					// Save the new array
					setImages(() => {
						return [...imageElements];
					});

					setInput((prevInput) => {
						return {
							...prevInput,
							images: [...imagesInput],
						};
					});

					// Now set it as selected
					setSelectedImage(() => {
						return image.src;
					});
				} else if (direction === "right") {
					// If it's the last image
					if (i === imagesInput.length) {
						imageElements.splice(0, 0, image);
						imagesInput.splice(0, 0, inputImage);
					} else {
						imageElements.splice(i + 1, 0, image);
						imagesInput.splice(i + 1, 0, inputImage);
					}

					// Save the new array
					setImages(() => {
						return [...imageElements];
					});

					setInput((prevInput) => {
						return {
							...prevInput,
							images: [...imagesInput],
						};
					});

					// Now set it as selected
					setSelectedImage(() => {
						return image.src;
					});
				}
			}
		}
	};

	const editImage = async (e) => {
		const { name, files } = await e.target;
		
		files[0].id = uuidv4();
		
		for (let i in images) {
			i = parseInt(i);

			if (
				images[i].src === selectedImage &&
				selectedImage !== defaultUploadImage &&
				selectedImage !== defaultImage
			) {

				const newImage = new Image();
				newImage.src = URL.createObjectURL(files[0]);
				newImage.id = uuidv4();
				setImages((prevInput) => {
					prevInput.splice(i, 1, newImage);
					const newArray = prevInput;
					setSelectedImage(newArray[i].src);
					return [...newArray];
				});

				setInput((prevInput) => {
					const newArray = [...prevInput.images];
					newArray.splice(i, 1, files[0]);
					return {
						...prevInput,
						[name]: [...newArray],
					};
				});

				const inputForm = document.getElementById("change-file-form");
				if (inputForm) {
					console.log(inputForm);
					inputForm.reset();
				}
			}
		}
	};

	const deleteImage = () => {};

	return (
		<div className="control-bar">
			<Icon
				classes={"left"}
				clickFn={
					(images.length > 1 && (() => changeImageShown("left"))) || (() => {})
				}
				direction="left"
				icon={next_arrow}
				imageClasses={(images.length <= 1 && "icon-disabled") || ""}
				imageId={uuidv4()}
				name="changeImage"
			/>
			{/* // TODO: Disable editing, deleting, or moving the default image */}
			<Icon
				classes={"left"}
				clickFn={
					(images.length > 1 && (() => moveImageShown("left"))) || (() => {})
				}
				direction="left"
				icon={move_arrow}
				imageClasses={(images.length <= 1 && "icon-disabled") || ""}
				imageId={uuidv4()}
				name="moveImage"
			/>
			<Icon
				classes={""}
				clickFn={
					(images.length > 1 &&
						(() => document.getElementById("change-file").click())) ||
					(() => {})
				}
				icon={edit}
				imageClasses={(images.length <= 1 && "icon-disabled") || ""}
				imageId={uuidv4()}
				name="editImage"
			/>
			<Icon
				classes={""}
				clickFn={(images.length > 1 && (() => deleteImage())) || (() => {})}
				icon={delete_image}
				imageClasses={(images.length <= 1 && "icon-disabled") || ""}
				imageId={uuidv4()}
				name="deleteImage"
			/>
			<Icon
				classes={""}
				clickFn={
					(images.length > 1 && (() => moveImageShown("right"))) || (() => {})
				}
				direction="right"
				icon={move_arrow}
				imageClasses={(images.length <= 1 && "icon-disabled") || ""}
				imageId={uuidv4()}
				name="moveImage"
			/>
			<Icon
				classes={""}
				clickFn={
					(images.length > 1 && (() => changeImageShown("right"))) || (() => {})
				}
				direction="right"
				icon={next_arrow}
				imageClasses={(images.length <= 1 && "icon-disabled") || ""}
				imageId={uuidv4()}
				name="changeImage"
			/>
			<form action="" id="change-file-form">
				<input
					hidden={true}
					id="change-file"
					name="images"
					onChange={editImage}
					type="file"
				/>
			</form>
		</div>
	);
}

export default ControlBar;
