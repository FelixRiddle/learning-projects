import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertUserProducts } from "../redux/actions/userProductsSlice";

export const useUserProducts = (_id) => {
	const { serverUrl } = useSelector((state) => state.constants);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!_id) return;
		Promise.resolve(
			axios
				.post(`${serverUrl}api/products/getUserProducts`, { _id })
				.then((res) => {
					console.log(`Res:`, res.data.products);
					dispatch(insertUserProducts(res.data.products));
				})
				.catch((err) => {
					console.warn(`An error ocurred on useUserProducts hook.`);
				})
		);
	}, [_id, dispatch, serverUrl]);
};
