import { useState, useEffect } from "react";

const serverUrl = "http://localhost:3001/";

export const useFullImageUrls = (images) => {
	const [fullImageUrls, setFullImageUrls] = useState([]);

	useEffect(() => {
		images.map((e) => {
			setFullImageUrls((prevInput) => {
				const result = [...prevInput, serverUrl + e];
				return result;
			});
			return e;
		});
	}, [images]);

	return { fullImageUrls, setFullImageUrls };
};
