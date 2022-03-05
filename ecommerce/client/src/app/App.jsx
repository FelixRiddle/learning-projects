import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { getAll } from "../lib/products/getProducts";
import { insertProducts } from "../lib/redux/actions/productsSlice";
import { insertUser } from "../lib/redux/actions/userSlice";

export const GlobalContext = React.createContext();

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		getAll("http://localhost:3001/api/products/getAll").then((data) => {
			// Dispatch products
			dispatch(
				insertProducts({
					id: nanoid(),
					value: [...data],
				})
			);
		});
	}, [dispatch]);

	useEffect(() => {
		// Token management
		const token = localStorage.getItem("token");
		if (token) {
			Promise.resolve(jwt_decode(token))
				.then((prevSession) => {
					console.log(`Previous session found`);
					// Save user on redux reducer
					dispatch(
						insertUser({
							id: nanoid(),
							value: { ...prevSession },
						})
					);
				})
				.catch((err) => {
					console.log(`No previous session found`);
					localStorage.removeItem("token");
				});
		}
	}, [dispatch]);

	return (
		<div className="App">
			<Navbar />
		</div>
	);
}

export default App;
