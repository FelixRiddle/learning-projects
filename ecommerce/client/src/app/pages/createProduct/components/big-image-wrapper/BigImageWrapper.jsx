import React, { useState, useEffect, useContext } from "react";
import { CreateProductContext } from "../../CreateProduct";
import { v4 as uuidv4 } from "uuid";

import UploadImage from "../upload_image/UploadImage";
import Arrow from "../arrow/Arrow";
import ControlBar from "../control_bar/ControlBar";

function BigImageWrapper(props) {
	// Context
	const {
		maxImages,
		cssDetails,
		input,
		setInput,
		selectedImage,
		setSelectedImage,
		images,
		setImages,
		setLoading,
		setStatus,
		viewportSize,
		arrowIcon,
	} = useContext(CreateProductContext);

	// States
	const [isFirstUpload, setIsFirstUpload] = useState(false);
	const [leftArrowId] = useState(uuidv4());
	const [rightArrowId] = useState(uuidv4());

	const handleImageChange = async (e) => {
		setLoading(true);
		const { name } = await e.target;

		// If the input were files
		if (e.target.files) {
			const files = await e.target.files;

			const totalLength = input.images.length + files.length;
			if (totalLength > maxImages) {
				return setStatus({
					error: true,
					message: "You cannot upload more than 10 images",
					field: "images",
					state: "danger",
				});
			}
			console.log(`Files`);
			console.log(files);

			if (!isFirstUpload) setIsFirstUpload(true);
			return setInput((prevInput) => {
				console.log([...prevInput.images, ...files]);
				return {
					...prevInput,
					[name]: [...prevInput.images, ...files],
				};
			});
		}
	};

	const handleArrowClick = (direction) => {
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

	useEffect(() => {
		if (isFirstUpload) {
			setSelectedImage(images[0].src);
		}
	}, [isFirstUpload, images, setSelectedImage]);

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
	}, [input, isFirstUpload, images, setImages, setLoading]);

	useEffect(() => {
		console.log(`Images length`);
		console.log(images.length);
	}, [images]);

	return (
		<div className="big-image">
			<Arrow
				arrowFn={() => handleArrowClick("left")}
				arrowIcon={arrowIcon}
				containerClasses={"arrow-container"}
				direction={"left"}
				iconClasses={"arrow-icon"}
				imageId={leftArrowId}
				setSelectedImage={setSelectedImage}
			/>
			<Arrow
				arrowFn={() => handleArrowClick("right")}
				arrowIcon={arrowIcon}
				containerClasses={"arrow-container"}
				direction={"right"}
				iconClasses={"arrow-icon"}
				imageId={rightArrowId}
				setSelectedImage={setSelectedImage}
			/>
			<div className="big-image-wrapper">
				<UploadImage
					changeFn={handleImageChange}
					classCondition={isFirstUpload}
					classes={"image-input"}
					images={images}
					linkref={selectedImage}
					name="images"
					resizeImagePercentage={cssDetails.bigImage}
					stackImages={true}
					type="file"
					title="Uploaded image"
					viewportSize={viewportSize}
					outline={true}
				/>
			</div>
			<ControlBar />
		</div>
	);
}

export default BigImageWrapper;
