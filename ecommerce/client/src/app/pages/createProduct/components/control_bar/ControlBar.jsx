import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CreateProductContext } from "../../CreateProduct";

import Icon from "./components/Icon";

function ControlBar() {
	const {
		images,
		selectedImage,
		setImages,
		setSelectedImage,
		input,
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

	const deleteImage = () => {};

	const editImage = () => {};

	return (
		<div className="control-bar">
			<Icon
				classes={"left"}
				clickFn={() => changeImageShown("left")}
				direction="left"
				disabled={images.length <= 1}
				icon={next_arrow}
				imageId={uuidv4()}
				name="changeImage"
			/>
			<Icon
				classes={"left"}
				clickFn={() => moveImageShown("left")}
				direction="left"
				disabled={images.length <= 1}
				icon={move_arrow}
				imageId={uuidv4()}
				name="moveImage"
			/>
			<Icon
				classes={""}
				clickFn={() => editImage()}
				disabled={images.length <= 1}
				icon={edit}
				imageId={uuidv4()}
				name="editImage"
			/>
			<Icon
				classes={""}
				clickFn={() => deleteImage()}
				disabled={images.length <= 1}
				icon={delete_image}
				imageId={uuidv4()}
				name="deleteImage"
			/>
			<Icon
				classes={""}
				clickFn={() => moveImageShown("right")}
				direction="right"
				disabled={images.length <= 1}
				icon={move_arrow}
				imageId={uuidv4()}
				name="moveImage"
			/>
			<Icon
				classes={""}
				clickFn={() => changeImageShown("right")}
				direction="right"
				disabled={images.length <= 1}
				icon={next_arrow}
				imageId={uuidv4()}
				name="changeImage"
			/>
		</div>
	);
}

export default ControlBar;
