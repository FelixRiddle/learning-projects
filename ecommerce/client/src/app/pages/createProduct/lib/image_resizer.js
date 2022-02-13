/**
 *
 * @param {*} image
 * @param {*} config
 * @param {*} callback
 * @returns
 */
export const image_resizer = (image, config, callback) => {
	// If the image is smaller than the canvas, resize it
	// to its original size.
	const imageWidth = image.width;
	const imageHeight = image.height;

	// Get the width and height of the canvas
	const canvasWidth = parseInt(config.bigImageContainerSize.width);
	const canvasHeight = parseInt(config.bigImageContainerSize.height);

	// console.log(`Image width: ${imageWidth}`);
	// console.log(`Image height: ${imageHeight}`);
	const newSize = [0, 0];
	// If the image width is greater than the canvas width
	if (imageWidth > canvasWidth) {
		// console.log(`The image is bigger, setting it to the canvas size.`);
		newSize[0] = canvasWidth + "px";
		// console.log(`New size: ${newSize[0]}`);
	} else {
		// console.log(`The image is smaller, setting the default size.`);
		newSize[0] = imageWidth + "px";
		// console.log(`New size: ${newSize[0]}`);
	}

	if (imageHeight > canvasHeight) {
		newSize[1] = canvasHeight + "px";
	} else {
		newSize[1] = imageHeight + "px";
	}

	return callback(newSize[0], newSize[1]);
};

/** Send every image to be resized according to the config object
 * @param {*} images
 * @param {*} config
 * @returns An array of images as an html object
 */
export const resize_all = (images, config) => {
	const newImages = [];

	for (let i in images) {
		i = parseInt(i);

		const image = images[i];

		console.log(`Image name: ${images[i].alt}`);
		console.log(`onload typeof: ${typeof image.onload}`);
		image.onload = () => {
			return image_resizer(image, config, (width, height) => {
				image.style.width = width + "px";
				image.style.height = height + "px";
			});
		};

		newImages.push(image);
	}

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
