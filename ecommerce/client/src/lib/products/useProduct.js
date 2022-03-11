import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { objectExists } from "../misc/vanilla/transformations";

export const useProduct = (props) => {
	const { productId, userId } = props;

	const { serverUrl } = useSelector((state) => state.constants);
	const [product, setProduct] = useState({});
	const [resData, setResData] = useState({});

	useEffect(() => {
		let isMounted = true;
		// console.log(`Product:`, product);
		// console.log(`Res data:`, resData);
		if (objectExists(resData)) return;
		// console.log("Result:", objectExists(resData));
		if (objectExists(resData)) return;

		new Promise(async (resolve, reject) => {
			await axios
				.post(`${serverUrl}api/products/getProduct`, { userId, productId })
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		})
			.then((res) => {
				if (isMounted) {
					// console.log(res);
					if (res && res.data && res.data.product) setProduct(res.data.product);
					if (res && res.data) setResData(res.data);
				}
			})
			.catch((err) => {
				console.warn(err);
			});

		return () => {
			isMounted = false;
		};
	}, [product, productId, props, resData, serverUrl, userId]);

	return { product, resData };
};
