import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertUserProducts } from "../redux/actions/userProductsSlice";

export const useUserProducts = (_id) => {
	const { serverUrl } = useSelector((state) => state.constants);
	const dispatch = useDispatch();

	useEffect(() => {
		let isMounted = false;

		new Promise((resolve, reject) => {
			axios.get(`${serverUrl}api/products/getUserProducts`).then((res) => {
				resolve(res);
			});
		})
			.then((res) => {
				if (isMounted) {
					console.log(`Res data:`, res.data);
					dispatch(insertUserProducts(res.data));
				}
			})
			.catch((err) => {});

		// To prevent state updates when the component is not mounted)?
		return () => {
			isMounted = false;
		};
	}, [dispatch, serverUrl]);
};
