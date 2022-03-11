import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param {*} image
 * @param {*} config
 * @param {*} callback
 * @returns
 */
export const imageResizer = (image, config, callback) => {
	// If the image is smaller than the canvas, resize it
	// to its original size.
	const imageWidth = image.width;
	const imageHeight = image.height;

	// Get the width and height of the canvas
	const canvasWidth = parseInt(config.bigImageContainerSize.width);
	const canvasHeight = parseInt(config.bigImageContainerSize.height);

	const newSize = [0, 0];

	if (!isNaN(canvasWidth)) {
		// If the image width is greater than the canvas width
		if (imageWidth > canvasWidth) {
			// console.log(`The image is bigger, setting it to the canvas size.`);
			newSize[0] = canvasWidth;
		} else {
			// console.log(`The image is smaller, setting the default size.`);
			newSize[0] = imageWidth;
		}
	}

	if (!isNaN(canvasHeight)) {
		if (imageHeight > canvasHeight) {
			newSize[1] = canvasHeight;
		} else {
			newSize[1] = imageHeight;
		}
	}

	return callback(newSize[0], newSize[1]);
};

/** Send every image to be resized according to the config object
 * @param {*} images
 * @param {*} config
 * @returns An array of images as an html object
 */
export const resize_all = async (images, config) => {
	const newImages = [];

	for (let i in images) {
		i = parseInt(i);

		const image = await images[i];

		// console.log(`Image name: ${images[i].alt}`);
		// console.log(`onload typeof: ${typeof image.onload}`);
		await image.onload;
		console.log(`Image loaded!`);
		console.log(`Image:`);
		console.log(image);
		console.log(image.width);
		console.log(image.height);
		imageResizer(image, config, (width, height) => {
			console.log(`Width: ${width}`);
			console.log(`Height: ${height}`);
			image.style.width = width + "px";
			image.style.height = height + "px";
			console.log(`Image style: ${image.style.width}`);

			newImages.push(image);
		});
	}

	console.log(`Images:`);
	console.log(newImages);

	return newImages;
};

export const print_sizes = (images) => {
	for (let i in images) {
		i = parseInt(i);

		const image = images[i];

		console.log(`Image`);
		console.log(image);

		console.log(`${image.alt} style width: ${image.style.width}, style height:
		${image.style.height}`);
		console.log(`${image.alt} width: ${image.width}, height:
		${image.height}`);
	}
};

/**
 *
 * @param {*} totalFiles
 * @returns Object image array
 */
export const get_resized_images = async (totalFiles) => {
	const newImages = [];

	for (let i in totalFiles) {
		i = parseInt(i);

		// The two latest elements are index and a function
		if (typeof totalFiles[i] !== "object") continue;

		// To create an image url from a file
		const imgUrl = URL.createObjectURL(totalFiles[i]);

		// I'm using images to store more information
		const img = new Image();
		img.src = imgUrl;
		img.id = uuidv4();
		img.alt = totalFiles[i]["name"];

		newImages.push(img);
	}

	console.log(`New images`);
	console.log(newImages);
	return [...newImages];
};
