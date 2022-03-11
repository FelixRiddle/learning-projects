import { useState, useEffect } from "react";

const serverUrl = "http://localhost:3001/";

export const useFullImageUrls = (images) => {
	const [fullImageUrls, setFullImageUrls] = useState([]);

	useEffect(() => {
		if (images) {
			console.log(`Images updated`);
			images.map((e) => {
				setFullImageUrls((prevInput) => {
					const result = [...prevInput, serverUrl + e];
					return result;
				});
				return e;
			});
		} else {
			return console.warn("There are no images!");
		}
	}, [images]);

	return { fullImageUrls, setFullImageUrls };
};
