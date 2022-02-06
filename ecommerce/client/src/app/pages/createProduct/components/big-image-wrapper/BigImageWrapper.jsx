import React, { useState, useEffect, useContext } from "react";
import { CreateProductContext } from "../../CreateProduct";
import { v4 as uuidv4 } from "uuid";

import UploadImage from "../../../../components/upload_image/UploadImage";

function BigImageWrapper(props) {
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
	} = useContext(CreateProductContext);

	const [isFirstUpload, setIsFirstUpload] = useState(false);

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

	return (
		<div className="big-image-wrapper">
			<UploadImage
				classes={"image-input"}
				linkref={selectedImage}
				classCondition={isFirstUpload}
				resizeImagePercentage={cssDetails.bigImage}
				key={uuidv4()}
				type="file"
				name="images"
				title="Uploaded image"
				changeFn={handleImageChange}
				viewportSize={viewportSize}
			/>
		</div>
	);
}

export default BigImageWrapper;
