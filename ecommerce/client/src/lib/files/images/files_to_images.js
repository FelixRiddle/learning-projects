import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param {*} totalFiles
 * @returns Object image array
 */
export const files_to_images = (totalFiles) => {
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

	return [...newImages];
};