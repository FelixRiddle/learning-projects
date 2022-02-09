import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CreateProductContext } from "../../CreateProduct";

import Icon from "./components/Icon";

function ControlBar() {
	const {images, selectedImage, setSelectedImage} = useContext(CreateProductContext)
	
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
		
	};

	const deleteImage = () => { };
	
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
