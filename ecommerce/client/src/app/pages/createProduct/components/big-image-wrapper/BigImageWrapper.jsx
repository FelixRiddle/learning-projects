import React, { useState, useContext } from "react";
import { CreateProductContext } from "../../CreateProduct";
import { v4 as uuidv4 } from "uuid";

import UploadImage from "./upload_image/UploadImage";
import Arrow from "./arrow/Arrow";
import ControlBar from "./control_bar/ControlBar";
import { files_to_images } from "../../../../../lib/files/images/files_to_images";
import { useCssDetails } from "../../../../../lib/misc/useCssDetails";

function BigImageWrapper() {
	// Contexts
	const { cssDetails } = useCssDetails();

	const {
		arrowIcon,
		defaultImage,
		images,
		input,
		maxImages,
		setInput,
		selectedImage,
		setSelectedImage,
		setImages,
		setLoading,
		setStatus,
		viewportSize,
	} = useContext(CreateProductContext);

	// States
	const [leftArrowId] = useState(uuidv4());
	const [rightArrowId] = useState(uuidv4());

	const resetImageInput = () => {
		// Reset the input, if you want the user to be able to select
		// the same image over and over(use just before the returns).
		const inputForm = document.getElementById("image-input");
		if (inputForm) {
			inputForm.reset();
		}
	};

	const handleImageChange = async (e) => {
		setLoading(true);
		const { name } = await e.target;

		// If the input were files
		if (e.target.files) {
			const files = [...(await e.target.files)];

			const totalLength = input.images.length + files.length;
			if (totalLength > maxImages) {
				// Reset the image input
				resetImageInput();

				return setStatus({
					error: true,
					message: "You cannot upload more than 10 images",
					field: "images",
					state: "danger",
				});
			}

			// To get all images
			const totalFiles = [...(await input.images), ...files];

			// Create a temp array and traverse imported images
			const newImages = files_to_images([...totalFiles]);

			// Add at last the default image
			const newDefaultImage = new Image();
			newDefaultImage.src = defaultImage;
			newDefaultImage.id = uuidv4();
			newImages.push(newDefaultImage);

			// Insert images in a new array
			setImages(() => {
				const result = [...newImages /*, prevInput[prevInput.length - 1]*/];
				// console.log(`Image elements`);
				// console.log(result);
				return result;
			});

			// Set the default image to the first
			setSelectedImage(() => newImages[0].src);

			// Reset the image input
			resetImageInput();

			// Save the files on the input
			return setInput((prevInput) => {
				const newArray = [...prevInput.images, ...files];
				for (let i in newArray) {
					if (newArray[i].id) continue;
					newArray[i].id = uuidv4();
				}
				//console.log(newArray);

				setLoading(false);
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

	return (
		<div className="big-image">
			<Arrow
				arrowFn={
					(images.length > 1 && (() => handleArrowClick("left"))) || (() => {})
				}
				arrowIcon={arrowIcon}
				containerClasses={"arrow-container"}
				direction={"left"}
				iconClasses={
					(images.length <= 1 && "arrow-icon icon-disabled ") || "arrow-icon"
				}
				imageId={leftArrowId}
				setSelectedImage={setSelectedImage}
			/>
			<Arrow
				arrowFn={
					(images.length > 1 && (() => handleArrowClick("right"))) || (() => {})
				}
				arrowIcon={arrowIcon}
				containerClasses={"arrow-container"}
				direction={"right"}
				iconClasses={
					(images.length <= 1 && "arrow-icon icon-disabled ") || "arrow-icon "
				}
				imageId={rightArrowId}
				setSelectedImage={setSelectedImage}
			/>
			<div className="big-image-wrapper">
				<UploadImage
					changeFn={handleImageChange}
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
