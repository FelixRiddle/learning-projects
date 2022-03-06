import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { getAll } from "../lib/products/getProducts";
import { insertProducts } from "../lib/redux/actions/productsSlice";
import { insertUser } from "../lib/redux/actions/userSlice";
import { useUserProducts } from "../lib/products/useUserProducts";

export const GlobalContext = React.createContext();

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	useUserProducts(user._id);

	useEffect(() => {
		getAll("http://localhost:3001/api/products/getAll").then((data) => {
			// Dispatch products
			dispatch(
				insertProducts({
					value: [...data],
				})
			);
		});
	}, [dispatch]);

	useEffect(() => {
		// Token management
		try {
			const token = localStorage.getItem("token");
			if (token) {
				Promise.resolve(jwt_decode(token))
					.then((prevSession) => {
						console.log(`Previous session found`);
						if (!prevSession) return;
						// Save user on redux reducer
						dispatch(
							insertUser({
								...prevSession,
							})
						);
					})
					.catch((err) => {
						console.warn(err);
						console.log(`No previous session found`);
						// localStorage.removeItem("token");
					});
			}
		} catch (err) {
			console.warn(`There was an error:`, err);
		}
	}, [dispatch]);

	return (
		<div className="App">
			<Navbar />
		</div>
	);
}

export default App;
