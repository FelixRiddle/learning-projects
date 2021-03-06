import axios from "axios";

export const getAll = async (url) => {
	const response = await axios
		.get(url)
		.then((res) => {
			return res.data;
		})
		.catch((err) => err);
	return response;
};
