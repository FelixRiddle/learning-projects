import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CreateProductContext } from "../../CreateProduct";

import Icon from "./components/Icon";

function ControlBar() {
	const { images, selectedImage, setImages, setSelectedImage } =
		useContext(CreateProductContext);

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
				console.log(`The current image is: ${images[i].src}`);
				console.log(selectedImage);
				if (direction === "left") {
					// Move one to the left
					let test = [...images];
					console.log(`Test array`);
					console.log(test);
					// Remove the current image and store it
					// (splice returns an array, that's why the 0)
					const image = test.splice(i, 1)[0];
					console.log(`Index is: ${i}`);
					console.log(`The image is:`);
					console.log(image);
					// Insert it before the current element
					test.splice(i - 1, 0, image);
					console.log(`Image moved to the left`);
					console.log(`New array:`);
					console.log(test);
					
					// Save the new array
					setImages(() => {
						return [...test];
					});

					// Now set it as selected
					setSelectedImage(() => {
						return image.src;
					});

					/*
					console.log(`Creating a copy of this array`);
					console.log(`Splicing at index 0`);
					let element = test.splice(0, 1);
					console.log(`It's id: ${element[0].id}`);
					console.log(`Item:`);
					console.log(element[0]);
					console.log(`New array`);
					console.log(test);
					console.log(`Inserting it at the end`);
					test.splice(test.length - 1, 0, element[0]);
					console.log(test);*/
				} else if (direction === "right") {
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
				icon={next_arrow}
				imageId={uuidv4()}
				name="changeImage"
			/>
			<Icon
				classes={"left"}
				clickFn={() => moveImageShown("left")}
				direction="left"
				icon={move_arrow}
				imageId={uuidv4()}
				name="moveImage"
			/>
			<Icon
				classes={""}
				clickFn={() => editImage()}
				icon={edit}
				imageId={uuidv4()}
				name="editImage"
			/>
			<Icon
				classes={""}
				clickFn={() => deleteImage()}
				icon={delete_image}
				imageId={uuidv4()}
				name="deleteImage"
			/>
			<Icon
				classes={""}
				clickFn={() => moveImageShown("right")}
				direction="right"
				icon={move_arrow}
				imageId={uuidv4()}
				name="moveImage"
			/>
			<Icon
				classes={""}
				clickFn={() => changeImageShown("right")}
				direction="right"
				icon={next_arrow}
				imageId={uuidv4()}
				name="changeImage"
			/>
		</div>
	);
}

export default ControlBar;
