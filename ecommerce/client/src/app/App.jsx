import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

import "./App.css";

import Navbar from "./components/navbar/Navbar";

import { getAll } from "../lib/products/getProducts";
import { insertProducts } from "../lib/redux/actions/productsSlice";
import { insertUser } from "../lib/redux/actions/userSlice";
import { arrayToObject } from "../lib/misc/vanilla/transformations";

export const GlobalContext = React.createContext();

function App() {
	const dispatch = useDispatch();

	// TODO: Implement different on production
	useEffect(() => {
		getAll("http://localhost:3001/api/products/getAll").then((data) => {
			// Dispatch products
			dispatch(
				insertProducts({
					...arrayToObject(data),
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
						if (!prevSession) return;
						console.log(`Previous session`, prevSession);

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
